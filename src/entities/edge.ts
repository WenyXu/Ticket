export interface Edge {
  source: string;
  target: string;
  data: {
    type: string; // EdgeEntity:_id
    value: string;
  };
}

export type EdgeSets = Map<string, Edge>;
