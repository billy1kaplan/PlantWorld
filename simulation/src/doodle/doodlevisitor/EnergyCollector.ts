import {LineSegment} from '../../elements/primitives/LineSegment';
import {LineSweeper} from '../../sweeper/LineSweepAlgo';
import {Sun} from '../../world/Sun';
import {DoodleSegment} from '../DoodleSegment';
import {EnergyStorageDoodle} from '../EnergyStorageDoodle';

import { NoOpVisitorSkeleton } from './NoOpVisitorSkeleton';

export class EnergyCollector extends NoOpVisitorSkeleton<number> {
  private sun: Sun;
  private segments: LineSegment[];
  private storedEnergy: number;
  public constructor(sun: Sun) {
    super();
    this.sun = sun;
    this.segments = [];
    this.storedEnergy = 0;
  }

  public visitSegment(value: DoodleSegment) {
    this.segments = [...this.segments, value.getLineSegment()];
  }

  public visitEnergyStorage(value: EnergyStorageDoodle) {
    this.storedEnergy += value.getStoredEnergy();
  }

  public done(): number {
    const exposedSegments = LineSweeper.sweepSegments(this.segments);
    const energyFromExposedSegements = exposedSegments.map((b) => this.sun.energyFunctionFromLineSegment(b.lineSegment))
        .reduce((a, b) => a + b, 0);
    return this.storedEnergy + energyFromExposedSegements;
  }
}
