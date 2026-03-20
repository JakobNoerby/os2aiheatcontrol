import { useState, useCallback, useRef, useEffect } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import { Plus, Trash2, X, GripVertical, Save, Loader2, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Ontology = "rec" | "brick" | "os2";

interface GraphNode {
  id: string;
  label: string;
  ontology: Ontology;
  x: number;
  y: number;
}

interface GraphEdge {
  id: string;
  from: string;
  to: string;
  label: string;
}

/* ------------------------------------------------------------------ */
/*  Ontology palette — classes available for adding                    */
/* ------------------------------------------------------------------ */

interface PaletteItem {
  label: string;
  ontology: Ontology;
}

const palette: PaletteItem[] = [
  // RealEstateCore
  { label: "rec:Building", ontology: "rec" },
  { label: "rec:Room", ontology: "rec" },
  { label: "rec:Floor", ontology: "rec" },
  { label: "rec:Zone", ontology: "rec" },
  { label: "rec:BuildingComponent", ontology: "rec" },
  { label: "rec:Lease", ontology: "rec" },
  { label: "rec:RealEstate", ontology: "rec" },
  // Brick Schema
  { label: "brick:Temperature_Sensor", ontology: "brick" },
  { label: "brick:Weather_Station", ontology: "brick" },
  { label: "brick:TimeseriesReference", ontology: "brick" },
  { label: "brick:HVAC_Zone", ontology: "brick" },
  { label: "brick:Air_Handling_Unit", ontology: "brick" },
  { label: "brick:VAV", ontology: "brick" },
  { label: "brick:Damper", ontology: "brick" },
  { label: "brick:Fan", ontology: "brick" },
  { label: "brick:Humidity_Sensor", ontology: "brick" },
  { label: "brick:CO2_Sensor", ontology: "brick" },
  { label: "brick:Flow_Sensor", ontology: "brick" },
  { label: "brick:Pressure_Sensor", ontology: "brick" },
  { label: "brick:Setpoint", ontology: "brick" },
  // OS2 extensions
  { label: "os2:Schedule", ontology: "os2" },
  { label: "os2:Setpoint", ontology: "os2" },
  { label: "os2:FallbackStrategy", ontology: "os2" },
  { label: "os2:HeatingCurve", ontology: "os2" },
  { label: "os2:RegulationEngine", ontology: "os2" },
];

const relationLabels = [
  "locatedIn",
  "hasPoint",
  "isPointOf",
  "feeds",
  "isFedBy",
  "hasLocation",
  "isLocationOf",
  "hasPart",
  "isPartOf",
  "servesBuilding",
  "monitors",
  "controls",
  "hasTimeseriesId",
  "hasAssociatedTag",
];

/* ------------------------------------------------------------------ */
/*  Defaults                                                           */
/* ------------------------------------------------------------------ */

const defaultNodes: GraphNode[] = [
  { id: "building", label: "rec:Building", ontology: "rec", x: 260, y: 40 },
  { id: "room", label: "rec:Room", ontology: "rec", x: 80, y: 150 },
  { id: "sensor", label: "brick:Temperature_Sensor", ontology: "brick", x: 60, y: 290 },
  { id: "weather", label: "brick:Weather_Station", ontology: "brick", x: 460, y: 140 },
  { id: "timeseries", label: "brick:TimeseriesReference", ontology: "brick", x: 240, y: 390 },
  { id: "schedule", label: "os2:Schedule", ontology: "os2", x: 460, y: 280 },
  { id: "setpoint", label: "os2:Setpoint", ontology: "os2", x: 460, y: 380 },
  { id: "fallback", label: "os2:FallbackStrategy", ontology: "os2", x: 240, y: 490 },
];

const defaultEdges: GraphEdge[] = [
  { id: "e1", from: "room", to: "building", label: "locatedIn" },
  { id: "e2", from: "building", to: "sensor", label: "hasPoint" },
  { id: "e3", from: "sensor", to: "room", label: "isPointOf" },
  { id: "e4", from: "sensor", to: "timeseries", label: "hasTimeseriesId" },
  { id: "e5", from: "weather", to: "building", label: "monitors" },
  { id: "e6", from: "schedule", to: "building", label: "servesBuilding" },
  { id: "e7", from: "setpoint", to: "building", label: "servesBuilding" },
  { id: "e8", from: "fallback", to: "building", label: "servesBuilding" },
];

/* ------------------------------------------------------------------ */
/*  Styling                                                            */
/* ------------------------------------------------------------------ */

const ontologyFill = {
  rec: { bg: "hsl(210 45% 38% / 0.08)", stroke: "hsl(210 45% 38% / 0.35)", text: "hsl(210 45% 38%)" },
  brick: { bg: "hsl(195 50% 42% / 0.08)", stroke: "hsl(195 50% 42% / 0.35)", text: "hsl(195 50% 42%)" },
  os2: { bg: "hsl(215 12% 50% / 0.08)", stroke: "hsl(215 12% 50% / 0.35)", text: "hsl(215 12% 50%)" },
} as const;

const ontologyBadge = {
  rec: "bg-primary/15 text-primary",
  brick: "bg-accent/15 text-accent",
  os2: "bg-muted-foreground/15 text-muted-foreground",
};

const NODE_W = 150;
const NODE_H = 44;

function getCenter(n: GraphNode) {
  return { cx: n.x + NODE_W / 2, cy: n.y + NODE_H / 2 };
}

function clipToRect(cx1: number, cy1: number, cx2: number, cy2: number, w: number, h: number) {
  const dx = cx2 - cx1;
  const dy = cy2 - cy1;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  if (absDx < 0.01 && absDy < 0.01) return { x: cx1, y: cy1 };
  const t = absDx * (h / 2) > absDy * (w / 2) ? (w / 2) / absDx : (h / 2) / absDy;
  return { x: cx1 + dx * t, y: cy1 + dy * t };
}

let idCounter = 100;
function nextId(prefix: string) {
  return `${prefix}_${++idCounter}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const RelationshipGraph = () => {
  const wrapRef = useScrollReveal<HTMLDivElement>(100);

  const [nodes, setNodes] = useState<GraphNode[]>(defaultNodes);
  const [edges, setEdges] = useState<GraphEdge[]>(defaultEdges);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveOk, setSaveOk] = useState(false);
  const [dirty, setDirty] = useState(false);

  // Interaction state
  const [selected, setSelected] = useState<string | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [showPalette, setShowPalette] = useState(false);
  const [edgeMode, setEdgeMode] = useState<string | null>(null);
  const [editingEdge, setEditingEdge] = useState<string | null>(null);

  // Load diagram from database on mount
  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("diagrams")
        .select("nodes, edges")
        .eq("id", "default")
        .single();
      if (data && Array.isArray(data.nodes) && (data.nodes as unknown as GraphNode[]).length > 0) {
        setNodes(data.nodes as unknown as GraphNode[]);
        setEdges(data.edges as unknown as GraphEdge[]);
      }
      setLoaded(true);
    }
    load();
  }, []);

  // Mark dirty on changes (after initial load)
  const setNodesWrapped = useCallback((updater: React.SetStateAction<GraphNode[]>) => {
    setNodes(updater);
    if (loaded) setDirty(true);
  }, [loaded]);

  const setEdgesWrapped = useCallback((updater: React.SetStateAction<GraphEdge[]>) => {
    setEdges(updater);
    if (loaded) setDirty(true);
  }, [loaded]);

  // Save to database
  const saveDiagram = useCallback(async () => {
    setSaving(true);
    await supabase
      .from("diagrams")
      .update({ nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), updated_at: new Date().toISOString() })
      .eq("id", "default");
    setSaving(false);
    setSaveOk(true);
    setDirty(false);
    setTimeout(() => setSaveOk(false), 2000);
  }, [nodes, edges]);

  const svgRef = useRef<SVGSVGElement>(null);
  const dragOffset = useRef({ dx: 0, dy: 0 });

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  // Compute dynamic viewBox
  const padding = 30;
  const allX = nodes.map((n) => n.x);
  const allY = nodes.map((n) => n.y);
  const minX = Math.min(...allX) - padding;
  const minY = Math.min(...allY) - padding;
  const maxX = Math.max(...allX) + NODE_W + padding;
  const maxY = Math.max(...allY) + NODE_H + padding;
  const vbW = maxX - minX;
  const vbH = maxY - minY;

  /* --- SVG coordinate helpers --- */
  const svgPoint = useCallback(
    (clientX: number, clientY: number) => {
      const svg = svgRef.current;
      if (!svg) return { x: 0, y: 0 };
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return { x: 0, y: 0 };
      const svgP = pt.matrixTransform(ctm.inverse());
      return { x: svgP.x, y: svgP.y };
    },
    []
  );

  /* --- Drag --- */
  const handlePointerDown = useCallback(
    (nodeId: string, e: React.PointerEvent) => {
      if (edgeMode) return; // don't drag while connecting
      e.stopPropagation();
      const node = nodes.find((n) => n.id === nodeId);
      if (!node) return;
      const p = svgPoint(e.clientX, e.clientY);
      dragOffset.current = { dx: p.x - node.x, dy: p.y - node.y };
      setDragging(nodeId);
      setSelected(nodeId);
      (e.target as Element).setPointerCapture?.(e.pointerId);
    },
    [nodes, svgPoint, edgeMode]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging) return;
      const p = svgPoint(e.clientX, e.clientY);
      setNodesWrapped((prev) =>
        prev.map((n) =>
          n.id === dragging
            ? { ...n, x: Math.round(p.x - dragOffset.current.dx), y: Math.round(p.y - dragOffset.current.dy) }
            : n
        )
      );
    },
    [dragging, svgPoint]
  );

  const handlePointerUp = useCallback(() => {
    setDragging(null);
  }, []);

  /* --- Add node from palette --- */
  const addNode = useCallback(
    (item: PaletteItem) => {
      const id = nextId("node");
      const cx = (vbW / 2) + minX - NODE_W / 2 + Math.random() * 40 - 20;
      const cy = (vbH / 2) + minY - NODE_H / 2 + Math.random() * 40 - 20;
      setNodesWrapped((prev) => [
        ...prev,
        { id, label: item.label, ontology: item.ontology, x: Math.round(cx), y: Math.round(cy) },
      ]);
      setShowPalette(false);
      setSelected(id);
    },
    [vbW, vbH, minX, minY]
  );

  /* --- Delete node --- */
  const deleteNode = useCallback(
    (nodeId: string) => {
      setNodesWrapped((prev) => prev.filter((n) => n.id !== nodeId));
      setEdgesWrapped((prev) => prev.filter((e) => e.from !== nodeId && e.to !== nodeId));
      setSelected(null);
    },
    []
  );

  /* --- Edge mode: click source, then target --- */
  const handleNodeClick = useCallback(
    (nodeId: string) => {
      if (!edgeMode) return;
      if (edgeMode === nodeId) {
        setEdgeMode(null);
        return;
      }
      // create edge
      setEdgesWrapped((prev) => [
        ...prev,
        { id: nextId("edge"), from: edgeMode, to: nodeId, label: "hasPoint" },
      ]);
      setEdgeMode(null);
    },
    [edgeMode]
  );

  /* --- Delete edge --- */
  const deleteEdge = useCallback((edgeId: string) => {
    setEdgesWrapped((prev) => prev.filter((e) => e.id !== edgeId));
    setEditingEdge(null);
  }, []);

  /* --- Change edge label --- */
  const changeEdgeLabel = useCallback((edgeId: string, newLabel: string) => {
    setEdges((prev) => prev.map((e) => (e.id === edgeId ? { ...e, label: newLabel } : e)));
    setEditingEdge(null);
  }, []);

  /* --- Click background to deselect --- */
  const handleBgClick = useCallback((e: React.MouseEvent) => {
    // Only deselect if the click target is the SVG itself or the background
    if (dragging) return;
    if (e.target === e.currentTarget || (e.target as Element).tagName === "svg") {
      setSelected(null);
      setEditingEdge(null);
      // Don't reset edgeMode on background click — let user click nodes
    }
  }, [dragging]);

  // Close palette on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowPalette(false);
        setEdgeMode(null);
        setEditingEdge(null);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div ref={wrapRef} className="scroll-reveal mt-10">
      <p className="mb-3 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
        Relationsdiagram
      </p>

      {/* Toolbar */}
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setShowPalette((v) => !v)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium shadow-sm transition-all hover:shadow-md active:scale-[0.97]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            showPalette && "ring-2 ring-ring"
          )}
        >
          <Plus className="h-3.5 w-3.5" /> Tilføj klasse
        </button>
        <button
          onClick={() => {
            setEdgeMode(edgeMode ? null : "__waiting__");
            setSelected(null);
          }}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium shadow-sm transition-all hover:shadow-md active:scale-[0.97]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            edgeMode && "ring-2 ring-ring"
          )}
        >
          <GripVertical className="h-3.5 w-3.5" />
          {edgeMode ? "Annullér forbindelse" : "Ny forbindelse"}
        </button>
        {selected && (
          <button
            onClick={() => deleteNode(selected)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-1.5 text-xs font-medium text-destructive shadow-sm transition-all hover:bg-destructive/10 active:scale-[0.97]"
          >
            <Trash2 className="h-3.5 w-3.5" /> Slet valgt
          </button>
        )}

        {edgeMode && edgeMode !== "__waiting__" && (
          <span className="text-xs text-muted-foreground animate-pulse">
            Klik på mål-node…
          </span>
        )}
        {edgeMode === "__waiting__" && (
          <span className="text-xs text-muted-foreground animate-pulse">
            Klik på start-node…
          </span>
        )}
      </div>

      {/* Palette dropdown */}
      {showPalette && (
        <div className="mb-3 rounded-xl border border-border bg-card p-4 shadow-md">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">Vælg klasse fra ontologi</span>
            <button onClick={() => setShowPalette(false)} className="rounded p-0.5 hover:bg-muted">
              <X className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
          </div>
          {(["rec", "brick", "os2"] as const).map((ont) => (
            <div key={ont} className="mb-2">
              <span className={cn("inline-block rounded px-1.5 py-0.5 text-[10px] font-medium mb-1", ontologyBadge[ont])}>
                {ont === "rec" ? "RealEstateCore" : ont === "brick" ? "Brick Schema" : "OS2"}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {palette
                  .filter((p) => p.ontology === ont)
                  .map((p) => (
                    <button
                      key={p.label}
                      onClick={() => addNode(p)}
                      className="rounded-md border border-border bg-background px-2 py-1 text-[11px] font-mono text-foreground transition-colors hover:bg-muted active:scale-[0.97]"
                    >
                      {p.label}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SVG Canvas */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card p-2 shadow-sm">
        <svg
          ref={svgRef}
          viewBox={`${minX} ${minY} ${vbW} ${vbH}`}
          className="mx-auto w-full cursor-default"
          style={{ minHeight: 400, maxHeight: 600 }}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onClick={handleBgClick}
        >
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="hsl(215 12% 50% / 0.5)" />
            </marker>
            <marker id="arrow-hl" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6 Z" fill="hsl(210 45% 38%)" />
            </marker>
          </defs>

          {/* Edges */}
          {edges.map((edge) => {
            const fromNode = nodeMap[edge.from];
            const toNode = nodeMap[edge.to];
            if (!fromNode || !toNode) return null;
            const from = getCenter(fromNode);
            const to = getCenter(toNode);
            const start = clipToRect(from.cx, from.cy, to.cx, to.cy, NODE_W + 8, NODE_H + 8);
            const end = clipToRect(to.cx, to.cy, from.cx, from.cy, NODE_W + 8, NODE_H + 8);
            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2;
            const isEditing = editingEdge === edge.id;
            const isHighlighted = selected === edge.from || selected === edge.to;

            return (
              <g key={edge.id} onClick={(e) => { e.stopPropagation(); setEditingEdge(isEditing ? null : edge.id); }} className="cursor-pointer">
                {/* Wide invisible hit area for the line */}
                <line
                  x1={start.x} y1={start.y} x2={end.x} y2={end.y}
                  stroke="transparent" strokeWidth={14}
                />
                {/* Visible line */}
                <line
                  x1={start.x} y1={start.y} x2={end.x} y2={end.y}
                  stroke={isEditing ? "hsl(210 45% 38% / 0.6)" : isHighlighted ? "hsl(210 45% 38% / 0.5)" : "hsl(215 12% 50% / 0.2)"}
                  strokeWidth={isEditing ? 2.5 : isHighlighted ? 2 : 1.5}
                  markerEnd={isEditing ? "url(#arrow-hl)" : isHighlighted ? "url(#arrow-hl)" : "url(#arrow)"}
                  pointerEvents="none"
                />
                {/* Label */}
                <rect
                  x={midX - 42} y={midY - 10} width={84} height={20} rx={4}
                  fill={isEditing ? "hsl(210 45% 38% / 0.08)" : "hsl(210 20% 98%)"}
                  stroke={isEditing ? "hsl(210 45% 38% / 0.3)" : "hsl(210 16% 88%)"}
                  strokeWidth={0.8}
                />
                <text
                  x={midX} y={midY + 4} textAnchor="middle"
                  fill={isEditing ? "hsl(210 45% 38%)" : "hsl(215 12% 50%)"}
                  fontFamily="ui-monospace, monospace" fontSize={9}
                  pointerEvents="none"
                >
                  {edge.label}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const colors = ontologyFill[node.ontology];
            const { cx, cy } = getCenter(node);
            const isSelected = selected === node.id;
            const isEdgeSource = edgeMode === node.id;

            // Truncate label for display
            const displayLabel = node.label.length > 22 ? node.label.slice(0, 20) + "…" : node.label;

            return (
              <g
                key={node.id}
                onPointerDown={(e) => {
                  if (edgeMode === "__waiting__") {
                    e.stopPropagation();
                    setEdgeMode(node.id);
                  } else if (edgeMode && edgeMode !== node.id) {
                    e.stopPropagation();
                    handleNodeClick(node.id);
                  } else if (!edgeMode) {
                    handlePointerDown(node.id, e);
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className={cn("cursor-grab", dragging === node.id && "cursor-grabbing", edgeMode && "cursor-pointer")}
              >
                <rect
                  x={node.x} y={node.y} width={NODE_W} height={NODE_H} rx={8}
                  fill={colors.bg}
                  stroke={isSelected || isEdgeSource ? "hsl(210 45% 38%)" : colors.stroke}
                  strokeWidth={isSelected || isEdgeSource ? 2 : 1.2}
                  strokeDasharray={isEdgeSource ? "4 2" : undefined}
                />
                <text
                  x={cx} y={cy + 1}
                  textAnchor="middle" dominantBaseline="central"
                  fill={colors.text}
                  fontFamily="ui-monospace, monospace" fontSize={10} fontWeight={600}
                  pointerEvents="none"
                >
                  {displayLabel}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Edge editor popover */}
      {editingEdge && (() => {
        const edge = edges.find((e) => e.id === editingEdge);
        if (!edge) return null;
        return (
          <div className="mt-3 rounded-xl border border-border bg-card p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-foreground">Redigér relation</span>
              <button onClick={() => setEditingEdge(null)} className="rounded p-0.5 hover:bg-muted">
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
            <p className="text-[11px] text-muted-foreground mb-2 font-mono">
              {nodeMap[edge.from]?.label} → {nodeMap[edge.to]?.label}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {relationLabels.map((rel) => (
                <button
                  key={rel}
                  onClick={() => changeEdgeLabel(edge.id, rel)}
                  className={cn(
                    "rounded-md border px-2 py-1 text-[11px] font-mono transition-colors active:scale-[0.97]",
                    edge.label === rel
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-foreground hover:bg-muted"
                  )}
                >
                  {rel}
                </button>
              ))}
            </div>
            <button
              onClick={() => deleteEdge(edge.id)}
              className="inline-flex items-center gap-1 rounded-md border border-destructive/30 bg-destructive/5 px-2 py-1 text-[11px] font-medium text-destructive hover:bg-destructive/10 active:scale-[0.97]"
            >
              <Trash2 className="h-3 w-3" /> Slet relation
            </button>
          </div>
        );
      })()}

      {/* Legend */}
      <div className="mt-3 flex flex-wrap justify-center gap-4 text-[11px] text-muted-foreground">
        {(["rec", "brick", "os2"] as const).map((key) => (
          <span key={key} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm border"
              style={{ backgroundColor: ontologyFill[key].bg, borderColor: ontologyFill[key].stroke }}
            />
            {key === "rec" && "RealEstateCore"}
            {key === "brick" && "Brick Schema"}
            {key === "os2" && "OS2-udvidelse"}
          </span>
        ))}
      </div>

      <p className="mt-2 text-center text-[10px] text-muted-foreground/50">
        Træk noder for at flytte · Klik for at vælge · Brug værktøjslinjen til at tilføje klasser og forbindelser
      </p>
    </div>
  );
};

export default RelationshipGraph;
