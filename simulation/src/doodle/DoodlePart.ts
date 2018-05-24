import {IDrawingManager} from '../drawing/SimpleDrawingManager';
import {LocalPoint} from './DoodleLocation';


export interface DoodlePart {
  grow(doodleLocation: LocalPoint): DrawableDoodle;
  print(): void;
}

export interface Drawable { draw(drawingManager: IDrawingManager): void; }

export type DrawableDoodle = DoodlePart&Drawable;