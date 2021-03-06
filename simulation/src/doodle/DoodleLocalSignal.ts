import { DoodleCharacteristics } from './DoodleCharacteristics';
import { ILocalPoint } from './location/ILocalPoint';

export class DoodleLocalSignal {
  public static rootSignal(rootPoint: ILocalPoint) {
    return new DoodleLocalSignal(rootPoint, 0, 0, 0, 0);
  }

  public doodleLocation: ILocalPoint;
  public freeEnergy: number;
  public hopLength: number;
  public age: number;
  public differentialFactor: number;

  public constructor(doodleLocation: ILocalPoint,
                     freeEnergy: number,
                     hopLength: number,
                     age: number,
                     differentialFactor: number) {
    this.doodleLocation = doodleLocation;
    this.freeEnergy = freeEnergy;
    this.hopLength = hopLength;
    this.age = age;
    this.differentialFactor = differentialFactor;
  }

  public updateLocation(location: ILocalPoint): DoodleLocalSignal {
    return new DoodleLocalSignal(location,
                                 this.freeEnergy,
                                 this.hopLength,
                                 this.age,
                                 this.differentialFactor);
  }

  public feed(energy: number): DoodleLocalSignal {
    const newEnergy = this.freeEnergy + energy;
    return new DoodleLocalSignal(this.doodleLocation,
                                 newEnergy,
                                 this.hopLength,
                                 this.age,
                                 this.differentialFactor);
  }

  public hop(): DoodleLocalSignal {
    return new DoodleLocalSignal(this.doodleLocation,
                                 this.freeEnergy,
                                 this.hopLength + 1,
                                 this.age,
                                 this.differentialFactor);
  }

  public increaseAge(): DoodleLocalSignal {
    return new DoodleLocalSignal(this.doodleLocation,
                                 this.freeEnergy,
                                 this.hopLength,
                                 this.age + 1,
                                 this.differentialFactor);
  }

  public consume(doodleCharacteristics: DoodleCharacteristics): DoodleLocalSignal {
    return new DoodleLocalSignal(
      this.doodleLocation,
      Math.max(0.0, this.freeEnergy - doodleCharacteristics.maintainenceCost),
      this.hopLength,
      this.age,
      this.differentialFactor);
  }

  public growthFactor(doodleCharacteristics: DoodleCharacteristics): number {
    if (this.age > 10) {
      return 1.0;
    } else {
      return 1 + Math.min(0.1, Math.round(0.001 * this.freeEnergy / (this.age * this.age + 1)));
    }
  }

  public adjustFactor(transformer: (original: number) => number): DoodleLocalSignal {
    return new DoodleLocalSignal(this.doodleLocation,
                                 this.freeEnergy,
                                 this.hopLength,
                                 this.age,
                                 transformer(this.differentialFactor));
  }
}
