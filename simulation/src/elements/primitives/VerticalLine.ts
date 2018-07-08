import { IPrimitive } from './IPrimitive';
import { IPrimitiveLine } from './IPrimitiveLine';
import { Line } from './Line';
import { LineSegment } from './LineSegment';
import { Point } from './Point';

export class VerticalLine implements IPrimitiveLine {
  constructor(public x: number) {}

  public distanceTo(other: IPrimitive): number {
    return other.distanceToVerticalLine(this);
  }

  public distanceToPoint(point: Point): number {
    return Math.abs(this.x - point.getX());
  }

  public distanceToLineSegment(lineSegment: LineSegment): number {
    return lineSegment.distanceToVerticalLine(this);
  }

  public distanceToLine(line: Line): number {
    return line.distanceToVerticalLine(this);
  }

  public distanceToVerticalLine(verticalLine: VerticalLine) {
    return Math.abs(this.x - verticalLine.getX());
  }

  public getX() {
    return this.x;
  }

  public evaluate(x: number) {
    throw new Error('Method not implemented.');
  }
  public getSlope() {
    throw new Error('Method not implemented.');
  }
  public getIntercept() {
    throw new Error('Method not implemented.');
  }
}
