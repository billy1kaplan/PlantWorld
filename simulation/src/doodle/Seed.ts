import {DoodleLocalSignal} from './DoodleLocalSignal';
import {RootPart} from './RootDoodle';
import {ISeedGenome} from './SeedGenome';
import {Visitor} from './Visitor';


export class Seed implements RootPart {
  private seedGenome: ISeedGenome;
  private rootCharacteristics: DoodleLocalSignal;

  constructor(seedGenome: ISeedGenome, rootCharacteristics: DoodleLocalSignal) {
    this.seedGenome = seedGenome;
    this.rootCharacteristics = rootCharacteristics;
  }

  grow(energy: number): RootPart {
    const updatedRootCharacteristics = this.rootCharacteristics.feed(energy);
    return this.seedGenome.grow(updatedRootCharacteristics);
  }

  visit<T>(visitor: Visitor<T>) {
    visitor.visitSeed(this);
  }
}