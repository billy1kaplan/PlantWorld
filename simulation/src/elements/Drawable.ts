import {DrawingCanvas} from '../drawing/DrawingCanvas';

export interface Drawable {
  draw(drawingManager: DrawingCanvas): void;
  erase(drawingManager: DrawingCanvas): void;
}