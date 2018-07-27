import {DoodleLocalSignal} from './DoodleLocalSignal';
import {IVisitor} from './doodlevisitor/IVisitor';
import {ISeedGenome} from './genomes/SeedGenome';
import {RootLocation} from './location/RootLocation';
import { IRootPart } from './IRootPart';

export class Seed implements IRootPart {
  private seedGenome: ISeedGenome;
  private seedLocation: RootLocation;
  private energy: number;

  public constructor(seedGenome: ISeedGenome,
                     seedLocation: RootLocation,
                     energy: number) {
    this.seedGenome = seedGenome;
    this.seedLocation = seedLocation;
    this.energy = this.energy;
  }

  public grow(energy: number): IRootPart {
    const localSignal =
      DoodleLocalSignal.rootSignal(this.seedLocation);
    return this.seedGenome.grow(localSignal);
  }

  public visit<T>(visitor: IVisitor<T>) { visitor.visitSeed(this); }
}
