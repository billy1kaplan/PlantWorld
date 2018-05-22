import {IDrawingManager} from '../drawing/SimpleDrawingManager';
import {DoodleLocation} from './DoodleLocation';


export interface DoodlePart {
  grow(doodleLocation: DoodleLocation): DoodlePart;
  print(): void;
  draw(drawingManager: IDrawingManager): void;
}