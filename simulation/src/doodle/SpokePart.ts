import { IDoodleGenome } from './DoodleGenome';
import { DoodleLocalSignal } from './DoodleLocalSignal';
import { ILocalPoint, LocalLocation } from './DoodleLocation';
import { IDoodlePart } from './IDoodlePart';
import { UndifferentiatedPart } from './UndifferentiatedPart';
import { IVisitor } from './Visitor';

export class SpokePart implements IDoodlePart {
  public static bud(numberOfElements: number,
                    genome: IDoodleGenome,
                    offset: number,
                    sweepRange: number) {
    const parts =
      Array(numberOfElements).fill(new UndifferentiatedPart(genome));
    return new SpokePart(genome, parts, offset, sweepRange);
  }

  private genome: IDoodleGenome;
  private doodleParts: IDoodlePart[];
  private offset: number;
  private sweepRange: number;

  public constructor(genome: IDoodleGenome,
                     doodleParts: IDoodlePart[],
                     offset: number,
                     sweepRange: number) {
    this.genome = genome;
    this.doodleParts = doodleParts;
    this.offset = offset;
    this.sweepRange = sweepRange;
  }

  public grow(doodleLocalSignal: DoodleLocalSignal): IDoodlePart {
    const parts = this.doodleParts.map((p, i) => {
      return p.grow(
        this.shiftSignal(i, doodleLocalSignal).adjustFactor((_) => 10));
    });
    return new SpokePart(this.genome, parts, this.offset, this.sweepRange);
  }

  public visit<T>(visitor: IVisitor<T>) {
    visitor.visitSpoke(this);
    this.doodleParts.forEach((child) => child.visit(visitor));
  }

  private shiftSignal(stepNumber: number, original: DoodleLocalSignal) {
    return original.updateLocation(
      this.shiftAngle(stepNumber, original.doodleLocation));
  }

  private shiftAngle(stepNumber: number, originalLocation: ILocalPoint) {
    const shift =
      this.offset + stepNumber * (this.sweepRange / this.doodleParts.length);
    return new LocalLocation(originalLocation, shift, 0);
  }
}
