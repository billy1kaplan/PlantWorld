import {Line} from './Line';
import {LineSegment} from './LineSegment';
import {Point} from './Point';
import {Primitive} from './Primitive';
import {PrimitiveLine} from './PrimitiveLine';

export class VerticalLine implements PrimitiveLine {
  constructor(public x: number) {}

  distanceTo(other: Primitive): number {
    return other.distanceToVerticalLine(this);
  }

  distanceToPoint(point: Point): number {
    return Math.abs(this.x - point.getX());
  }

  distanceToLineSegment(lineSegment: LineSegment): number {
    return lineSegment.distanceToVerticalLine(this);
  }

  distanceToLine(line: Line): number {
    return line.distanceToVerticalLine(this);
  }

  distanceToVerticalLine(verticalLine: VerticalLine) {
    return Math.abs(this.x - verticalLine.getX());
  }

  getX() {
    return this.x;
  }

  evaluate(x: number) {
    throw new Error('Method not implemented.');
  }
  getSlope() {
    throw new Error('Method not implemented.');
  }
  getIntercept() {
    throw new Error('Method not implemented.');
  }
}