import {LineSegment} from '../../elements/primitives/LineSegment';
import {Point} from '../../elements/primitives/Point';
import {cos, sin} from '../../geometricmath/Utility';

import {ILocalPoint} from './ILocalPoint';

export class LocalLocation implements ILocalPoint {
  private parent: ILocalPoint;
  private angularShift: number;
  private length: number;

  public constructor(parent: ILocalPoint, angularShift: number, length: number) {
    this.parent = parent;
    this.angularShift = angularShift;
    this.length = length;
  }

  public getGlobalPosition(): Point {
    const totalAngleOffset = this.parent.getAngularOffset() + this.angularShift;
    const deltaX = cos(totalAngleOffset) * this.length;
    const deltaY = sin(totalAngleOffset) * this.length;
    const parentPoint = this.parent.getGlobalPosition();
    return new Point(parentPoint.getX() + deltaX, parentPoint.getY() + deltaY);
  }

  public getAngularOffset(): number {
    return this.angularShift + this.parent.getAngularOffset();
  }

  public getParentOffset(): LineSegment {
    return new LineSegment(
        this.parent.getGlobalPosition(), this.getGlobalPosition());
  }

  public scale(parent: ILocalPoint, scaleFactor: number) {
    return new LocalLocation(
        parent, this.angularShift, this.length * scaleFactor);
  }
}
