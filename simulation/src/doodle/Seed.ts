import {IDrawingManager} from '../drawing/SimpleDrawingManager';

import {DoodleLocalSignal} from './DoodleLocalSignal';
import {PressedDoodle} from './PressedDoodle';
import {DrawableRoot} from './RootDoodle';
import {ISeedGenome} from './SeedGenome';


export class Seed implements DrawableRoot {
  private seedGenome: ISeedGenome;
  private rootCharacteristics: DoodleLocalSignal;

  constructor(seedGenome: ISeedGenome, rootCharacteristics: DoodleLocalSignal) {
    this.seedGenome = seedGenome;
    this.rootCharacteristics = rootCharacteristics;
  }

  grow(): DrawableRoot {
    return this.seedGenome.grow(this.rootCharacteristics);
  }

  log(): void {
    console.log(this);
  }

  draw(drawingManager: IDrawingManager): void {}

  lightParts(): PressedDoodle[] {
    return [];
  }
}