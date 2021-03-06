import { LineSegment } from '../elements/LineSegment';
import { DoodleCharacteristics } from './DoodleCharacteristics';
import { DoodleLocalSignal } from './DoodleLocalSignal';
import { IVisitor } from './doodlevisitor/IVisitor';
import { IDoodleGenome } from './genomes/DoodleGenome';
import { IDoodlePart } from './IDoodlePart';
import { ILocalPoint } from './location/ILocalPoint';
import { LocalLocation } from './location/LocalLocation';
import { UndifferentiatedPart } from './UndifferentiatedPart';

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
