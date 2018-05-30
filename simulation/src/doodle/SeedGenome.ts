import {IDrawingManager} from '../drawing/SimpleDrawingManager';
import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';

import {Doodle} from './Doodle';
import {DoodleGenome, IDoodleGenome} from './DoodleGenome';
import {DoodleCharacteristics, DoodleLocalSignal} from './DoodleLocalSignal';
import {DoodleLocation, LocalLocation, RootPoint} from './DoodleLocation';
import {DoodlePart, Drawable, DrawableDoodle, Loggable} from './DoodlePart';
import {DoodleSegment, IDoodleSegment} from './DoodleSegment';
import {SpokePart} from './SpokePart';
import {UndifferentiatedPart} from './UndifferentiatedPart';

export interface ISeedGenome {
  grow(rootCharacteristics: DoodleLocalSignal): DrawableRoot;
  getDoodleGenome: () => IDoodleGenome;
}
export interface RootPart { grow(): DrawableRoot; }
export type DrawableRoot = RootPart&Drawable&Loggable;

export class SeedGenome implements ISeedGenome {
  private doodleGenome: IDoodleGenome;
  constructor(doodleGenome: IDoodleGenome) {
    this.doodleGenome = doodleGenome;
  }

  grow(rootCharacteristics: DoodleLocalSignal): DrawableRoot {
    console.log('HEREA;');
    console.log(rootCharacteristics);
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

  children(): DoodlePart[] {
    return [];
  }

  /*
  getDoodleGenome(): IDoodleGenome {
    return this.seedGenome.getDoodleGenome();
  }

  segments() {
    return [];
  }
  */

  draw(drawingManager: IDrawingManager): void {}
}