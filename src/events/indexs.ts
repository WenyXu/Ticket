import {Graph} from '@antv/g6';

export const BindEvents = (graph: Graph) => {
  graph.on('canvas:click', evt => {
    console.log('canvas:click', evt);
  });
  graph.on('node:mouseenter', evt => {
    console.log('node', evt);
  });
};
