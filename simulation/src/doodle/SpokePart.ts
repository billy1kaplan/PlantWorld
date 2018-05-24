import {IDrawingManager} from '../drawing/SimpleDrawingManager';

import {DoodleGenome, IDoodleGenome} from './DoodleGenome';
import {DoodleLocation, LocalPoint} from './DoodleLocation';
import {DoodlePart, Drawable, DrawableDoodle} from './DoodlePart';
import {DoodleSegment, IDoodleSegment} from './DoodleSegment';

export class SpokePart implements DrawableDoodle {
  private genome: IDoodleGenome;
  private doodleParts: DrawableDoodle[];

  constructor(genome: IDoodleGenome, doodleParts: DrawableDoodle[]) {
    this.genome = genome;
    this.doodleParts = doodleParts;
  }

  grow(localDoodle: LocalPoint): DrawableDoodle {
    const newSegments =
        this.doodleParts.map(segment => segment.grow(localDoodle));
    return new SpokePart(this.genome, newSegments);
  }

  children() {
    return this.doodleParts;
  }

  print(): void {
    console.log(this);
    this.doodleParts.forEach(e => e.print());
  }

  segments() {
    return [];
  }

  draw(drawingManager: IDrawingManager): void {
    this.doodleParts.forEach(segment => segment.draw(drawingManager));
  }
}