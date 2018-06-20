import { IDoodleGenome } from './DoodleGenome';
import { DoodleLocalSignal } from './DoodleLocalSignal';
import { DoodlePart } from './DoodlePart';
import { DoodleSegment } from './DoodleSegment';
import { SpokePart } from './SpokePart';

export class SimpleBranchingTree implements IDoodleGenome {
  differentiatePart(localSignal: DoodleLocalSignal): DoodlePart {
    // New factor
    const differentialFactor = 0;
    if (differentialFactor > 10) {
      const location = localSignal.doodleLocation;
      return DoodleSegment.bud(5, location, this);
    } else if (differentialFactor < 10) {
      return SpokePart.bud(3, this, 10, 90);
    }
  }
}