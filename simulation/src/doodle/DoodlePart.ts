import {DoodleGenome} from './DoodleGenome';
import {IDoodleSegment} from './DoodleSegment';
import {SpokePart} from './SpokePart';


export interface DoodlePart {
  grow(): DoodlePart;
  children(): DoodlePart[];
  segments(): IDoodleSegment[];
  print(): void;
}