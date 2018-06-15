import {LineSegment} from '../elements/primitives/LineSegment';

import {IDoodleGenome} from './DoodleGenome';
import {DoodleLocalSignal} from './DoodleLocalSignal';
import {LocalLocation, LocalPoint} from './DoodleLocation';
import {DoodlePart} from './DoodlePart';
import {UndifferentiatedPart} from './UndifferentiatedPart';
import {Visitor} from './Visitor';

export class DoodleSegment implements DoodlePart {
  private nextPart: DoodlePart;

  // Wire up
  private localPoint: LocalLocation;
  private localCharacteristics: DoodleLocalSignal;

  static bud(length: number, startingPoint: LocalPoint, genome: IDoodleGenome):
      DoodleSegment {
    return new DoodleSegment(
        new UndifferentiatedPart(genome),
        new LocalLocation(startingPoint, 0, length));
  }

  constructor(nextPart: DoodlePart, localPoint: LocalLocation) {
    this.nextPart = nextPart;
    this.localPoint = localPoint;
  }

  grow(doodleLocalSignal: DoodleLocalSignal): DoodlePart {
    const nextLocal =
        this.localPoint.scale(doodleLocalSignal.doodleLocation, 1.15);
    return new DoodleSegment(
        this.nextPart.grow(new DoodleLocalSignal(nextLocal, 0, 0)), nextLocal);
  }

  visit<T>(visitor: Visitor<T>) {
    visitor.visitSegment(this);
    this.nextPart.visit(visitor);
  }

  getLineSegment(): LineSegment {
    return this.localPoint.getParentOffset();
  }
}