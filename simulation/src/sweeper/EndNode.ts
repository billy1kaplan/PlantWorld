import {IHeapElement} from '../../../lib/heap/dist/IHeapElement';
import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';

import {SweepEvent} from './SweepEvent';

/**
 * A node that contains either the left or right end of a line segment.
 */
export class EndEvent implements IHeapElement {
    public static createLeft(segment: LineSegment) {
        return new EndEvent(segment.getP1(), segment, 'LEFT');
    }

    public static createRight(segment: LineSegment) {
        return new EndEvent(segment.getP2(), segment, 'RIGHT');
    }

    public kind: 'LEFT' | 'RIGHT';

    private constructor(public point: Point, public segment: LineSegment, kind: 'LEFT' | 'RIGHT') {
        this.kind = kind;
    }

    public equals(other: SweepEvent) {
        return this.kind === other.kind
            && this.point.equals(other.point)
            && this.segment.equals(other.segment);
    }

    public compareTo(other: SweepEvent) {
        return this.point.compareTo(other.point);
    }
}