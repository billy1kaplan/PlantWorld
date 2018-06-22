import {DoodleLocalSignal} from './DoodleLocalSignal';
import {RootPoint} from './DoodleLocation';
import {RootPart} from './RootDoodle';
import {ISeedGenome} from './SeedGenome';
import {Visitor} from './Visitor';

export class Seed implements RootPart {
  private seedGenome: ISeedGenome;
  private seedLocation: RootPoint;
  private energy: number;

  constructor(seedGenome: ISeedGenome,
              seedLocation: RootPoint,
              energy: number) {
    this.seedGenome = seedGenome;
    this.seedLocation = seedLocation;
    this.energy = this.energy;
  }

  grow(energy: number): RootPart {
    const localSignal =
      DoodleLocalSignal.rootSignal(this.seedLocation);
    return this.seedGenome.grow(localSignal);
  }

  visit<T>(visitor: Visitor<T>) { visitor.visitSeed(this); }
}