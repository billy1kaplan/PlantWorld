import {DoodleGenome} from './DoodleGenome';
import {SpokePart} from './SpokePart';

export interface DoodlePart {
  grow(): DoodlePart;
  children(): DoodlePart[];
  print(): void;
}