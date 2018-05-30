import {IDrawingManager} from '../drawing/SimpleDrawingManager';

import {DoodleLocalSignal} from './DoodleLocalSignal';
import {LocalPoint} from './DoodleLocation';


export interface DoodlePart {
  grow(doodleLocalSignal: DoodleLocalSignal): DrawableDoodle;
}

export interface Drawable { draw(drawingManager: IDrawingManager): void; }

export interface Loggable { log(): void }

export type DrawableDoodle = DoodlePart&Drawable&Loggable;