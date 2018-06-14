import {LocalPoint, RootPoint} from './DoodleLocation';

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
  doodleLocation: LocalPoint;
  hopLength: number;
  freeEnergy: number;

  static rootSignal(rootPoint: RootPoint) {
    console.log('CONS');
    console.log(rootPoint);
    return new DoodleLocalSignal(rootPoint, 0, 0);
  }

  constructor(
      doodleLocation: LocalPoint, hopLength: number, freeEnergy: number) {
    this.doodleLocation = doodleLocation;
    this.hopLength = hopLength;
    this.freeEnergy = freeEnergy;
  };
}