import { LocalPoint, RootPoint } from './DoodleLocation';

// (Local Characteristics =>  Genome => NextPart)
// Growth function: (???) => Doodle
// ??? = Characteristics

// Contstraints:
// Light; "Material"

/*
interface Characteristics {
  growthFactor: number;
  storedEnergy: number;
  storedMaterial: number;
  hopLength: number;
  growthCycles: number;
}

interface GenomeCharacteristics {
  taper: number;
  age: number;
  angularity: number;
}
*/

export class DoodleCharacteristics { }

export class DoodleLocalSignal {
  doodleLocation: LocalPoint;
  hopLength: number;
  freeEnergy: number;

  static rootSignal(rootPoint: RootPoint) {
    return new DoodleLocalSignal(rootPoint, 0, 0);
  }

  constructor(doodleLocation: LocalPoint, hopLength: number, freeEnergy: number) {
    this.doodleLocation = doodleLocation;
    this.hopLength = hopLength;
    this.freeEnergy = freeEnergy;
  };

  feed(energy: number): DoodleLocalSignal {
    const energyLevel = this.freeEnergy + energy;
    return new DoodleLocalSignal(this.doodleLocation, this.hopLength, energyLevel);
  }
}