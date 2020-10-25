import React from 'react';
import EventInfoPanel from '../EventInfoPanel';

const EventMonitor = ({evt}: {evt: any}) => {
  return <div>{evt && <EventInfoPanel evt={evt} />}</div>;
};

export default EventMonitor;
