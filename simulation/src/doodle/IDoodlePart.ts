import {DoodleLocalSignal} from './DoodleLocalSignal';
import {IVisitor} from './Visitor';

export interface IDoodlePart {
  grow(doodleLocalSignal: DoodleLocalSignal): IDoodlePart;
  visit<T>(visitor: IVisitor<T>): void;
}
