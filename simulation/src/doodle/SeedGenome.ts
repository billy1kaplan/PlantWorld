import {IDrawingManager} from '../drawing/SimpleDrawingManager';
import {LineSegment} from '../elements/primitives/LineSegment';

import {DoodleGenome, IDoodleGenome} from './DoodleGenome';
import {DoodleCharacteristics, DoodleLocalSignal} from './DoodleLocalSignal';
import {DoodleLocation, LocalLocation, RootPoint} from './DoodleLocation';
import {DoodlePart, Drawable, DrawableDoodle, Loggable} from './DoodlePart';
import {DoodleSegment} from './DoodleSegment';
import {SpokePart} from './SpokePart';
import {UndifferentiatedPart} from './UndifferentiatedPart';

export interface ISeedGenome {
  grow(rootCharacteristics: DoodleLocalSignal): DrawableRoot;
  getDoodleGenome: () => IDoodleGenome;
}
export interface RootPart {
  grow(): DrawableRoot;
  lightParts(): LineSegment[];
}
export type DrawableRoot = RootPart&Drawable&Loggable;

export class SeedGenome implements ISeedGenome {
  private doodleGenome: IDoodleGenome;
  constructor(doodleGenome: IDoodleGenome) {
    this.doodleGenome = doodleGenome;
  }

  grow(rootCharacteristics: DoodleLocalSignal): DrawableRoot {
    const placeholder = new UndifferentiatedPart(this.doodleGenome);
    const angles = [0];
    const rootLocation = rootCharacteristics.doodleLocation;
    const locations = angles.map(a => new LocalLocation(rootLocation, a, 50));
    const nextParts = locations.map(n => new DoodleSegment(placeholder, n, []));
    return new DoodleRoot(rootCharacteristics, this.doodleGenome, nextParts);
  }

  log(): void {
    console.log(this);
  }

  getDoodleGenome() {
    return this.doodleGenome;
  }
}

export class DoodleRoot implements DrawableRoot {
  private rootCharacteristics: DoodleLocalSignal;
  private doodleGenome: IDoodleGenome;
  private children: DrawableDoodle[];
  constructor(
      rootCharacteristics: DoodleLocalSignal, doodleGenome: IDoodleGenome,
      children: DrawableDoodle[]) {
    this.rootCharacteristics = rootCharacteristics;
    this.doodleGenome = doodleGenome;
    this.children = children;
  }

  grow(): DrawableRoot {
    const newChildren =
        this.children.map(c => c.grow(this.rootCharacteristics));
    return new DoodleRoot(
        this.rootCharacteristics, this.doodleGenome, newChildren);
  }

  draw(drawingManager: IDrawingManager) {
    this.children.forEach(child => child.draw(drawingManager));
  }

  log() {
    console.log(this);
    this.children.forEach(child => child.log());
  }

  lightParts(): LineSegment[] {
    return this.children.map(c => c.lightParts())
        .reduce((acc, cur) => [...acc, ...cur], []);
  }
}

export class Seed implements DrawableRoot {
  private seedGenome: ISeedGenome;
  private rootCharacteristics: DoodleLocalSignal;

  constructor(seedGenome: ISeedGenome, rootCharacteristics: DoodleLocalSignal) {
    this.seedGenome = seedGenome;
    this.rootCharacteristics = rootCharacteristics;
  }

  grow(): DrawableRoot {
    console.log(this.rootCharacteristics);
    return this.seedGenome.grow(this.rootCharacteristics);
  }

  log(): void {
    console.log(this);
  }

  draw(drawingManager: IDrawingManager): void {}

  lightParts(): LineSegment[] {
    return [];
  }
}