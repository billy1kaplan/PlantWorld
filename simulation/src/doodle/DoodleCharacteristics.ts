export class DoodleCharacteristics {
  public storedEnergy: number;
  public maintainenceCost: number;

  public constructor(storedEnergy: number, maintainenceCost: number) {
    this.storedEnergy = storedEnergy;
    this.maintainenceCost = maintainenceCost;
  }

  public feed(energy: number): DoodleCharacteristics {
    return new DoodleCharacteristics(this.storedEnergy + energy,
                                     this.maintainenceCost);
  }
}
