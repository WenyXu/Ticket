import {Item, ITEM_TYPE, ModelConfig} from '@antv/g6/es/types';
import {ICombo, IEdge, INode} from '@antv/g6/es/interface/item';
import React from 'react';
import {Collapse} from 'antd';
const {Panel} = Collapse;

export const ModelInfoRender = ({
  model,
  type,
}: {
  model: ModelConfig;
  type: ITEM_TYPE;
}) => {
  switch (type) {
    case 'node':
      return (
        <div>
          <div>type:{type}</div>
          <div>type:{model.type}</div>
          <div>label:{model.label}</div>
          <div>id:{model?.id}</div>
          <div>data:{JSON.stringify(model?.data)}</div>
          <div>x:{model.x}</div>
          <div>y:{model.y}</div>
        </div>
      );
    case 'edge':
      return (
        <div>
          <div>type:{type}</div>
          <div>type:{model.type}</div>
          <div>label:{model.label}</div>
          <div>id:{model?.id}</div>
          <div>data:{JSON.stringify(model?.data)}</div>
          <div>source:{model?.source}</div>
          <div>target:{model?.target}</div>
          <div>startPoint:{JSON.stringify(model?.startPoint)}</div>
          <div>endPoint:{JSON.stringify(model?.endPoint)}</div>
        </div>
      );
    default:
      return <></>;
  }
  return (
    <div>
      <div>type:{type}</div>
      <div>type:{model.type}</div>
      <div>label:{model.label}</div>
      <div>id:{model?.id}</div>
      <div>data:{JSON.stringify(model?.data)}</div>
      <div>x:{model.x}</div>
      <div>y:{model.y}</div>
      <div>source:{model?.source}</div>
      <div>target:{model?.target}</div>
      <div>startPoint:{JSON.stringify(model?.startPoint)}</div>
      <div>endPoint:{JSON.stringify(model?.endPoint)}</div>
    </div>
  );
};

export const NodeInfoPanel = ({item}: {item: INode}) => {
  const model = item.getModel();
  const inEdges: IEdge[] = item.getInEdges();
  const outEdges: IEdge[] = item.getOutEdges();

  return (
    <div>
      <div>{model && <ModelInfoRender model={model} type={'node'} />}</div>

      {Array.isArray(inEdges) && (
        <Collapse defaultActiveKey={['0']} ghost>
          {inEdges.map((e, index) => (
            <Panel header={`in:${e.getID()}`} key={index}>
              <EdgeInfoPanel item={e} />
            </Panel>
          ))}
        </Collapse>
      )}
      {Array.isArray(outEdges) && (
        <Collapse defaultActiveKey={['0']} ghost>
          {outEdges.map((e, index) => (
            <Panel header={`out:${e.getID()}`} key={index}>
              <EdgeInfoPanel item={e} />
            </Panel>
          ))}
        </Collapse>
      )}
    </div>
  );
};
export const EdgeInfoPanel = ({item}: {item: IEdge}) => {
  const model = item.getModel();
  return (
    <div>
      <div>{model && <ModelInfoRender model={model} type={'edge'} />}</div>
    </div>
  );
};
export const ComboInfoPanel = ({item}: {item: ICombo}) => {
  return <></>;
};

const ItemInfoPanel = ({type, item: i}: {type: ITEM_TYPE; item: Item}) => {
  let ItemRender = <></>;
  switch (type) {
    case 'node':
      ItemRender = <NodeInfoPanel item={i as INode} />;
      break;
    case 'edge':
      ItemRender = <EdgeInfoPanel item={i as IEdge} />;
      break;
    case 'combo':
      ItemRender = <ComboInfoPanel item={i as ICombo} />;
      break;
  }
  return ItemRender;
};
export default ItemInfoPanel;
