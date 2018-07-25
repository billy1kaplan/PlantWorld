import {DoodleLocalSignal} from './DoodleLocalSignal';
import {IVisitor} from './doodlevisitor/IVisitor';
import {IDoodleGenome} from './genomes/DoodleGenome';
import {IDoodlePart} from './IDoodlePart';

export class UndifferentiatedPart implements IDoodlePart {
  private doodleGenome: IDoodleGenome;

  public constructor(doodleGenome: IDoodleGenome) {
    this.doodleGenome = doodleGenome;
  }

  public grow(doodleLocalSignal: DoodleLocalSignal): IDoodlePart {
    return this.doodleGenome.differentiatePart(doodleLocalSignal);
  }

  public visit<T>(visitor: IVisitor<T>) {
    visitor.visitUndifferentiated(this);
  }
}
