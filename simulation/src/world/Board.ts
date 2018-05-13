import {DoodleSegment} from '../doodle/DoodleSegment';
import {DoodleSubSegment} from '../doodle/DoodleSubSegment';
import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';

import {Sun} from './Sun';

export class EnergyBoard {
  private sun: Sun;
  private visibleSegments: VisibleSegments;

  constructor(sun: Sun) {
    this.sun = sun;
    this.visibleSegments = new VisibleSegments([]);
  }

  insertSegment(doodleSegment: DoodleSegment): void {
    this.visibleSegments.insertSegment(doodleSegment);
  }

  distributeEnergy() {
    this.visibleSegments.getSeg().forEach(element => {
      element.collectEnergy(this.sun);
    });
  }
}

export class VisibleSegments {
  private doodleSegments: DoodleSegment[];

  constructor(doodleSegments) {
    this.doodleSegments = doodleSegments;
  }

  insertSegment(doodleSegment: DoodleSegment): void {
    var nowVisible: LineSegment[] = [];
    this.doodleSegments.unshift(doodleSegment);

    for (var i = 0; i < this.doodleSegments.length; i++) {
      const currentSegment = this.doodleSegments[i];
      var blockedIntervals: LineSegment[] = [];
      for (var j = 0; j < this.doodleSegments.length; j++) {
        if (i == j) {
          continue;
        }

        const otherSegment = this.doodleSegments[j];

        currentSegment.overlap(otherSegment)
            .ifPresent((value) => blockedIntervals.unshift(value));
      }

      const visible = this.visibleSubsegments(
          currentSegment.getSegment(), blockedIntervals);
      const segment = currentSegment.update(visible);
    }
  }

  visibleSubsegments(lineSegment: LineSegment, blockedIntervals: LineSegment[]):
      LineSegment[] {
    const start = new LineSegment(lineSegment.p1, lineSegment.p1);
    const end = new LineSegment(lineSegment.p2, lineSegment.p2);

    const segmentsWithEnd = [start, ...blockedIntervals, end];
    const sortedSegments = segmentsWithEnd.sort((a, b) => {
      const diff = a.p1.getX() - b.p1.getX();

      if (diff == 0) {
        return a.p2.getX() - b.p2.getX();
      } else {
        return diff;
      }
    });

    var visible: LineSegment[] = [];
    var lastHigh: Point = start.p1;
    for (var i = 0; i < sortedSegments.length; i++) {
      const low = sortedSegments[i].p1;
      if (lastHigh.getX() < low.getX()) {
        visible.unshift(new LineSegment(lastHigh, low));
      }
      const newHigh = sortedSegments[i].p2;
      if (newHigh.getX() > lastHigh.getX()) {
        lastHigh = newHigh;
      }
    }

    return visible;
  }

  getSeg() {
    return this.doodleSegments;
  }
}