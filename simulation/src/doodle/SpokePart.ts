import {IDrawingManager} from '../drawing/SimpleDrawingManager';

import {DoodleGenome, IDoodleGenome} from './DoodleGenome';
import {DoodleLocation} from './DoodleLocation';
import {DoodlePart} from './DoodlePart';
import {DoodleSegment, IDoodleSegment} from './DoodleSegment';

export class SpokePart implements DoodlePart {
  private genome: IDoodleGenome;
  private doodleParts: DoodlePart[];

  private doodleLocation: DoodleLocation;

  constructor(
      genome: IDoodleGenome, doodleLocation: DoodleLocation,
      doodleParts: DoodlePart[]) {
    this.genome = genome;
    this.doodleParts = doodleParts;
    this.doodleLocation = doodleLocation;
  }

  grow(doodleLocation: DoodleLocation): DoodlePart {
    const newSegments =
        this.doodleParts.map(segment => segment.grow(doodleLocation));
    return new SpokePart(this.genome, doodleLocation, newSegments);
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