import React, {useEffect, useRef, useState} from 'react';
import './App.scss';
import G6 from '@antv/g6';
import useWindowDimensions from './utils/useWindowDimensions';
import GridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {Tabs, Collapse, Form, Switch, Button} from 'antd';
import EventMonitor from './components/EventMonitor';
import {get, set} from './utils/localStorage';
import {getGraph, initGraph} from './graphql';
import {GraphData} from '@antv/g6/lib/types';
import {
  data,
  DEFAULT_LAYOUT,
  DEFAULT_LAYOUT_KEY,
  LAYOUT_KEY,
} from './constants';
import {EdgeInfoPanel, NodeInfoPanel} from './components/ItemInfoPanel';
import {IEdge, INode} from '@antv/g6/es/interface/item';
const {TabPane} = Tabs;
const {Panel} = Collapse;

const LAYOUT = get(LAYOUT_KEY)(DEFAULT_LAYOUT_KEY) || DEFAULT_LAYOUT;

const App = () => {
  const ref = useRef(null);
  const refLeftTop = useRef(null);
  const refBottom = useRef(null);
  const refLeft = useRef(null);
  const [clickEvt, setClickEvt] = useState(null);
  const {height, width} = useWindowDimensions();
  const [draggable, setDraggable] = useState(false);
  const [resizable, setResizable] = useState(false);
  const [layout, setLayout] = useState(LAYOUT);

  useEffect(() => {
    initGraph(ref.current, _g => {
      _g.data(data);
      _g.render();
      _g.on('click', evt => {
        setClickEvt(evt);
        console.log(evt);
      });
      _g.on('aftercreateedge', e => {
        const edges = (_g.save() as GraphData).edges;
        G6.Util.processParallelEdges(edges);
        _g.getEdges().forEach((edge, i) => {
          _g.updateItem(edge, edges[i]);
        });
      });
    });
  }, []);

  useEffect(() => {
    const rect = ref?.current?.getBoundingClientRect();
    if (getGraph()) {
      getGraph().changeSize(rect.width, rect.height);
    }
  }, [
    ref?.current?.getBoundingClientRect().height,
    ref?.current?.getBoundingClientRect().width,
  ]);

  return (
    <GridLayout
      margin={[2, 2]}
      isDraggable={draggable}
      isResizable={resizable}
      onLayoutChange={_layout => {
        setLayout(_layout);
        set(LAYOUT_KEY)(DEFAULT_LAYOUT_KEY, _layout);
      }}
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={30}
      width={width}>
      <div key="Graph" ref={ref} />
      <div className={'box'} key={'LeftTop'} ref={refLeftTop}>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab="State"
            key="1"
            style={{
              height: refLeftTop?.current?.getBoundingClientRect().height - 55,
              overflow: 'scroll',
            }}>
            {getGraph() && getGraph().getNodes() && (
              <Collapse defaultActiveKey={[]} ghost>
                {getGraph()
                  .getNodes()
                  .map((e, index) => (
                    <Panel header={`${e.getID()}`} key={index}>
                      <NodeInfoPanel
                        editable
                        renderEdges={false}
                        key={e.getID()}
                        item={e as INode}
                      />
                    </Panel>
                  ))}
              </Collapse>
            )}
          </TabPane>
          <TabPane
            tab="Transition"
            key="2"
            style={{
              height: refLeftTop?.current?.getBoundingClientRect().height - 55,
              overflow: 'scroll',
            }}>
            {getGraph() && getGraph().getEdges() && (
              <Collapse defaultActiveKey={[]} ghost>
                {getGraph()
                  .getEdges()
                  .map((e, index) => (
                    <Panel header={`${e.getID()}`} key={index}>
                      <EdgeInfoPanel
                        editable
                        key={e.getID()}
                        item={e as IEdge}
                      />
                    </Panel>
                  ))}
              </Collapse>
            )}
          </TabPane>
          <TabPane tab={'Trash'} />
        </Tabs>
      </div>
      <div ref={refLeft} className={'box'} key={'Left'}>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab="Event"
            key="1"
            style={{
              height: refLeft?.current?.getBoundingClientRect().height - 55,
              overflow: 'scroll',
            }}>
            <EventMonitor evt={clickEvt} />
          </TabPane>
          <TabPane tab="Setting" key="2">
            <Collapse defaultActiveKey={['1']} ghost>
              <Panel header="Windows" key="1">
                <Form.Item label="Draggable">
                  <Switch
                    checked={draggable}
                    onChange={() => setDraggable(!draggable)}
                  />
                </Form.Item>
                <Form.Item label="Resizable">
                  <Switch
                    checked={resizable}
                    onChange={() => setResizable(!resizable)}
                  />
                </Form.Item>
                <Form.Item label="Restore Default Layout">
                  <Button
                    onClick={() => {
                      setLayout(DEFAULT_LAYOUT);
                      set(LAYOUT_KEY)(DEFAULT_LAYOUT_KEY, DEFAULT_LAYOUT);
                    }}>
                    Restore
                  </Button>
                </Form.Item>
              </Panel>
              <Panel header="Windows" key="2">
                Hello
              </Panel>
            </Collapse>
          </TabPane>
        </Tabs>
      </div>
      <div className={'box'} key="Bottom" style={{overflow: 'scroll'}}>
        Form
      </div>
    </GridLayout>
  );
};

export default App;
