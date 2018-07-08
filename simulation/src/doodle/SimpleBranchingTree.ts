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
      return DoodleSegment.bud(50, location, this);
    } else if (differentialFactor <= 0) {
      return SpokePart.bud(3, this, 30, 180);
    }
  }
}
