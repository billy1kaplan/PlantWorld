import {IDoodleGenome} from './DoodleGenome';
import {DoodlePart} from './DoodlePart';
import {DoodleSegment} from './DoodleSegment';
import {SpokePart} from './SpokePart';

export class UndifferentiatedPart implements DoodlePart {
  private doodleGenome: IDoodleGenome;
  constructor(doodleGenome: IDoodleGenome) {
    this.doodleGenome = doodleGenome;
  }

  grow(): DoodlePart {
    const undifferentiatedPart = new UndifferentiatedPart(this.doodleGenome);
    const segment = DoodleSegment.of(undifferentiatedPart, null);
    return new SpokePart(this.doodleGenome, [segment, segment, segment]);
  }

  children() {
    return [];
  }

  print(): void {
    console.log(this);
  }

  segments() {
    return [];
  }
}