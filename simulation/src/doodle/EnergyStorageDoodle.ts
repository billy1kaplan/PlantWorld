import { DoodleCharacteristics } from './DoodleCharacteristics';
import { DoodleLocalSignal } from './DoodleLocalSignal';
import { IVisitor } from './doodlevisitor/IVisitor';
import { IDoodlePart } from './IDoodlePart';

export class EnergyStorageDoodle implements IDoodlePart {
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
    return (1 - this.storageEfficiency) * this.localCharacteristics.storedEnergy;
  }
}
