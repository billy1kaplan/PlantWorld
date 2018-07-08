import {IDrawingCanvas} from '../drawing/IDrawingCanvas';

export interface IDrawable {
  draw(drawingManager: IDrawingCanvas): void;
  erase(drawingManager: IDrawingCanvas): void;
}
