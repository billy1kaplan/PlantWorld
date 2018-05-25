import {IDrawingManager} from '../drawing/SimpleDrawingManager';
import {LocalPoint} from './DoodleLocation';


export interface DoodlePart {
  grow(doodleLocation: LocalPoint): DrawableDoodle;
}

export interface Drawable { draw(drawingManager: IDrawingManager): void; }

export interface Loggable { log(): void }

export type DrawableDoodle = DoodlePart&Drawable&Loggable;