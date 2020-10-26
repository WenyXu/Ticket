import G6, {Graph} from '@antv/g6';

let _graph: Graph;
export const getGraph = (): Graph => _graph;
export const initGraph = (container: any, fn: (graph: Graph) => void) => {
  if (!_graph) {
    _graph = new G6.Graph({
      container: container,
      width: 400,
      height: 400,
      modes: {
        default: [
          'drag-canvas',
          'zoom-canvas',
          {
            type: 'create-edge',
            trigger: 'drag', // 'click' by default. options: 'drag', 'click'
          },
        ],
        edit: ['click-select'],
      },
      defaultNode: {
        shape: 'circle',
        size: [100],
        color: '#5B8FF9',
        style: {
          fill: '#9EC9FF',
          lineWidth: 3,
        },
        labelCfg: {
          style: {
            fill: '#fff',
            fontSize: 20,
          },
        },
      },
      defaultEdge: {
        style: {
          stroke: '#F6BD16',
          endArrow: true,
          lineWidth: 5,
        },
      },
    });
    fn(_graph);
  }
  return _graph;
};
