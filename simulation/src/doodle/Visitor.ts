import {IDrawingManager} from '../drawing/SimpleDrawingManager';
import {LineSegment} from '../elements/primitives/LineSegment';

import {DoodleSegment} from './DoodleSegment';
import {EnergyStorageDoodle} from './EnergyStorageDoodle';
import {DoodleRoot} from './RootDoodle';
import {Seed} from './Seed';
import {SpokePart} from './SpokePart';
import {UndifferentiatedPart} from './UndifferentiatedPart';

export interface Visitor<T> {
  visitSegment(value: DoodleSegment): void;
  vistSpoke(value: SpokePart): void;
  visitSeed(value: Seed): void;
  visitRoot(value: DoodleRoot): void;
  visitUndifferentiated(value: UndifferentiatedPart): void;
  visitEnergyStorage(value: EnergyStorageDoodle): void;
  done(): T;
}

abstract class SegmentsOnly<T> implements Visitor<T> {
  abstract visitSegment(value: DoodleSegment);
  vistSpoke(value: SpokePart) {}
  visitSeed(value: Seed) {}
  visitRoot(value: DoodleRoot) {}
  visitUndifferentiated(value: UndifferentiatedPart) {}
  visitEnergyStorage(value: EnergyStorageDoodle) {}
  abstract done(): T;
}

export class LoggingVisitor implements Visitor<void> {
  visitSegment(value: DoodleSegment) {
    console.log(value);
  }
  vistSpoke(value: SpokePart) {
    console.log(value);
  }
  visitSeed(value: Seed) {
    console.log(value);
  }
  visitRoot(value: DoodleRoot) {
    console.log(value);
  }
  visitUndifferentiated(value: UndifferentiatedPart) {
    console.log(value);
  }
  visitEnergyStorage(value: EnergyStorageDoodle) {
    console.log(value);
  }

  done() {}
}

export class DrawingVisitor extends SegmentsOnly<void> {
  private drawingManager: IDrawingManager;

  constructor(drawingManager: IDrawingManager) {
    super();
    this.drawingManager = drawingManager;
  }

  visitSegment(value: DoodleSegment) {
    const lineSegment = value.getLineSegment();
    this.drawingManager.drawLine(lineSegment.getP1(), lineSegment.getP2());
  }

  done() {}
}

export class SegmentVisitor extends SegmentsOnly<LineSegment[]> {
  segments: LineSegment[];

  constructor() {
    super();
    this.segments = [];
  }

  visitSegment(value: DoodleSegment) {
    this.segments = [value.getLineSegment(), ...this.segments];
  }

  done() {
    return this.segments;
  }
}