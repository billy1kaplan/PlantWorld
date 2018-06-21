import {IDoodleGenome} from './DoodleGenome';
import {DoodleCharacteristics, DoodleLocalSignal} from './DoodleLocalSignal';
import {LocalLocation} from './DoodleLocation';
import {DoodleSegment} from './DoodleSegment';
import {DoodleRoot, RootPart} from './RootDoodle';

export interface ISeedGenome {
  grow(doodleLocalSignal: DoodleLocalSignal): RootPart;
  getDoodleGenome: () => IDoodleGenome;
}

export class SeedGenome implements ISeedGenome {
  private doodleGenome: IDoodleGenome;
  constructor(doodleGenome: IDoodleGenome) { this.doodleGenome = doodleGenome; }

  grow(doodleLocalSignal: DoodleLocalSignal): RootPart {
    const angles = [ 0 ];
    const rootLocation = doodleLocalSignal.doodleLocation;
    const locations = angles.map(a => new LocalLocation(rootLocation, a, 50));
    const characteristics =
      new DoodleCharacteristics(doodleLocalSignal.freeEnergy, 0, 0);
    const nextParts = locations.map(n => DoodleSegment.bud(10, rootLocation, this.doodleGenome));
    return new DoodleRoot(
      rootLocation, characteristics, 0, this.doodleGenome, nextParts);
  }

  getDoodleGenome() { return this.doodleGenome; }
}