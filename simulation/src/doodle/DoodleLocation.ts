import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';
import {cos, sin} from '../geometricmath/Utility';

export interface LocalPoint {
  getGlobalPosition(): Point;
  getAngularOffset(): number;
}
export class RootPoint implements LocalPoint {
  private point: Point;
  private angularOffset: number;

  constructor(point: Point, angularOffset: number) {
    this.point = point;
    this.angularOffset = angularOffset;
  }

  getGlobalPosition(): Point {
    return this.point;
  }

  getAngularOffset(): number {
    return this.angularOffset;
  }
}

export class LocalLocation implements LocalPoint {
  private parent: LocalPoint;

  private angularShift: number;
  private length: number;

  constructor(parent: LocalPoint, angularShift: number, length: number) {
    this.parent = parent;
    this.angularShift = angularShift;
    this.length = length;
  }

  getGlobalPosition(): Point {
    const totalAngleOffset = this.parent.getAngularOffset() + this.angularShift;
    const deltaX = cos(totalAngleOffset) * this.length;
    const deltaY = sin(totalAngleOffset) * this.length;
    const parentPoint = this.parent.getGlobalPosition();
    return new Point(parentPoint.getX() + deltaX, parentPoint.getY() + deltaY);
  }

  getAngularOffset(): number {
    return this.angularShift + this.parent.getAngularOffset();
  }

  getParentOffset(): LineSegment {
    return new LineSegment(
        this.parent.getGlobalPosition(), this.getGlobalPosition());
  }

  scale(parent: LocalPoint, scaleFactor: number) {
    return new LocalLocation(
        parent, this.angularShift, this.length * scaleFactor);
  }
}