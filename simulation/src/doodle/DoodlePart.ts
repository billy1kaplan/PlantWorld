import {DoodleLocalSignal} from './DoodleLocalSignal';
import {Visitor} from './Visitor';

export interface DoodlePart {
  grow(doodleLocalSignal: DoodleLocalSignal): DoodlePart;
  visit<T>(visitor: Visitor<T>): void;
}