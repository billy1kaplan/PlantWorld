import {DoodleSegment} from '../DoodleSegment';
import {EnergyStorageDoodle} from '../EnergyStorageDoodle';
import {DoodleRoot} from '../RootDoodle';
import {Seed} from '../Seed';
import {SpokePart} from '../SpokePart';
import {UndifferentiatedPart} from '../UndifferentiatedPart';

import {IVisitor} from './IVisitor';

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
