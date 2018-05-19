import {Optional} from 'Optional';

import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';
import {Sun} from '../world/Sun';

import {Doodle} from './Doodle';
import {DoodlePart} from './DoodlePart';
import {SpokePart} from './SpokePart';


export interface IDoodleSegment {
  collectEnergy(sun: Sun): void;
  grow(): DoodlePart;
  getLine(): LineSegment;
}

export class DoodleSegment implements IDoodleSegment, DoodlePart {
  private lineSegment: LineSegment;
  private visible: LineSegment[];

  private nextPart: DoodlePart;

  static of(nextPart: DoodlePart, lineSegment: LineSegment) {
    return new DoodleSegment(nextPart, lineSegment, []);
  }

  private constructor(
      nextPart: DoodlePart, lineSegment: LineSegment, visible: LineSegment[]) {
    this.nextPart = nextPart;
    this.lineSegment = lineSegment;
    this.visible = visible;
  }

  children() {
    return [this.nextPart];
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
  }

  getSegment() {
    return this.lineSegment;
  }

  grow(): DoodlePart {
    return this.nextPart.grow();
  }

  print(): void {
    console.log(this);
    this.nextPart.print();
  }

  getLine() {
    return this.lineSegment;
  }

  segments() {
    return [this];
  }
}