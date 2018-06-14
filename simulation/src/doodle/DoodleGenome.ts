import {DoodleLocalSignal} from './DoodleLocalSignal';
import {DrawableDoodle} from './DoodlePart';
import {DoodleSegment} from './DoodleSegment';
import {SpokePart} from './SpokePart';

export interface IDoodleGenome {
  differentiatePart: (localSignal: DoodleLocalSignal) => DrawableDoodle;
}

export class DoodleGenome implements IDoodleGenome {
  differentiatePart: (localSignal: DoodleLocalSignal) => DrawableDoodle;
}

export class Sp implements IDoodleGenome {
  differentiatePart(localSignal: DoodleLocalSignal): DrawableDoodle {
    // New factor
    const location = localSignal.doodleLocation;
    const differentialFactor = 0;
    if (differentialFactor > 10) {
      return DoodleSegment.bud(5, location, this);
    } else if (differentialFactor < 10) {
      return SpokePart.bud(3, this, 10, 90);
    }
  }
}