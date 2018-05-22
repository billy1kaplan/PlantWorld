import {IDrawingManager} from '../drawing/SimpleDrawingManager';
import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';

import {Doodle} from './Doodle';
import {IDoodleGenome} from './DoodleGenome';
import {DoodleLocation} from './DoodleLocation';
import {DoodlePart} from './DoodlePart';
import {DoodleSegment, IDoodleSegment} from './DoodleSegment';
import {SpokePart} from './SpokePart';
import {UndifferentiatedPart} from './UndifferentiatedPart';

export interface ISeedGenome {
  grow(doodleLocation: DoodleLocation): DoodlePart;
  getDoodleGenome: () => IDoodleGenome;
}

export class SeedGenome implements ISeedGenome {
  private doodleGenome: IDoodleGenome;
  constructor(doodleGenome: IDoodleGenome) {
    this.doodleGenome = doodleGenome;
  }

  grow(doodleLocation: DoodleLocation) {
    const undifferentiatedPart =
        new UndifferentiatedPart(this.doodleGenome, doodleLocation);
    const segment =
        DoodleSegment.of(undifferentiatedPart, 100, 100, doodleLocation);
    return new SpokePart(this.doodleGenome, doodleLocation, [segment, segment]);
  }

  print(): void {
    console.log(this);
  }

  getDoodleGenome() {
    return this.doodleGenome;
  }
}

export class Seed implements ISeedGenome, DoodlePart {
  private doodleGenome: ISeedGenome;
  private doodleLocation: DoodleLocation;

  constructor(doodleGenome: ISeedGenome, doodleLocation: DoodleLocation) {
    this.doodleGenome = doodleGenome;
    this.doodleLocation = doodleLocation;
  }

  grow(doodleLocation: DoodleLocation): DoodlePart {
    return this.doodleGenome.grow(doodleLocation);
  }

  print(): void {
    console.log(this);
  }

  children(): DoodlePart[] {
    return [];
  }

  getDoodleGenome(): IDoodleGenome {
    return this.doodleGenome.getDoodleGenome();
  }

  segments() {
    return [];
  }

  draw(drawingManager: IDrawingManager): void {}
}