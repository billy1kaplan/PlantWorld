import {DoodleLocalSignal} from './DoodleLocalSignal';
import {DoodlePart} from './DoodlePart';

export interface IDoodleGenome {
  differentiatePart: (localSignal: DoodleLocalSignal) => DoodlePart;
}

export class DoodleGenome implements IDoodleGenome {
  differentiatePart: (localSignal: DoodleLocalSignal) => DoodlePart;
}