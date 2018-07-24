import { IDrawingManager } from '../drawing/SimpleDrawingManager';
import { LineSegment } from '../elements/primitives/LineSegment';
import { LineSweeper } from '../sweeper/LineSweepAlgo';
import { Sun } from '../world/Sun';
import { DoodleSegment } from './DoodleSegment';
import { EnergyStorageDoodle } from './EnergyStorageDoodle';
import { DoodleRoot, IRootPart } from './RootDoodle';
import { Seed } from './Seed';
import { SpokePart } from './SpokePart';
import { UndifferentiatedPart } from './UndifferentiatedPart';

export interface IVisitor<T> {
  visitSegment(value: DoodleSegment): void;
  visitSpoke(value: SpokePart): void;
  visitSeed(value: Seed): void;
  visitRoot(value: DoodleRoot): void;
  visitUndifferentiated(value: UndifferentiatedPart): void;
  visitEnergyStorage(value: EnergyStorageDoodle): void;
  done(): T;
}

abstract class NoOpVisitor<T> implements IVisitor<T> {
  public visitSegment(value: DoodleSegment) { return undefined; }
  public visitSpoke(value: SpokePart) { return undefined; }
  public visitSeed(value: Seed) { return undefined; }
  public visitRoot(value: DoodleRoot) { return undefined; }
  public visitUndifferentiated(value: UndifferentiatedPart) { return undefined; }
  public visitEnergyStorage(value: EnergyStorageDoodle) { return undefined; }
  public abstract done(): T;
}

export class LoggingVisitor implements IVisitor<void> {
  public visitSegment(value: DoodleSegment) {
    console.log(value);
  }

  public visitSpoke(value: SpokePart) {
    console.log(value);
  }

  public visitSeed(value: Seed) {
    console.log(value);
  }

  public visitRoot(value: DoodleRoot) {
    console.log(value);
  }

  public visitUndifferentiated(value: UndifferentiatedPart) {
    console.log(value);
  }

  public visitEnergyStorage(value: EnergyStorageDoodle) {
    console.log(value);
  }

  public done() { return undefined; }
}

export class DrawingVisitor extends NoOpVisitor<void> {
  private drawingManager: IDrawingManager;

  public constructor(drawingManager: IDrawingManager) {
    super();
    this.drawingManager = drawingManager;
  }

  public visitSegment(value: DoodleSegment) {
    const lineSegment = value.getLineSegment();
    this.drawingManager.drawLine(lineSegment.getP1(), lineSegment.getP2());
  }

  public done() { return undefined; }
}

export interface ITaggedSegment {
  rootPart: IRootPart;
  lineSegment: LineSegment;
}

export class SegmentVisitor extends NoOpVisitor<ITaggedSegment[]> {
  private rootPart: IRootPart;
  private segments: ITaggedSegment[];

  constructor(rootPart: IRootPart) {
    super();
    this.rootPart = rootPart;
    this.segments = [];
  }

  public visitSegment(value: DoodleSegment) {
    const taggedSegment = {
      lineSegment: value.getLineSegment(),
      rootPart: this.rootPart,
    };
    this.segments = [taggedSegment, ...this.segments];
  }

  public done() {
    return this.segments;
  }
}

export class EnergyCollector implements IVisitor<number> {
  private sun: Sun;
  private energy: number;
  private segments: LineSegment[];
  public constructor(sun: Sun) {
    this.sun = sun;
    this.energy = 0;
    this.segments = [];
  }

  public visitSegment(value: DoodleSegment) {
    const energyFromSegment = this.sun.energyFunctionFromLineSegment(value.getLineSegment());
    this.segments = [...this.segments, value.getLineSegment()];
    this.energy += energyFromSegment;
  }

  public visitEnergyStorage(value: EnergyStorageDoodle) {
    this.energy += value.getStoredEnergy();
  }

  public visitSpoke(value: SpokePart) { return undefined; }
  public visitSeed(value: Seed) { return undefined; }
  public visitRoot(value: DoodleRoot) { return undefined; }
  public visitUndifferentiated(value: UndifferentiatedPart) { return undefined; }

  public done(): number {
    const sweeper = new LineSweeper();
    sweeper.addAll(this.segments);
    const bonus = sweeper.sweep();
    const bonusEnergy =
      bonus.map((b) => this.sun.energyFunctionFromLineSegment(b.lineSegment))
        .reduce((a, b) => a + b, 0);
    return this.energy;
  }
}
