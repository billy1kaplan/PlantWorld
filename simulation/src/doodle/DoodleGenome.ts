import { DoodleLocalSignal } from './DoodleLocalSignal';
import { IDoodlePart } from './IDoodlePart';

export interface IDoodleGenome {
  differentiatePart: (localSignal: DoodleLocalSignal) => IDoodlePart;
}

export class DoodleGenome implements IDoodleGenome {
  public differentiatePart: (localSignal: DoodleLocalSignal) => IDoodlePart;
}
