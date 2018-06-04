import {DoodlePart} from './DoodlePart';

export interface IDoodleGenome {
  differentiatePart: (part: DoodlePart) => DoodlePart;
}

export class DoodleGenome implements IDoodleGenome {
  differentiatePart: (part: DoodlePart) => DoodlePart;
}