import {DoodleLocalSignal} from '../DoodleLocalSignal';
import {IDoodlePart} from '../IDoodlePart';

export interface IDoodleGenome {
  differentiatePart: (localSignal: DoodleLocalSignal) => IDoodlePart;
}
