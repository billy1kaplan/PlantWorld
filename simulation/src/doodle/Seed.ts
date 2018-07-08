import {DoodleLocalSignal} from './DoodleLocalSignal';
import {RootPoint} from './DoodleLocation';
import {IRootPart} from './RootDoodle';
import {ISeedGenome} from './SeedGenome';
import {IVisitor} from './Visitor';

export class Seed implements IRootPart {
  private seedGenome: ISeedGenome;
  private seedLocation: RootPoint;
  private energy: number;

  public constructor(seedGenome: ISeedGenome,
                     seedLocation: RootPoint,
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
