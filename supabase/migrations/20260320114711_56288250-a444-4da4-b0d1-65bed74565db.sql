-- Single shared diagram stored as JSON
CREATE TABLE public.diagrams (
  id TEXT NOT NULL DEFAULT 'default' PRIMARY KEY,
  nodes JSONB NOT NULL DEFAULT '[]'::jsonb,
  edges JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.diagrams ENABLE ROW LEVEL SECURITY;

-- Anyone can read the shared diagram
CREATE POLICY "Anyone can read diagrams"
  ON public.diagrams FOR SELECT
  USING (true);

-- Anyone can update the shared diagram
CREATE POLICY "Anyone can update diagrams"
  ON public.diagrams FOR UPDATE
  USING (true);

-- Anyone can insert (for initial creation)
CREATE POLICY "Anyone can insert diagrams"
  ON public.diagrams FOR INSERT
  WITH CHECK (true);

-- Seed with default row
INSERT INTO public.diagrams (id, nodes, edges) VALUES ('default', '[]', '[]');