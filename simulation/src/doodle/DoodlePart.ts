import {IDrawingManager} from '../drawing/SimpleDrawingManager';

import {DoodleLocalSignal} from './DoodleLocalSignal';
import {PressedDoodle} from './PressedDoodle';

export interface DoodlePart {
  grow(doodleLocalSignal: DoodleLocalSignal): DrawableDoodle;
  lightParts(): PressedDoodle[];
}

export interface Drawable { draw(drawingManager: IDrawingManager): void; }

export interface Loggable { log(): void }

export type DrawableDoodle = DoodlePart&Drawable&Loggable;