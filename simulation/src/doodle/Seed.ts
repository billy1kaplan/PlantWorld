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

  grow(updateRootCharacteristics): RootPart {
    const updated = updateRootCharacteristics(this.rootCharacteristics);
    return this.seedGenome.grow(updated);
  }

  visit<T>(visitor: Visitor<T>) {
    visitor.visitSeed(this);
  }
}