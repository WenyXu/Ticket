import {EventEntity} from '../../entities';
import React from 'react';
import {IG6GraphEvent} from '@antv/g6/es/types';
import ItemInfoPanel from '../ItemInfoPanel';
import {Collapse} from 'antd';
import AttributeView from '../AttributeView';
const {Panel} = Collapse;

const EventInfoPanel = ({
  evt: {x, y, canvasX, canvasY, clientX, clientY, type, item},
}: {
  evt: IG6GraphEvent;
}) => {
  return (
    <Collapse defaultActiveKey={['1']} ghost>
      <Panel header="Click" key="1">
        <div>
          <AttributeView label={'X'} value={x.toString()} disableInput />
          <AttributeView label={'Y'} value={y.toString()} disableInput />
          <AttributeView
            label={'Canvas X'}
            value={canvasX.toString()}
            disableInput
          />
          <AttributeView
            label={'Canvas Y'}
            value={canvasY.toString()}
            disableInput
          />
          <AttributeView
            label={'Client X'}
            value={clientX.toString()}
            disableInput
          />
          <AttributeView
            label={'Client Y'}
            value={clientY.toString()}
            disableInput
          />
        </div>
        {item && (
          <Collapse defaultActiveKey={['1']} ghost>
            <Panel key={1} header={`${item.getType()}`}>
              <div>
                <ItemInfoPanel type={item.getType()} item={item} />
              </div>
            </Panel>
          </Collapse>
        )}
      </Panel>
    </Collapse>
  );
};
export default EventInfoPanel;
