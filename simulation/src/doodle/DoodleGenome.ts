import {DoodlePart} from './DoodlePart';
import {IDoodleSegment} from './DoodleSegment';

export interface IDoodleGenome {
  differentiatePart: (part: DoodlePart) => DoodlePart;
}

export class DoodleGenome implements IDoodleGenome {
  differentiatePart: (part: DoodlePart) => DoodlePart;
}