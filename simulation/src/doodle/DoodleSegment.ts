import {Optional} from 'Optional';

import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';
import {Sun} from '../world/Sun';

import {Doodle} from './Doodle';
import {DoodleSubSegment} from './DoodleSubSegment';

export class DoodleSegment {
  private doodle: Doodle;
  private lineSegment: LineSegment;
  private visible: LineSegment[];

  static of(doodle: Doodle, lineSegment: LineSegment) {
    return new DoodleSegment(doodle, lineSegment, []);
  }

  private constructor(
      doodle: Doodle, lineSegment: LineSegment, visible: LineSegment[]) {
    this.doodle = doodle;
    this.lineSegment = lineSegment;
    this.visible = visible;
  }

  update(visible: LineSegment[]) {
    this.visible = visible;
  }

  intersect(other: DoodleSegment) {
    return this.lineSegment.intersection(other.lineSegment);
  }

  overlap(other: DoodleSegment): Optional<LineSegment> {
    return this.lineSegment.overlap(other.lineSegment);
  }

  collectEnergy(sun: Sun): void {
    const energy = this.visible.map(a => sun.energyFunctionFromLineSegment(a))
                       .reduce((a, b) => a + b, 0);
    console.log(energy);
    this.doodle.collectEnergy(energy);
  }

  getSegment() {
    return this.lineSegment;
  }
}