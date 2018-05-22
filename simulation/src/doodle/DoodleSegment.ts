import {Optional} from 'Optional';

import {IDrawingManager} from '../drawing/SimpleDrawingManager';
import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';
import {Sun} from '../world/Sun';

import {Doodle} from './Doodle';
import {DoodleLocation} from './DoodleLocation';
import {DoodlePart} from './DoodlePart';
import {SpokePart} from './SpokePart';


export interface IDoodleSegment {
  collectEnergy(sun: Sun): void;
  grow(doodleLocation: DoodleLocation): DoodlePart;
  getLine(): LineSegment;
}

export class DoodleSegment implements IDoodleSegment, DoodlePart {
  private width: number;
  private height: number;
  private visible: LineSegment[];
  private nextPart: DoodlePart;
  private doodleLocation: DoodleLocation;

  static of(
      nextPart: DoodlePart, width: number, height: number,
      doodleLocation: DoodleLocation) {
    return new DoodleSegment(nextPart, width, height, [], doodleLocation);
  }

  private constructor(
      nextPart: DoodlePart, width: number, height: number,
      visible: LineSegment[], doodleLocation: DoodleLocation) {
    this.nextPart = nextPart;
    this.width = width;
    this.height = height;
    this.visible = visible;
    this.doodleLocation = doodleLocation;
  }

  children() {
    return [this.nextPart];
  }

  update(visible: LineSegment[]) {
    this.visible = visible;
  }

  lineSegment(): LineSegment {
    return this.doodleLocation.convertToGlobalPosition(this.width, this.height);
  }

  intersect(other: DoodleSegment) {
    return this.lineSegment().intersection(other.lineSegment());
  }

  overlap(other: DoodleSegment): Optional<LineSegment> {
    return this.lineSegment().overlap(other.lineSegment());
  }

  collectEnergy(sun: Sun): void {
    const energy = this.visible.map(a => sun.energyFunctionFromLineSegment(a))
                       .reduce((a, b) => a + b, 0);
    console.log(energy);
  }

  getSegment() {
    return this.lineSegment;
  }

  grow(doodleLocation: DoodleLocation): DoodlePart {
    return new DoodleSegment(
        this.nextPart.grow(doodleLocation.shift(this.width, this.height)),
        this.width, this.height, [], this.doodleLocation);
  }

  print(): void {
    console.log(this);
    this.nextPart.print();
  }

  getLine() {
    return this.lineSegment();
  }

  segments() {
    return [this];
  }

  draw(drawingManager: IDrawingManager): void {
    drawingManager.drawLine(
        this.lineSegment().getP1(), this.lineSegment().getP2());
    this.nextPart.draw(drawingManager);
  }
}