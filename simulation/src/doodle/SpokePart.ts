import {IDrawingManager} from '../drawing/SimpleDrawingManager';

import {DoodleGenome, IDoodleGenome} from './DoodleGenome';
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

  grow(growthPoint: LocalPoint): DrawableDoodle {
    const newParts = this.doodleParts.map(p => p.grow(growthPoint));
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