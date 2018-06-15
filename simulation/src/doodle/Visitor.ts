import {IDrawingManager} from '../drawing/SimpleDrawingManager';

import {DoodleSegment} from './DoodleSegment';
import {EnergyStorageDoodle} from './EnergyStorageDoodle';
import {DoodleRoot} from './RootDoodle';
import {Seed} from './Seed';
import {SpokePart} from './SpokePart';
import {UndifferentiatedPart} from './UndifferentiatedPart';

export interface Visitor<T> {
  visitSegment(value: DoodleSegment): T;
  vistSpoke(value: SpokePart): T;
  visitSeed(value: Seed): T;
  visitRoot(value: DoodleRoot): T;
  visitUndifferentiated(value: UndifferentiatedPart): T;
  visitEnergyStorage(value: EnergyStorageDoodle): T;
}

export class LoggingVisitor implements Visitor<void> {
  visitSegment(value: DoodleSegment): void {
    console.log(value);
  }
  vistSpoke(value: SpokePart): void {
    console.log(value);
  }
  visitSeed(value: Seed): void {
    console.log(value);
  }
  visitRoot(value: DoodleRoot): void {
    console.log(value);
  }
  visitUndifferentiated(value: UndifferentiatedPart): void {
    console.log(value);
  }
  visitEnergyStorage(value: EnergyStorageDoodle): void {
    console.log(value);
  }
}

export class DrawingVisitor implements Visitor<void> {
  private drawingManager: IDrawingManager;

  constructor(drawingManager: IDrawingManager) {
    this.drawingManager = drawingManager;
  }

  visitSegment(value: DoodleSegment): void {
    const lineSegment = value.getLineSegment();
    this.drawingManager.drawLine(lineSegment.getP1(), lineSegment.getP2());
  }

  vistSpoke(value: SpokePart): void {}
  visitSeed(value: Seed): void {}
  visitRoot(value: DoodleRoot): void {}
  visitUndifferentiated(value: UndifferentiatedPart): void {}
  visitEnergyStorage(value: EnergyStorageDoodle): void {}
}