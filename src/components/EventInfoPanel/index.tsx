import {EventEntity} from '../../entities';
import React from 'react';
import {IG6GraphEvent} from '@antv/g6/es/types';
import ItemInfoPanel from '../ItemInfoPanel';
import {Collapse} from 'antd';
const {Panel} = Collapse;

const EventInfoPanel = ({
  evt: {x, y, canvasX, canvasY, clientX, clientY, type, item},
}: {
  evt: IG6GraphEvent;
}) => {
  return (
    <Collapse defaultActiveKey={['1']} ghost>
      <Panel header="Event" key="1">
        <div>
          <div>x:{x}</div>
          <div>y:{y}</div>
          <div>canvasX:{canvasX}</div>
          <div>canvasY:{canvasY}</div>
          <div>clientX:{clientX}</div>
          <div>clientY:{clientY}</div>
          <div>type:{type}</div>
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
