import { Line } from './Line';
import { LineSegment } from './LineSegment';
import { Point } from './Point';
import { Optional } from 'Optional';

export class VerticalLine {
  constructor(public x: number) {}

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

  public evaluate(x: number): Optional<number> {
    return Optional.empty();
  }

  public getX() {
    return this.x;
  }
}
