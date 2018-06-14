import {IDrawingManager} from '../drawing/SimpleDrawingManager';
import {flatMap} from '../geometricmath/Utility';

import {IDoodleGenome} from './DoodleGenome';
import {DoodleLocalSignal} from './DoodleLocalSignal';
import {LocalLocation, LocalPoint} from './DoodleLocation';
import {DrawableDoodle} from './DoodlePart';
import {PressedDoodle} from './PressedDoodle';
import {UndifferentiatedPart} from './UndifferentiatedPart';

export class SpokePart implements DrawableDoodle {
  private genome: IDoodleGenome;
  private doodleParts: DrawableDoodle[];
  private offset: number;
  private sweepRange: number;

  static bud(
      numberOfElements: number, genome: IDoodleGenome, offset: number,
      sweepRange: number) {
    const parts =
        Array(numberOfElements).fill(new UndifferentiatedPart(genome));
    return new SpokePart(genome, parts, offset, sweepRange);
  }

  constructor(
      genome: IDoodleGenome, doodleParts: DrawableDoodle[], offset: number,
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
    return new DoodleLocalSignal(
        this.shiftAngle(stepNumber, original.doodleLocation),
        original.hopLength + 1, original.freeEnergy);
  }

  grow(doodleLocalSignal: DoodleLocalSignal): DrawableDoodle {
    const parts = this.doodleParts.map((p, i) => {
      return p.grow(this.shiftSignal(i, doodleLocalSignal));
    });
    return new SpokePart(this.genome, parts, this.sweepRange, this.offset);
  }

  log(): void {
    console.log(this);
    this.doodleParts.forEach(e => e.log());
  }

  draw(drawingManager: IDrawingManager): void {
    this.doodleParts.forEach(segment => segment.draw(drawingManager));
  }

  lightParts(): PressedDoodle[] {
    return flatMap(this.doodleParts, c => c.lightParts());
  }
}