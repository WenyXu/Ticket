export const data = {
  nodes: [
    {
      id: 'node1',
      label: 'Circle1',
      x: 150,
      y: 150,
      data: {
        test: 'test',
      },
    },
    {
      id: 'node2',
      label: 'Circle2',
      x: 400,
      y: 150,
      data: {
        test: 'test',
      },
    },
  ],
  edges: [
    {
      id: 'edge0',
      label: 'test',
      data: {test: 'test'},
      source: 'node1',
      target: 'node2',
    },
  ],
};
