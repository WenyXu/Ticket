import React from 'react';

const ObjectRender = (value: Object) => {
  return (
    <div>
      {value &&
        Object.entries(value).map(([key, value]) => (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <div>{key}:</div>
            <div>{JSON.stringify(value)}</div>
          </div>
        ))}
    </div>
  );
};

export default ObjectRender;
