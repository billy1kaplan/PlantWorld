import { IDoodleGenome } from './DoodleGenome';
import { DoodleLocalSignal } from './DoodleLocalSignal';
import { DoodleSegment } from './DoodleSegment';
import { IDoodlePart } from './IDoodlePart';
import { SpokePart } from './SpokePart';

export class SimpleBranchingTree implements IDoodleGenome {
  public differentiatePart(localSignal: DoodleLocalSignal): IDoodlePart {
    const differentialFactor = localSignal.differentialFactor;
    if (differentialFactor > 0) {
      const location = localSignal.doodleLocation;
      const hops = localSignal.hopLength;
      const budLength = Math.sqrt(hops) * 30;
      return DoodleSegment.bud(budLength, location, this);
    } else if (differentialFactor <= 0) {
      return SpokePart.bud(6, this, 16, 360);
    }
  }
}
