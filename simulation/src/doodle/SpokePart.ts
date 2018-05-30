import {IDrawingManager} from '../drawing/SimpleDrawingManager';

import {DoodleGenome, IDoodleGenome} from './DoodleGenome';
import {DoodleLocalSignal} from './DoodleLocalSignal';
import {DoodleLocation, LocalLocation, LocalPoint} from './DoodleLocation';
import {DoodlePart, Drawable, DrawableDoodle} from './DoodlePart';
import {DoodleSegment, IDoodleSegment} from './DoodleSegment';
import {UndifferentiatedPart} from './UndifferentiatedPart';

export class SpokePart implements DrawableDoodle {
  private genome: IDoodleGenome;
  private doodleParts: DrawableDoodle[];

  constructor(genome: IDoodleGenome, doodleParts: DrawableDoodle[]) {
    this.genome = genome;
    this.doodleParts = doodleParts;
  }

  grow(doodleLocalSignal: DoodleLocalSignal): DrawableDoodle {
    const newParts = this.doodleParts.map(p => p.grow(doodleLocalSignal));
    return new SpokePart(this.genome, newParts);
  }

  children() {
    return this.doodleParts;
  }

  log(): void {
    console.log(this);
    this.doodleParts.forEach(e => e.log());
  }

  segments() {
    return [];
  }

  draw(drawingManager: IDrawingManager): void {
    this.doodleParts.forEach(segment => segment.draw(drawingManager));
  }
}