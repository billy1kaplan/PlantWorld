import {Primitive} from './Primitive';

export interface PrimitiveLine extends Primitive {
  evaluate(x: number);
  getSlope();
  getIntercept();
}