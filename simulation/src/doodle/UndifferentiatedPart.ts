import {IDoodleGenome} from './DoodleGenome';
import {DoodleLocalSignal} from './DoodleLocalSignal';
import {DoodlePart} from './DoodlePart';
import {Visitor} from './Visitor';

export class UndifferentiatedPart implements DoodlePart {
  private doodleGenome: IDoodleGenome;

  constructor(doodleGenome: IDoodleGenome) {
    this.doodleGenome = doodleGenome;
  }

  grow(doodleLocalSignal: DoodleLocalSignal): DoodlePart {
    return this.doodleGenome.differentiatePart(doodleLocalSignal);
  }

  visit<T>(visitor: Visitor<T>) {
    visitor.visitUndifferentiated(this);
  }
}