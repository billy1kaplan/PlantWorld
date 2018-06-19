import {DoodleLocalSignal} from './DoodleLocalSignal';
import {DoodlePart} from './DoodlePart';
import {Visitor} from './Visitor';

export class EnergyStorageDoodle implements DoodlePart {
  // I.e. capacity, discharge
  private localCharacteristics: DoodleLocalSignal;
  private storedEnergy: number;

  constructor(localCharacteristics: DoodleLocalSignal, storedEnergy: number) {
    this.localCharacteristics = localCharacteristics;
    this.storedEnergy = storedEnergy;
  }

  grow(doodleLocalSignal: DoodleLocalSignal): DoodlePart {
    return new EnergyStorageDoodle(
        this.localCharacteristics,
        this.storedEnergy + doodleLocalSignal.freeEnergy);
  }

  visit<T>(visitor: Visitor<T>) {
    visitor.visitEnergyStorage(this);
  }

  getStoredEnergy() {
    return this.storedEnergy;
  }
}