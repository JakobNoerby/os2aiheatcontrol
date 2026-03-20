import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

/**
 * Visual relationship graph for Brick / REC / OS2 classes.
 * Pure SVG — no external dependencies.
 */

interface Node {
  id: string;
  label: string;
  ontology: "rec" | "brick" | "os2";
  x: number;
  y: number;
}

interface Edge {
  from: string;
  to: string;
  label: string;
}

const nodes: Node[] = [
  { id: "building", label: "rec:Building", ontology: "rec", x: 260, y: 40 },
  { id: "room", label: "rec:Room", ontology: "rec", x: 80, y: 150 },
  { id: "sensor", label: "brick:Temperature\nSensor", ontology: "brick", x: 80, y: 280 },
  { id: "weather", label: "brick:Weather\nStation", ontology: "brick", x: 440, y: 150 },
  { id: "timeseries", label: "brick:Timeseries\nReference", ontology: "brick", x: 260, y: 370 },
  { id: "schedule", label: "os2:Schedule", ontology: "os2", x: 440, y: 280 },
  { id: "setpoint", label: "os2:Setpoint", ontology: "os2", x: 440, y: 370 },
  { id: "fallback", label: "os2:Fallback\nStrategy", ontology: "os2", x: 260, y: 460 },
];

const edges: Edge[] = [
  { from: "room", to: "building", label: "locatedIn" },
  { from: "building", to: "sensor", label: "hasPoint" },
  { from: "sensor", to: "room", label: "isPointOf" },
  { from: "sensor", to: "timeseries", label: "hasTimeseriesId" },
  { from: "weather", to: "building", label: "monitors" },
  { from: "schedule", to: "building", label: "servesBuilding" },
  { from: "setpoint", to: "building", label: "servesBuilding" },
  { from: "fallback", to: "building", label: "servesBuilding" },
];

const ontologyFill = {
  rec: { bg: "hsl(210 45% 38% / 0.08)", stroke: "hsl(210 45% 38% / 0.35)", text: "hsl(210 45% 38%)" },
  brick: { bg: "hsl(195 50% 42% / 0.08)", stroke: "hsl(195 50% 42% / 0.35)", text: "hsl(195 50% 42%)" },
  os2: { bg: "hsl(215 12% 50% / 0.08)", stroke: "hsl(215 12% 50% / 0.35)", text: "hsl(215 12% 50%)" },
} as const;

const NODE_W = 130;
const NODE_H = 48;

function getNodeCenter(node: Node) {
  return { cx: node.x + NODE_W / 2, cy: node.y + NODE_H / 2 };
}

/** Shorten edge so arrow starts/ends at rectangle border, not center. */
function clipToRect(
  cx1: number, cy1: number,
  cx2: number, cy2: number,
  w: number, h: number
) {
  const dx = cx2 - cx1;
  const dy = cy2 - cy1;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);

  let t: number;
  if (absDx * (h / 2) > absDy * (w / 2)) {
    t = (w / 2) / absDx;
  } else {
    t = (h / 2) / absDy;
  }

  return { x: cx1 + dx * t, y: cy1 + dy * t };
}

const RelationshipGraph = () => {
  const ref = useScrollReveal<HTMLDivElement>(100);

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div ref={ref} className="scroll-reveal mt-10">
      <p className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
        Relationsdiagram
      </p>
      <div className="overflow-x-auto rounded-xl border border-border bg-card p-4 shadow-sm">
        <svg
          viewBox="0 0 580 510"
          className="mx-auto w-full max-w-[580px]"
          style={{ minWidth: 400 }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
            >
              <path
                d="M0,0 L8,3 L0,6 Z"
                fill="hsl(215 12% 50% / 0.5)"
              />
            </marker>
          </defs>

          {/* Edges */}
          {edges.map((edge) => {
            const fromNode = nodeMap[edge.from];
            const toNode = nodeMap[edge.to];
            const from = getNodeCenter(fromNode);
            const to = getNodeCenter(toNode);

            const start = clipToRect(from.cx, from.cy, to.cx, to.cy, NODE_W + 8, NODE_H + 8);
            const end = clipToRect(to.cx, to.cy, from.cx, from.cy, NODE_W + 8, NODE_H + 8);

            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2;

            return (
              <g key={`${edge.from}-${edge.to}`}>
                <line
                  x1={start.x}
                  y1={start.y}
                  x2={end.x}
                  y2={end.y}
                  stroke="hsl(215 12% 50% / 0.25)"
                  strokeWidth={1.5}
                  markerEnd="url(#arrowhead)"
                />
                <rect
                  x={midX - 38}
                  y={midY - 8}
                  width={76}
                  height={16}
                  rx={4}
                  fill="hsl(210 20% 98%)"
                  stroke="hsl(210 16% 88%)"
                  strokeWidth={0.5}
                />
                <text
                  x={midX}
                  y={midY + 4}
                  textAnchor="middle"
                  className="text-[9px]"
                  fill="hsl(215 12% 50%)"
                  fontFamily="ui-monospace, monospace"
                >
                  {edge.label}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const colors = ontologyFill[node.ontology];
            const lines = node.label.split("\n");
            const { cx, cy } = getNodeCenter(node);

            return (
              <g key={node.id}>
                <rect
                  x={node.x}
                  y={node.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={8}
                  fill={colors.bg}
                  stroke={colors.stroke}
                  strokeWidth={1.2}
                />
                {lines.map((line, i) => (
                  <text
                    key={i}
                    x={cx}
                    y={cy + (i - (lines.length - 1) / 2) * 13}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={colors.text}
                    fontFamily="ui-monospace, monospace"
                    fontSize={10}
                    fontWeight={600}
                  >
                    {line}
                  </text>
                ))}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-3 flex flex-wrap justify-center gap-4 text-[11px] text-muted-foreground">
        {(["rec", "brick", "os2"] as const).map((key) => (
          <span key={key} className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-sm border"
              style={{
                backgroundColor: ontologyFill[key].bg,
                borderColor: ontologyFill[key].stroke,
              }}
            />
            {key === "rec" && "RealEstateCore"}
            {key === "brick" && "Brick Schema"}
            {key === "os2" && "OS2-udvidelse"}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RelationshipGraph;
