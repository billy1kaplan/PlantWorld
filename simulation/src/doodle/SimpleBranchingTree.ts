import { IDoodleGenome } from './DoodleGenome';
import { DoodleLocalSignal } from './DoodleLocalSignal';
import { DoodlePart } from './DoodlePart';
import { DoodleSegment } from './DoodleSegment';
import { SpokePart } from './SpokePart';

export class SimpleBranchingTree implements IDoodleGenome {
  differentiatePart(localSignal: DoodleLocalSignal): DoodlePart {
    const differentialFactor = localSignal.differentialFactor;
    if (differentialFactor > 0) {
      const location = localSignal.doodleLocation;
      return DoodleSegment.bud(50, location, this);
    } else if (differentialFactor <= 0) {
      return SpokePart.bud(3, this, 30, 180);
    }
  }
}