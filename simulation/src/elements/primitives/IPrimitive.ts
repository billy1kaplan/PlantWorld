import {Line} from './Line';
import {LineSegment} from './LineSegment';
import {Point} from './Point';
import {VerticalLine} from './VerticalLine';

export interface IPrimitive {
  distanceTo(other: IPrimitive): number;
  distanceToPoint(point: Point): number;
  distanceToLineSegment(lineSegment: LineSegment): number;
  distanceToLine(line: Line): number;
  distanceToVerticalLine(verticalLine: VerticalLine): number;
}