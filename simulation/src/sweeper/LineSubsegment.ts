import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';

/**
 * Struct for contain sub sections of a line segment.
 */
export class LineSubsegment {
    constructor(
        public point1: Point,
        public point2: Point,
        public lineSegment: LineSegment) { }
}
