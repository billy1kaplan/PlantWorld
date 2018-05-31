import {Line} from './Line';
import {LineSegment} from './LineSegment';
import {Primitive} from './Primitive';
import {VerticalLine} from './VerticalLine';

export class Point implements Primitive {
  static fromRadiusAngle(radius: number, angle: number) {
    const x = radius * Math.cos(Point.toRadians(angle));
    const y = radius * Math.sin(Point.toRadians(angle));
    return new Point(x, y);
  }

  private static toRadians(angle: number) {
    return (2 * Math.PI) / 360 * angle;
  }

  constructor(public x: number, public y: number) {
    this.x = x;
    this.y = y;
  }

  distanceTo(other: Primitive) {
    return other.distanceToPoint(this);
  }

  distanceToPoint(point: Point): number {
    const square = (n: number) => n * n;
    return Math.sqrt(square(this.x - point.x) + square(this.y - point.y));
  }

  distanceToLine(line: Line): number {
    return line.distanceToPoint(this);
  }

  distanceToLineSegment(lineSegment: LineSegment) {
    return lineSegment.distanceToPoint(this);
  }

  distanceToVerticalLine(verticalLine: VerticalLine) {
    return this.distanceToPoint(this);
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  equals(other: Point) {
    return this.getX() == other.getX() && this.getY() == other.getY();
  }

  compareTo(other: Point): number {
    const xDiff = this.x - other.x;
    const yDiff = this.y - other.y;

    if (xDiff != 0) {
      return xDiff;
    } else {
      return yDiff;
    }
  }
}