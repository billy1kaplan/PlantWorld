import {DoodleCharacteristics} from '../DoodleCharacteristics';
import {DoodleLocalSignal} from '../DoodleLocalSignal';
import {DoodleSegment} from '../DoodleSegment';
import {LocalLocation} from '../location/LocalLocation';
import {DoodleRoot, IRootPart} from '../RootDoodle';
import {IDoodleGenome} from './DoodleGenome';

export interface ISeedGenome {
  getDoodleGenome: () => IDoodleGenome;
  grow(doodleLocalSignal: DoodleLocalSignal): IRootPart;
}

export class SeedGenome implements ISeedGenome {
  private doodleGenome: IDoodleGenome;
  public constructor(doodleGenome: IDoodleGenome) { this.doodleGenome = doodleGenome; }

  public grow(doodleLocalSignal: DoodleLocalSignal): IRootPart {
    const angles = [ 0 ];
    const rootLocation = doodleLocalSignal.doodleLocation;
    const locations = angles.map((a) => new LocalLocation(rootLocation, a, 10));
    const characteristics =
      new DoodleCharacteristics(doodleLocalSignal.freeEnergy, 0);
    const nextParts = locations.map((n) => DoodleSegment.bud(5, rootLocation, this.doodleGenome));
    return new DoodleRoot(
      rootLocation, characteristics, 0, this.doodleGenome, nextParts);
  }

  public getDoodleGenome() { return this.doodleGenome; }
}
