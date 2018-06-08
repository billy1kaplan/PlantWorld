import {IDrawingManager} from '../drawing/SimpleDrawingManager';
import {LineSegment} from '../elements/primitives/LineSegment';
import {Sun} from '../world/Sun';

import {DoodleLocalSignal} from './DoodleLocalSignal';
import {LocalLocation} from './DoodleLocation';
import {DrawableDoodle} from './DoodlePart';
import {PressedDoodle} from './PressedDoodle';

export class DoodleSegment implements DrawableDoodle {
  private visible: LineSegment[];
  private nextPart: DrawableDoodle;

  // Wire up
  private localPoint: LocalLocation;
  private localCharacteristics: DoodleLocalSignal;


  constructor(
      nextPart: DrawableDoodle, localPoint: LocalLocation,
      visible: LineSegment[]) {
    this.nextPart = nextPart;
    this.localPoint = localPoint;
    this.visible = visible;
  }

  update(visible: LineSegment[]) {
    this.visible = visible;
  }

  collectEnergy(sun: Sun): void {
    const energy = this.visible.map(a => sun.energyFunctionFromLineSegment(a))
                       .reduce((a, b) => a + b, 0);
    console.log(energy);
  }

  grow(doodleLocalSignal: DoodleLocalSignal): DrawableDoodle {
    const nextLocal =
        this.localPoint.scale(doodleLocalSignal.doodleLocation, 1.15);
    return new DoodleSegment(
        this.nextPart.grow(new DoodleLocalSignal(nextLocal, 0, 0)), nextLocal,
        []);
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
    const flattened =
        new PressedDoodle([lineSegment], this.localCharacteristics.freeEnergy);
    return [flattened, ...this.nextPart.lightParts()];
  }
}