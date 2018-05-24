import {Line} from '../elements/primitives/Line';
import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';

export class DoodleLocation {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  transformChildX(x: number): number {
    return this.x + x;
  }

  transformChildY(y: number): number {
    return this.y + y;
  }

  shift(x: number, y: number) {
    return new DoodleLocation(this.x + x, this.y + y);
  }

  convertToGlobalPosition(x: number, y: number): LineSegment {
    return new LineSegment(
        new Point(this.x, this.y), new Point(this.x + x, this.y + y));
  }
}

export interface LocalPoint {
  getGlobalPosition(): Point;
  getAngularOffset(): number;
  getParentOffset(): LineSegment;
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

  getParentOffset(): LineSegment {
    return new LineSegment(this.point, this.point);
  }
}

export class LocalLocation implements LocalPoint {
  private parent: LocalPoint;

  private angularShift: number;
  private length: number;

  constructor(parent: LocalPoint) {
    this.parent = parent;
  }

  getGlobalPosition(): Point {
    const totalAngleOffset = this.parent.getAngularOffset() + this.angularShift;
    const deltaX = Math.cos(totalAngleOffset * this.length);
    const deltaY = Math.sin(totalAngleOffset * this.length);
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
}