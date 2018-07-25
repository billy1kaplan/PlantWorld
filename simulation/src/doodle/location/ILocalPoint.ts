import {Point} from '../../elements/primitives/Point';

export interface ILocalPoint {
  getGlobalPosition(): Point;
  getAngularOffset(): number;
}
