import { IPrimitive } from './IPrimitive';
import { IPrimitiveLine } from './IPrimitiveLine';
import { LineSegment } from './LineSegment';
import { Point } from './Point';
import { VerticalLine } from './VerticalLine';

export class Line implements IPrimitiveLine {
  public static fromTwoPoints(p1: Point, p2: Point): IPrimitiveLine {
    const slope = (p2.getY() - p1.getY()) / (p2.getX() - p1.getX());
    return this.fromPointSlope(slope, p1);
  }

  public static fromPointSlope(slope: number, point: Point): IPrimitiveLine {
    const intercept = -point.getX() * slope + point.getY();

    if (Math.abs(slope) === Infinity) {
      return new VerticalLine(point.getX());
    } else {
      return new Line(slope, intercept);
    }
  }

  public static fromSlopeIntercept(slope: number, intercept: number):
      IPrimitiveLine {
    return new Line(slope, intercept);
  }

  private constructor(public slope: number, public intercept: number) {}

  public evaluate(x: number) {
    return this.slope * x + this.intercept;
  }

  public evaluate1(x: number) {
    return this.slope * x + this.intercept;
  }

  public distanceTo(other: IPrimitive) {
    return other.distanceToLine(this);
  }

  public distanceToPoint(point: Point): number {
    if (point.distanceToPoint(
            new Point(point.getX(), this.evaluate(point.getX()))) === 0) {
      return 0;
    }

    const xA = point.getX() - 1;
    const xB = point.getX() + 1;

    const pointA = new Point(xA, this.evaluate(xA));
    const pointB = new Point(xB, this.evaluate(xB));
    const A = pointA.distanceTo(point);
    const B = pointB.distanceTo(point);
    const C = pointA.distanceTo(pointB);
    const square = (n) => n * n;

    return (square(A) + square(C) - square(B)) / (2 * C);
  }

  public distanceToLine(line: Line): number {
    if (this.slope === line.slope) {
      return this.distanceToPoint(new Point(0, line.evaluate(0)));
    } else {
      return 0;
    }
  }

  public distanceToLineSegment(lineSegment: LineSegment) {
    return lineSegment.distanceToLine(this);
  }

  public distanceToVerticalLine(verticalLine: VerticalLine) {
    return 0;
  }

  public getSlope() {
    return this.slope;
  }

  public getIntercept() {
    return this.intercept;
  }
}
