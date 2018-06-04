import {Optional} from 'Optional';

import {IDrawingManager} from '../drawing/SimpleDrawingManager';
import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';
import {Sun} from '../world/Sun';

import {Doodle} from './Doodle';
import {DoodleLocalSignal} from './DoodleLocalSignal';
import {DoodleLocation, LocalLocation, LocalPoint} from './DoodleLocation';
import {DoodlePart, Drawable, DrawableDoodle} from './DoodlePart';
import {SpokePart} from './SpokePart';

export class DoodleSegment implements DrawableDoodle {
  private visible: LineSegment[];
  private nextPart: DrawableDoodle;
  private localPoint: LocalLocation;

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

  lightParts(): LineSegment[] {
    const lineSegment = this.localPoint.getParentOffset();
    return [lineSegment, ...this.nextPart.lightParts()];
  }
}