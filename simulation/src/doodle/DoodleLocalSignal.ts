import { LocalPoint, RootPoint } from './DoodleLocation';

export class DoodleLocalSignal {
  doodleLocation: LocalPoint;
  hopLength: number;
  freeEnergy: number;
  age: number;

  static rootSignal(rootPoint: RootPoint) {
    return new DoodleLocalSignal(rootPoint, 0, 0, 0);
  }

  constructor(doodleLocation: LocalPoint,
              hopLength: number,
              freeEnergy: number,
              age: number) {
    this.doodleLocation = doodleLocation;
    this.hopLength = hopLength;
    this.freeEnergy = freeEnergy;
    this.age = age;
  };

  updateLocation(location: LocalPoint) {
    return new DoodleLocalSignal(
      location, this.hopLength + 1, this.freeEnergy, this.age);
  }

  feed(energy: number): DoodleLocalSignal {
    const energyLevel = this.freeEnergy + energy;
    return new DoodleLocalSignal(
      this.doodleLocation, this.hopLength, energyLevel, this.age + 1);
  }
}