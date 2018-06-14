import {IDrawingManager} from '../drawing/SimpleDrawingManager';

import {IDoodleGenome} from './DoodleGenome';
import {DoodleLocalSignal} from './DoodleLocalSignal';
import {LocalLocation, LocalPoint} from './DoodleLocation';
import {DrawableDoodle} from './DoodlePart';
import {PressedDoodle} from './PressedDoodle';
import {UndifferentiatedPart} from './UndifferentiatedPart';

export class DoodleSegment implements DrawableDoodle {
  private nextPart: DrawableDoodle;

  // Wire up
  private localPoint: LocalLocation;
  private localCharacteristics: DoodleLocalSignal;

  static bud(length: number, startingPoint: LocalPoint, genome: IDoodleGenome):
      DoodleSegment {
    return new DoodleSegment(
        new UndifferentiatedPart(genome),
        new LocalLocation(startingPoint, 0, length));
  }

  constructor(nextPart: DrawableDoodle, localPoint: LocalLocation) {
    this.nextPart = nextPart;
    this.localPoint = localPoint;
  }

  grow(doodleLocalSignal: DoodleLocalSignal): DrawableDoodle {
    const nextLocal =
        this.localPoint.scale(doodleLocalSignal.doodleLocation, 1.15);
    return new DoodleSegment(
        this.nextPart.grow(new DoodleLocalSignal(nextLocal, 0, 0)), nextLocal);
  }

  log(): void {
    console.log(this);
    this.nextPart.log();
  }

  draw(drawingManager: IDrawingManager): void {
    const lineSegment = this.localPoint.getParentOffset();
    drawingManager.drawLine(lineSegment.getP1(), lineSegment.getP2());
    this.nextPart.draw(drawingManager);
  }

  // Return more than just the segments? Feedback into the root, i.e. feedback
  // on the energy usage
  lightParts(): PressedDoodle[] {
    const lineSegment = this.localPoint.getParentOffset();
    const flattened = new PressedDoodle([lineSegment], 0);
    return [flattened, ...this.nextPart.lightParts()];
  }
}