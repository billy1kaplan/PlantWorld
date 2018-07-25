import {Point} from '../../elements/primitives/Point';
import {ILocalPoint} from './ILocalPoint';

export class RootLocation implements ILocalPoint {
  private point: Point;
  private angularOffset: number;

  public constructor(point: Point, angularOffset: number) {
    this.point = point;
    this.angularOffset = angularOffset;
  }

  public getGlobalPosition(): Point {
    return this.point;
  }

  public getAngularOffset(): number {
    return this.angularOffset;
  }
}
