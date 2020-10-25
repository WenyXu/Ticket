import {Item} from '@antv/g6/es/types';

export interface EventEntity {
  x: number;
  y: number;
  canvasX: number;
  canvasY: number;
  clientX: number;
  clientY: number;
  type: string;
  item: Item;
  timeStamp: number;
  removed: boolean;
  bubbles: boolean;
  cancelable: boolean;
  defaultPrevented: boolean;
}
