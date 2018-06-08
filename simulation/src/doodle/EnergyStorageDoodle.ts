import {IDrawingManager} from '../drawing/SimpleDrawingManager';

import {DoodleLocalSignal} from './DoodleLocalSignal';
import {DrawableDoodle} from './DoodlePart';
import {PressedDoodle} from './PressedDoodle';

export class EnergyStorageDoodle implements DrawableDoodle {
  // I.e. capacity, discharge
  private localCharacteristics: DoodleLocalSignal;
  private storedEnergy: number;

  constructor(localCharacteristics: DoodleLocalSignal, storedEnergy: number) {
    this.localCharacteristics = localCharacteristics;
    this.storedEnergy = storedEnergy;
  }

  grow(doodleLocalSignal: DoodleLocalSignal): DrawableDoodle {
    return new EnergyStorageDoodle(
        this.localCharacteristics,
        this.storedEnergy + doodleLocalSignal.freeEnergy);
  }

  log(): void {
    console.log(this);
  }

  draw(drawingManager: IDrawingManager): void {}

  // Return more than just the segments? Feedback into the root, i.e. feedback
  // on the energy usage
  lightParts(): PressedDoodle[] {
    const flattened = new PressedDoodle([], this.storedEnergy);
    return [flattened];
  }
}