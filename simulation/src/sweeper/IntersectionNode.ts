import {IHeapElement} from '../../../lib/heap/dist/IHeapElement';
import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';

import {SweepEvent} from './SweepEvent';

/**
 * Represents an intersection point for the line sweeping heap.
 */
export class IntersectionEvent implements IHeapElement {
  public kind: 'INTERSECTION';

  constructor(
    public point: Point,
    public lowerSegment: LineSegment,
    public upperSegment: LineSegment) {
    this.kind = 'INTERSECTION';
  }

  // Makes sure we can detect duplicate intersection nodes
  public equals(other: SweepEvent) {
    return this.kind === other.kind
    && this.point.equals(other.point)
    && this.lowerSegment.equals(other.lowerSegment)
    && this.upperSegment.equals(other.upperSegment);
  }

  public compareTo(other: SweepEvent) {
    return this.point.compareTo(other.point);
  }
}
