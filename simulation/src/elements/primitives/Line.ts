import {LineSegment} from './LineSegment';
import {Point} from './Point';
import {Primitive} from './Primitive';
import {PrimitiveLine} from './PrimitiveLine';
import {VerticalLine} from './VerticalLine';
import { Optional } from 'Optional';

export class Line implements PrimitiveLine {
  private constructor(public slope: number, public intercept: number) {}

  public static fromTwoPoints(p1: Point, p2: Point): PrimitiveLine {
    const slope = (p2.getY() - p1.getY()) / (p2.getX() - p1.getX());
    return this.fromPointSlope(slope, p1);
  }

  public static fromPointSlope(slope: number, point: Point): PrimitiveLine {
    const intercept = -point.getX() * slope + point.getY();

    if (Math.abs(slope) == Infinity) {
      return new VerticalLine(point.getX());
    } else {
      return new Line(slope, intercept);
    }
  }

  public static fromSlopeIntercept(slope: number, intercept: number):
      PrimitiveLine {
    return new Line(slope, intercept);
  }

  public evaluate(x: number) {
    return this.slope * x + this.intercept;
  }

  public evaluate1(x: number) {
    return this.slope * x + this.intercept;
  }

  distanceTo(other: Primitive) {
    return other.distanceToLine(this);
  }

  distanceToPoint(point: Point): number {
    if (point.distanceToPoint(
            new Point(point.getX(), this.evaluate(point.getX()))) == 0) {
      return 0;
    }

    const xA = point.getX() - 1;
    const xB = point.getX() + 1;

    const pointA = new Point(xA, this.evaluate(xA));
    const pointB = new Point(xB, this.evaluate(xB));
    const A = pointA.distanceTo(point);
    const B = pointB.distanceTo(point);
    const C = pointA.distanceTo(pointB);
    const square = n => n * n;

    return (square(A) + square(C) - square(B)) / (2 * C);
  }

  distanceToLine(line: Line): number {
    if (this.slope == line.slope) {
      return this.distanceToPoint(new Point(0, line.evaluate(0)));
    } else {
      return 0;
    }
  }

  distanceToLineSegment(lineSegment: LineSegment) {
    return lineSegment.distanceToLine(this);
  }

  distanceToVerticalLine(verticalLine: VerticalLine) {
    return 0;
  }

  getSlope() {
    return this.slope;
  }

  getIntercept() {
    return this.intercept;
  }
}