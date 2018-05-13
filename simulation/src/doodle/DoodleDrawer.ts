import {DrawingCanvas} from '../drawing/DrawingCanvas';
import {Drawable} from '../elements/Drawable';

class Doodle implements Drawable {
  draw(drawingManager: DrawingCanvas): void {
    throw new Error('Method not implemented.');
  }
  erase(drawingManager: DrawingCanvas): void {
    throw new Error('Method not implemented.');
  }
}