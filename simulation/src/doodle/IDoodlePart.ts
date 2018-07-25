import {DoodleLocalSignal} from './DoodleLocalSignal';
import { IVisitor } from './doodlevisitor/IVisitor';

export interface IDoodlePart {
  grow(doodleLocalSignal: DoodleLocalSignal): IDoodlePart;
  visit<T>(visitor: IVisitor<T>): void;
}
