import { DoodleCharacteristics } from './DoodleCharacteristics';
import { DoodleLocalSignal } from './DoodleLocalSignal';
import { IDoodlePart } from './IDoodlePart';
import { IVisitor } from './Visitor';

export class EnergyStorageDoodle implements IDoodlePart {
  // I.e. capacity, discharge
  private localCharacteristics: DoodleCharacteristics;
  private storageEfficiency: number;

  public constructor(localCharacteristics: DoodleCharacteristics, storageEfficiency: number) {
    this.localCharacteristics = localCharacteristics;
    this.storageEfficiency = storageEfficiency;
  }

  public grow(doodleLocalSignal: DoodleLocalSignal): IDoodlePart {
    const nextCharacteristics = this.localCharacteristics.feed(
      doodleLocalSignal.freeEnergy * this.storageEfficiency);
    return new EnergyStorageDoodle(
      nextCharacteristics,
      this.storageEfficiency);
  }

  public visit<T>(visitor: IVisitor<T>) {
    visitor.visitEnergyStorage(this);
  }

  public getStoredEnergy() {
    return this.localCharacteristics.storedEnergy;
  }
}
