import {DoodleLocation, LocalPoint, RootPoint} from './DoodleLocation';

// (Local Characteristics =>  Genome => NextPart)
// Growth function: (???) => Doodle
// ??? = Characteristics

// Contstraints:
// Light; "Material"

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

export class DoodleCharacteristics {}

export class DoodleLocalSignal {
  static rootSignal(rootPoint: RootPoint) {
    return new DoodleLocalSignal(rootPoint, 0, 0);
  }
  constructor(
      public doodleLocation: LocalPoint, public hopLength: number,
      public freeEnergy: number) {};
}