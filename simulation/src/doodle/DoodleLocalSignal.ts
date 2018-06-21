import { LocalPoint, RootPoint } from './DoodleLocation';

export class DoodleCharacteristics {
  storedEnergy: number;
  maintainenceCost: number;
  differentialFactor: number;

  constructor(storedEnergy: number, maintainenceCost: number, differentialFactor: number) {
    this.storedEnergy = storedEnergy;
    this.maintainenceCost = maintainenceCost;
    this.differentialFactor = differentialFactor;
  }

  feed(energy: number): DoodleCharacteristics {
    return new DoodleCharacteristics(this.storedEnergy + energy, this.maintainenceCost, this.differentialFactor);
  }
}

export class DoodleLocalSignal {
  doodleLocation: LocalPoint;
  freeEnergy: number;
  hopLength: number;
  age: number;

  static rootSignal(rootPoint: RootPoint) {
    return new DoodleLocalSignal(rootPoint, 0, 0, 0);
  }

  constructor(doodleLocation: LocalPoint,
    freeEnergy: number,
    hopLength: number,
    age: number) {
    this.doodleLocation = doodleLocation;
    this.freeEnergy = freeEnergy;
    this.hopLength = hopLength;
    this.age = age;
  };

  updateLocation(location: LocalPoint): DoodleLocalSignal {
    return new DoodleLocalSignal(
      location, this.freeEnergy, this.hopLength, this.age);
  }

  feed(energy: number): DoodleLocalSignal {
    const newEnergy = this.freeEnergy + energy;
    return new DoodleLocalSignal(
      this.doodleLocation, newEnergy, this.hopLength, this.age);
  }

  hop(): DoodleLocalSignal {
    return new DoodleLocalSignal(
      this.doodleLocation,
      this.freeEnergy,
      this.hopLength + 1,
      this.age);
  }

  increaseAge(): DoodleLocalSignal {
    return new DoodleLocalSignal(
      this.doodleLocation, this.freeEnergy, this.hopLength, this.age + 1);
  }

  consume(doodleCharacteristics: DoodleCharacteristics): DoodleLocalSignal {
    return new DoodleLocalSignal(
      this.doodleLocation, Math.max(0.0, this.freeEnergy - doodleCharacteristics.maintainenceCost), this.hopLength, this.age);
  }

  growthFactor(doodleCharacteristics: DoodleCharacteristics): number {
    if (this.age > 10) {
      return 1.0;
    } else {
      const energyRequired = doodleCharacteristics.maintainenceCost
      return Math.min(0.0, this.freeEnergy / energyRequired);
    }
  }
}