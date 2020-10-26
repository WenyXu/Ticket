import {Item, ITEM_TYPE, ModelConfig} from '@antv/g6/es/types';
import {ICombo, IEdge, INode} from '@antv/g6/es/interface/item';
import React, {useState} from 'react';
import {Collapse} from 'antd';
import AttributeView from '../AttributeView';
import ObjectRender from '../ObjectRender';
import {getGraph} from '../../graphql';
const {Panel} = Collapse;

export const ModelInfoRender = ({
  model,
  type,
  editable = false,
}: {
  editable?: boolean;
  model: ModelConfig;
  type: ITEM_TYPE;
}) => {
  const [_model, setModel] = useState(model);
  switch (type) {
    case 'node':
      return (
        <div>
          <AttributeView
            label={'Model Type'}
            value={_model.type}
            disableInput
          />
          <AttributeView
            label={'Model ID'}
            value={_model?.id.toString()}
            onChange={value => setModel({..._model, id: value})}
            disableInput={!editable}
          />
          <AttributeView
            label={'Model Label'}
            value={_model?.label?.toString()}
            onChange={value => setModel({..._model, label: value})}
            disableInput={!editable}
          />
          <AttributeView
            label={'Data'}
            value={ObjectRender(_model?.data)}
            disableInput={!editable}
          />
          <AttributeView
            label={'X'}
            value={_model?.x?.toString()}
            onChange={value => setModel({..._model, x: value})}
            disableInput={!editable}
          />
          <AttributeView
            label={'Y'}
            value={_model?.y?.toString()}
            onChange={value => setModel({..._model, y: value})}
            disableInput={!editable}
          />
          <button onClick={() => console.log(_model)}>submit</button>
        </div>
      );
    case 'edge':
      return (
        <div>
          <AttributeView
            label={'Model Type'}
            value={_model.type}
            disableInput
          />
          <AttributeView
            label={'Model ID'}
            value={_model?.id.toString()}
            onChange={value => setModel({..._model, id: value})}
            disableInput={!editable}
          />
          <AttributeView
            label={'Model Label'}
            value={_model?.label?.toString()}
            onChange={value => setModel({..._model, label: value})}
            disableInput={!editable}
          />
          <AttributeView
            label={'Data'}
            value={ObjectRender(_model?.data)}
            disableInput={!editable}
          />

          <AttributeView
            label={'Source'}
            value={_model?.source.toString()}
            onChange={value => setModel({..._model, source: value})}
            disableInput={!editable}
          />
          <AttributeView
            label={'Target'}
            value={_model?.target.toString()}
            onChange={value => setModel({..._model, target: value})}
            disableInput={!editable}
          />
          <AttributeView
            label={'Start Point'}
            value={ObjectRender(_model?.startPoint)}
            disableInput
          />
          <AttributeView
            label={'End Point'}
            value={ObjectRender(_model?.endPoint)}
            disableInput
          />
        </div>
      );
    default:
      return <></>;
  }
};

export const NodeInfoPanel = ({
  editable = false,
  item,
  renderEdges = true,
}: {
  item: INode;
  renderEdges?: boolean;
  editable?: boolean;
}) => {
  const model = item.getModel();
  const inEdges: IEdge[] = item.getInEdges();
  const outEdges: IEdge[] = item.getOutEdges();

  return (
    <div>
      <div>
        {model && (
          <ModelInfoRender editable={editable} model={model} type={'node'} />
        )}
      </div>
      {renderEdges && Array.isArray(inEdges) && (
        <Collapse defaultActiveKey={[]} ghost>
          {inEdges.map((e, index) => (
            <Panel header={`in:${e.getID()}`} key={index}>
              <EdgeInfoPanel editable={editable} item={e} />
            </Panel>
          ))}
        </Collapse>
      )}

      {renderEdges && Array.isArray(outEdges) && (
        <Collapse defaultActiveKey={[]} ghost>
          {outEdges.map((e, index) => (
            <Panel header={`out:${e.getID()}`} key={index}>
              <EdgeInfoPanel editable={editable} item={e} />
            </Panel>
          ))}
        </Collapse>
      )}
    </div>
  );
};
export const EdgeInfoPanel = ({
  editable = false,
  item,
}: {
  editable?: boolean;
  item: IEdge;
}) => {
  const model = item.getModel();
  return (
    <div>
      <div>
        {model && (
          <ModelInfoRender editable={editable} model={model} type={'edge'} />
        )}
      </div>
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
