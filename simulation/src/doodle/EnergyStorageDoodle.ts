import { DoodleLocalSignal, DoodleCharacteristics } from './DoodleLocalSignal';
import { DoodlePart } from './DoodlePart';
import { Visitor } from './Visitor';

export class EnergyStorageDoodle implements DoodlePart {
  // I.e. capacity, discharge
  private localCharacteristics: DoodleCharacteristics;
  private storageEfficiency: number;

  constructor(localCharacteristics: DoodleCharacteristics, storageEfficiency: number) {
    this.localCharacteristics = localCharacteristics;
    this.storageEfficiency = storageEfficiency;
  }

  grow(doodleLocalSignal: DoodleLocalSignal): DoodlePart {
    const nextCharacteristics = this.localCharacteristics.feed(
      doodleLocalSignal.freeEnergy * this.storageEfficiency);
    return new EnergyStorageDoodle(
      nextCharacteristics,
      this.storageEfficiency);
  }

  visit<T>(visitor: Visitor<T>) {
    visitor.visitEnergyStorage(this);
  }

  getStoredEnergy() {
    return this.localCharacteristics.storedEnergy;
  }
}