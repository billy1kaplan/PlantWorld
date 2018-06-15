import {IDoodleGenome} from './DoodleGenome';
import {DoodleLocalSignal} from './DoodleLocalSignal';
import {LocalLocation} from './DoodleLocation';
import {DoodleSegment} from './DoodleSegment';
import {DoodleRoot, RootPart} from './RootDoodle';
import {UndifferentiatedPart} from './UndifferentiatedPart';

export interface ISeedGenome {
  grow(rootCharacteristics: DoodleLocalSignal): RootPart;
  getDoodleGenome: () => IDoodleGenome;
}

export class SeedGenome implements ISeedGenome {
  private doodleGenome: IDoodleGenome;
  constructor(doodleGenome: IDoodleGenome) {
    this.doodleGenome = doodleGenome;
  }

  grow(rootCharacteristics: DoodleLocalSignal): RootPart {
    const placeholder = new UndifferentiatedPart(this.doodleGenome);
    const angles = [0];
    const rootLocation = rootCharacteristics.doodleLocation;
    const locations = angles.map(a => new LocalLocation(rootLocation, a, 50));
    const nextParts = locations.map(n => new DoodleSegment(placeholder, n));
    return new DoodleRoot(rootCharacteristics, this.doodleGenome, nextParts);
  }

  getDoodleGenome() {
    return this.doodleGenome;
  }
}