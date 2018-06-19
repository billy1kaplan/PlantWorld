import {IDrawingManager} from '../drawing/SimpleDrawingManager';
import {LineSegment} from '../elements/primitives/LineSegment';

import {DoodleSegment} from './DoodleSegment';
import {EnergyStorageDoodle} from './EnergyStorageDoodle';
import {DoodleRoot, RootPart} from './RootDoodle';
import {Seed} from './Seed';
import {SpokePart} from './SpokePart';
import {UndifferentiatedPart} from './UndifferentiatedPart';
import { Sun } from '../world/Sun';

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

export interface TaggedSegment {
  rootPart: RootPart;
  lineSegment: LineSegment;
}

export class SegmentVisitor extends SegmentsOnly<TaggedSegment[]> {
  private rootPart: RootPart;
  private segments: TaggedSegment[];

  constructor(rootPart: RootPart) {
    super();
    this.rootPart = rootPart;
    this.segments = [];
  }

  visitSegment(value: DoodleSegment) {
    const taggedSegment = {
      rootPart: this.rootPart,
      lineSegment: value.getLineSegment()
    };
    this.segments = [taggedSegment, ...this.segments];
  }

  done() {
    return this.segments;
  }
}

export class EnergyCollector implements Visitor<number> {
  private sun: Sun;
  private energy: number;
  constructor(sun: Sun) {
    this.sun = sun;
    this.energy = 0;
  }

  visitSegment(value: DoodleSegment) {
    const energyFromSegment = this.sun.energyFunctionFromLineSegment(value.getLineSegment())
    this.energy += energyFromSegment;
  }

  visitEnergyStorage(value: EnergyStorageDoodle) {
    this.energy += value.getStoredEnergy();
  }

  vistSpoke(value: SpokePart) {}
  visitSeed(value: Seed) {}
  visitRoot(value: DoodleRoot) {}
  visitUndifferentiated(value: UndifferentiatedPart) {}

  done(): number {
    return this.energy;
  }
}
