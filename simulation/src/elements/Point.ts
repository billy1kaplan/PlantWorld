import { Line } from './Line';
import { LineSegment } from './LineSegment';
import { VerticalLine } from './VerticalLine';

export class Point {
  public static fromRadiusAngle(radius: number, angle: number) {
    const x = radius * Math.cos(Point.toRadians(angle));
    const y = radius * Math.sin(Point.toRadians(angle));
    return new Point(x, y);
  }

  private static toRadians(angle: number) {
    return (2 * Math.PI) / 360 * angle;
  }

  public constructor(public x: number, public y: number) {
    this.x = x;
    this.y = y;
  }

  public distanceToPoint(point: Point): number {
    const square = (n: number) => n * n;
    return Math.sqrt(square(this.x - point.x) + square(this.y - point.y));
  }

  public distanceToLine(line: Line): number {
    return line.distanceToPoint(this);
  }

  public distanceToLineSegment(lineSegment: LineSegment) {
    return lineSegment.distanceToPoint(this);
  }

  public distanceToVerticalLine(verticalLine: VerticalLine) {
    return this.distanceToPoint(this);
  }

  public getX() {
    return this.x;
  }

  public getY() {
    return this.y;
  }

  public equals(other: Point) {
    return this.getX() === other.getX() && this.getY() === other.getY();
  }

  public compareTo(other: Point): number {
    const xDiff = this.x - other.x;
    const yDiff = this.y - other.y;

    if (xDiff !== 0) {
      return xDiff;
    } else {
      return yDiff;
    }
  }
}
