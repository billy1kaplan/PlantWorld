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
    /*
    const placeholder = new UndifferentiatedPart(this.doodleGenome);
    const angles = [-20, 20];
    const locations = angles.map(
        a => new LocalLocation(doodleLocalSignal.doodleLocation, a, 20));
    const nextParts = locations.map(n => new DoodleSegment(placeholder, n));
    return new SpokePart(this.doodleGenome, nextParts, 10, 10);
    */
    return this.doodleGenome.differentiatePart(doodleLocalSignal);
  }

  visit<T>(visitor: Visitor<T>) {
    visitor.visitUndifferentiated(this);
  }
}