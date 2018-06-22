import { LocalPoint } from './DoodleLocation';

export class DoodleCharacteristics {
  storedEnergy: number;
  maintainenceCost: number;

  constructor(storedEnergy: number, maintainenceCost: number) {
    this.storedEnergy = storedEnergy;
    this.maintainenceCost = maintainenceCost;
  }

  feed(energy: number): DoodleCharacteristics {
    return new DoodleCharacteristics(this.storedEnergy + energy,
                                     this.maintainenceCost);
  }
}

export class DoodleLocalSignal {
  doodleLocation: LocalPoint;
  freeEnergy: number;
  hopLength: number;
  age: number;
  differentialFactor: number;

  static rootSignal(rootPoint: LocalPoint) {
    return new DoodleLocalSignal(rootPoint, 0, 0, 0, 0);
  }

  constructor(doodleLocation: LocalPoint,
              freeEnergy: number,
              hopLength: number,
              age: number,
              differentialFactor: number) {
    this.doodleLocation = doodleLocation;
    this.freeEnergy = freeEnergy;
    this.hopLength = hopLength;
    this.age = age;
    this.differentialFactor = differentialFactor;
  };

  updateLocation(location: LocalPoint): DoodleLocalSignal {
    return new DoodleLocalSignal(location,
                                 this.freeEnergy,
                                 this.hopLength,
                                 this.age,
                                 this.differentialFactor);
  }

  feed(energy: number): DoodleLocalSignal {
    const newEnergy = this.freeEnergy + energy;
    return new DoodleLocalSignal(this.doodleLocation,
                                 newEnergy,
                                 this.hopLength,
                                 this.age,
                                 this.differentialFactor);
  }

  hop(): DoodleLocalSignal {
    return new DoodleLocalSignal(this.doodleLocation,
                                 this.freeEnergy,
                                 this.hopLength + 1,
                                 this.age,
                                 this.differentialFactor);
  }

  increaseAge(): DoodleLocalSignal {
    return new DoodleLocalSignal(this.doodleLocation,
                                 this.freeEnergy,
                                 this.hopLength,
                                 this.age + 1,
                                 this.differentialFactor);
  }

  consume(doodleCharacteristics: DoodleCharacteristics): DoodleLocalSignal {
    return new DoodleLocalSignal(
      this.doodleLocation,
      Math.max(0.0, this.freeEnergy - doodleCharacteristics.maintainenceCost),
      this.hopLength,
      this.age,
      this.differentialFactor);
  }

  growthFactor(doodleCharacteristics: DoodleCharacteristics): number {
    if (this.age > 10) {
      return 1.0;
    } else {
      const energyRequired = doodleCharacteristics.maintainenceCost
      //return Math.max(1.0, this.freeEnergy / energyRequired);
      return 1.15;
    }
  }

  adjustFactor(transformer: (original: number) => number): DoodleLocalSignal {
    return new DoodleLocalSignal(
      this.doodleLocation,
      this.freeEnergy,
      this.hopLength,
      this.age,
      transformer(this.differentialFactor));
  }
}