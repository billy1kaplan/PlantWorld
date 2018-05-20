import {IDrawingManager} from '../drawing/SimpleDrawingManager';

import {DoodleGenome} from './DoodleGenome';
import {IDoodleSegment} from './DoodleSegment';
import {SpokePart} from './SpokePart';


export interface DoodlePart {
  grow(): DoodlePart;
  print(): void;
  draw(drawingManager: IDrawingManager): void;
}