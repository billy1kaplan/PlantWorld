import {DoodleSegment} from '../DoodleSegment';
import {EnergyStorageDoodle} from '../EnergyStorageDoodle';
import {DoodleRoot} from '../RootDoodle';
import {Seed} from '../Seed';
import {SpokePart} from '../SpokePart';
import {UndifferentiatedPart} from '../UndifferentiatedPart';

import {IVisitor} from './IVisitor';

export abstract class NoOpVisitorSkeleton<T> implements IVisitor<T> {
  public visitSegment(value: DoodleSegment) { return undefined; }
  public visitSpoke(value: SpokePart) { return undefined; }
  public visitSeed(value: Seed) { return undefined; }
  public visitRoot(value: DoodleRoot) { return undefined; }
  public visitUndifferentiated(value: UndifferentiatedPart) { return undefined; }
  public visitEnergyStorage(value: EnergyStorageDoodle) { return undefined; }
  public abstract done(): T;
}
