import React, {ReactDOM, useCallback, useEffect, useRef, useState} from 'react';
import './App.scss';
import G6, {Graph} from '@antv/g6';
import useWindowDimensions from './utils/useWindowDimensions';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {Card, Collapse, Form, Switch} from 'antd';
import EventMonitor from './components/EventMonitor';
import {getFromLS, setToLS} from './utils/localStorage';
const {Panel} = Collapse;

const data = {
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

const LAYOUT = getFromLS('layout') || [
  {i: 'Graph', x: 0, y: 0, w: 9, h: 15},
  {i: 'Bottom', x: 0, y: 15, w: 9, h: 12},

  {i: 'LeftTop', x: 10, y: 0, w: 3, h: 17},
  {i: 'LeftBottom', x: 10, y: 18, w: 3, h: 10},
];

const App = () => {
  const ref = useRef(null);
  const [graph, setGraph] = useState<Graph>(null);
  const [clickEvt, setClickEvt] = useState(null);
  const {height, width} = useWindowDimensions();
  const [draggable, setDraggable] = useState(false);
  const [resizable, setResizable] = useState(false);

  useEffect(() => {
    let _graph;
    if (!graph) {
      _graph = new G6.Graph({
        container: ref.current,
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
      _graph.data(data);
      _graph.render();
      _graph.on('click', evt => {
        setClickEvt(evt);
        console.log(evt);
      });
      _graph.on('aftercreateedge', e => {
        const edges = _graph.save().edges;
        G6.Util.processParallelEdges(edges);
        _graph.getEdges().forEach((edge, i) => {
          _graph.updateItem(edge, edges[i]);
        });
      });
      setGraph(_graph);
    }
  }, [graph]);
  const [layout, setLayout] = useState(LAYOUT);
  useEffect(() => {
    const rect = ref?.current?.getBoundingClientRect();
    if (graph) {
      setGraph(graph.changeSize(rect.width, rect.height));
    }
  }, [
    graph,
    ref?.current?.getBoundingClientRect().height,
    ref?.current?.getBoundingClientRect().width,
  ]);
  return (
    //
    <GridLayout
      margin={[2, 2]}
      isDraggable={draggable}
      isResizable={resizable}
      onLayoutChange={_layout => {
        setLayout(_layout);
        setToLS('layout', _layout);
      }}
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={30}
      width={width}>
      <div key="Graph" ref={ref} />
      <Card key="LeftTop" style={{overflow: 'scroll'}}>
        <EventMonitor evt={clickEvt} />
      </Card>
      <Card key="LeftBottom" style={{overflow: 'scroll'}}>
        <Collapse defaultActiveKey={['1']} ghost>
          <Panel header="窗口设置" key="1">
            <Form.Item label="拖动">
              <Switch
                checked={draggable}
                onChange={() => setDraggable(!draggable)}
              />
            </Form.Item>
            <Form.Item label="缩放">
              <Switch
                checked={resizable}
                onChange={() => setResizable(!resizable)}
              />
            </Form.Item>
          </Panel>
          <Panel header="This is panel header 2" key="2"></Panel>
          <Panel header="This is panel header 3" key="3"></Panel>
        </Collapse>
      </Card>
      <Card key="Bottom" style={{overflow: 'scroll'}}>
        Form
      </Card>
    </GridLayout>
  );
};

export default App;
