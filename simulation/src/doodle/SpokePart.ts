import { IDoodleGenome } from './DoodleGenome';
import { DoodleLocalSignal } from './DoodleLocalSignal';
import { LocalLocation, LocalPoint } from './DoodleLocation';
import { DoodlePart } from './DoodlePart';
import { UndifferentiatedPart } from './UndifferentiatedPart';
import { Visitor } from './Visitor';

export class SpokePart implements DoodlePart {
  private genome: IDoodleGenome;
  private doodleParts: DoodlePart[];
  private offset: number;
  private sweepRange: number;

  static bud(numberOfElements: number,
    genome: IDoodleGenome,
    offset: number,
    sweepRange: number) {
    const parts =
      Array(numberOfElements).fill(new UndifferentiatedPart(genome));
    return new SpokePart(genome, parts, offset, sweepRange);
  }

  constructor(genome: IDoodleGenome,
    doodleParts: DoodlePart[],
    offset: number,
    sweepRange: number) {
    this.genome = genome;
    this.doodleParts = doodleParts;
    this.offset = offset;
    this.sweepRange = sweepRange;
  }

  private shiftAngle(stepNumber: number, originalLocation: LocalPoint) {
    const shift =
      this.offset + stepNumber * (this.sweepRange / this.doodleParts.length);
    return new LocalLocation(originalLocation, shift, 0);
  }

  private shiftSignal(stepNumber: number, original: DoodleLocalSignal) {
    return original.updateLocation(this.shiftAngle(stepNumber, original.doodleLocation));
  }

  grow(doodleLocalSignal: DoodleLocalSignal): DoodlePart {
    const parts = this.doodleParts.map((p, i) => {
      return p.grow(this.shiftSignal(i, doodleLocalSignal).adjustFactor((_) => 10));
    });
    return new SpokePart(this.genome, parts, this.offset, this.sweepRange);
  }

  visit<T>(visitor: Visitor<T>) {
    visitor.vistSpoke(this);
    this.doodleParts.forEach(child => child.visit(visitor));
  }
}