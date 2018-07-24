import { LineSegment } from '../elements/primitives/LineSegment';
import { DoodleCharacteristics } from './DoodleCharacteristics';
import { IDoodleGenome } from './DoodleGenome';
import { DoodleLocalSignal } from './DoodleLocalSignal';
import { ILocalPoint, LocalLocation } from './DoodleLocation';
import { IDoodlePart } from './IDoodlePart';
import { UndifferentiatedPart } from './UndifferentiatedPart';
import { IVisitor } from './Visitor';

export class DoodleSegment implements IDoodlePart {
  public static bud(length: number,
                    startingPoint: ILocalPoint,
                    genome: IDoodleGenome): DoodleSegment {
    const segmentCharacteristics = new DoodleCharacteristics(0, 0);
    return new DoodleSegment(new UndifferentiatedPart(genome),
                             new LocalLocation(startingPoint, 0, length),
                             segmentCharacteristics);
  }

  private nextPart: IDoodlePart;
  private localPoint: LocalLocation;
  private localCharacteristics: DoodleCharacteristics;

  public constructor(nextPart: IDoodlePart,
                     localPoint: LocalLocation,
                     localCharacteristics: DoodleCharacteristics) {
    this.nextPart = nextPart;
    this.localPoint = localPoint;
    this.localCharacteristics = localCharacteristics;
  }

  public grow(doodleLocalSignal: DoodleLocalSignal): IDoodlePart {
    const growthFactor = doodleLocalSignal.growthFactor(this.localCharacteristics);
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

  public visit<T>(visitor: IVisitor<T>) {
    visitor.visitSegment(this);
    this.nextPart.visit(visitor);
  }

  public getLineSegment(): LineSegment { return this.localPoint.getParentOffset(); }
}
