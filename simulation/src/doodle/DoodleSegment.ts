import {Optional} from 'Optional';

import {IDrawingManager} from '../drawing/SimpleDrawingManager';
import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';
import {Sun} from '../world/Sun';

import {Doodle} from './Doodle';
import {DoodleLocation, LocalPoint} from './DoodleLocation';
import {DoodlePart, Drawable, DrawableDoodle} from './DoodlePart';
import {SpokePart} from './SpokePart';


export interface IDoodleSegment {
  collectEnergy(sun: Sun): void;
  grow(doodleLocation: DoodleLocation): DoodlePart;
  getLine(): LineSegment;
}

export class DoodleSegment implements DrawableDoodle {
  private visible: LineSegment[];
  private nextPart: DrawableDoodle;
  private localPoint: LocalPoint;

  constructor(
      nextPart: DrawableDoodle, localPoint: LocalPoint,
      visible: LineSegment[]) {
    this.nextPart = nextPart;
    this.localPoint = localPoint;
    this.visible = visible;
  }

  children() {
    return [this.nextPart];
  }

  update(visible: LineSegment[]) {
    this.visible = visible;
  }

  /*
  lineSegment(): LineSegment {
    return this.doodleLocation.convertToGlobalPosition(this.width, this.height);
  }

  intersect(other: DoodleSegment) {
    return this.lineSegment().intersection(other.lineSegment());
  }

  overlap(other: DoodleSegment): Optional<LineSegment> {
    return this.lineSegment().overlap(other.lineSegment());
  }

  getSegment() {
    return this.lineSegment;
  }

  getLine() {
    return this.lineSegment();
  }
  */

  collectEnergy(sun: Sun): void {
    const energy = this.visible.map(a => sun.energyFunctionFromLineSegment(a))
                       .reduce((a, b) => a + b, 0);
    console.log(energy);
  }

  grow(localPoint: LocalPoint): DrawableDoodle {
    return new DoodleSegment(
        this.nextPart.grow(this.localPoint), this.localPoint, []);
  }

  print(): void {
    console.log(this);
    this.nextPart.print();
  }

  draw(drawingManager: IDrawingManager): void {
    const lineSegment = this.localPoint.getParentOffset();
    drawingManager.drawLine(lineSegment.getP1(), lineSegment.getP2());
    this.nextPart.draw(drawingManager);
  }
}