import {LineSegment} from '../../elements/primitives/LineSegment';
import {LineSweeper} from '../../sweeper/LineSweepAlgo';
import {Sun} from '../../world/Sun';
import {DoodleSegment} from '../DoodleSegment';
import {EnergyStorageDoodle} from '../EnergyStorageDoodle';
import {DoodleRoot} from '../RootDoodle';
import {Seed} from '../Seed';
import {SpokePart} from '../SpokePart';
import {UndifferentiatedPart} from '../UndifferentiatedPart';

import {IVisitor} from './IVisitor';

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
