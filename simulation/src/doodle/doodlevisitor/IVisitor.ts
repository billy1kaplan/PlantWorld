import {DoodleSegment} from '../DoodleSegment';
import {EnergyStorageDoodle} from '../EnergyStorageDoodle';
import {DoodleRoot} from '../RootDoodle';
import {Seed} from '../Seed';
import {SpokePart} from '../SpokePart';
import {UndifferentiatedPart} from '../UndifferentiatedPart';

/**
 * Visitor for the various parts of the doodle.
 */
export interface IVisitor<T> {
  visitSegment(value: DoodleSegment): void;
  visitSpoke(value: SpokePart): void;
  visitSeed(value: Seed): void;
  visitRoot(value: DoodleRoot): void;
  visitUndifferentiated(value: UndifferentiatedPart): void;
  visitEnergyStorage(value: EnergyStorageDoodle): void;
  done(): T;
}
