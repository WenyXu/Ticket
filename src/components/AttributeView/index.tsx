import React, {ReactElement} from 'react';
import {Input} from 'antd';

const AttributeView = ({
  label,
  value,
  disableInput = false,
  onChange,
}: {
  label: string;
  value: string | ReactElement;
  disableInput?: boolean;
  onChange?: (value: any) => void;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}>
      <div>{label}</div>
      {!disableInput && typeof value === 'string' && (
        <input onChange={event => onChange(event.target.value)} value={value} />
      )}
      {!disableInput && typeof value === 'undefined' && (
        <input onChange={event => onChange(event.target.value)} value={value} />
      )}

      {(disableInput || typeof value === 'object') && <div>{value}</div>}
    </div>
  );
};

export default AttributeView;
