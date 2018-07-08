import {IDoodleGenome} from './DoodleGenome';
import {DoodleLocalSignal} from './DoodleLocalSignal';
import {IDoodlePart} from './IDoodlePart';
import {IVisitor} from './Visitor';

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
