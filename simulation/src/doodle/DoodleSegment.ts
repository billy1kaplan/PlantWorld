import {LineSegment} from '../elements/primitives/LineSegment';

import {IDoodleGenome} from './DoodleGenome';
import {DoodleCharacteristics, DoodleLocalSignal} from './DoodleLocalSignal';
import {LocalLocation, LocalPoint} from './DoodleLocation';
import {DoodlePart} from './DoodlePart';
import {UndifferentiatedPart} from './UndifferentiatedPart';
import {Visitor} from './Visitor';

export class DoodleSegment implements DoodlePart {
  private nextPart: DoodlePart;
  private localPoint: LocalLocation;
  private localCharacteristics: DoodleCharacteristics;

  static bud(length: number,
             startingPoint: LocalPoint,
             genome: IDoodleGenome): DoodleSegment {
  const segmentCharacteristics = new DoodleCharacteristics(0, 0);
    return new DoodleSegment(new UndifferentiatedPart(genome),
                             new LocalLocation(startingPoint, 0, length),
                             segmentCharacteristics);
  }

  constructor(nextPart: DoodlePart,
              localPoint: LocalLocation,
              localCharacteristics: DoodleCharacteristics) {
    this.nextPart = nextPart;
    this.localPoint = localPoint;
    this.localCharacteristics = localCharacteristics;
  }

  grow(doodleLocalSignal: DoodleLocalSignal): DoodlePart {
    const growthFactor = doodleLocalSignal.growthFactor(this.localCharacteristics);
    console.log("Growth Factor", growthFactor);
    const nextLocal =
      this.localPoint.scale(doodleLocalSignal.doodleLocation, growthFactor);
    const nextSignal = doodleLocalSignal
      .adjustFactor((_) => -10)
      .updateLocation(nextLocal)
      .consume(this.localCharacteristics)
      .hop();
    const nextPart = this.nextPart.grow(nextSignal);

    return new DoodleSegment(
      nextPart,
      nextLocal,
      this.localCharacteristics);
  }

  visit<T>(visitor: Visitor<T>) {
    visitor.visitSegment(this);
    this.nextPart.visit(visitor);
  }

  getLineSegment(): LineSegment { return this.localPoint.getParentOffset(); }
}