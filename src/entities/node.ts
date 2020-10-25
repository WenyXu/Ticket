export interface Node {
  id: string;
  label: string;
  data: {
    type: string; // NodeEntity:_id
    value: string;
  };
}

export type NodeSets = Map<string, Node>;
