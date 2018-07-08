import {IPrimitive} from './IPrimitive';

export interface IPrimitiveLine extends IPrimitive {
  evaluate(x: number);
  getSlope();
  getIntercept();
}
