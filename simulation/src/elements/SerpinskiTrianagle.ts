import {DrawingCanvas} from '../drawing/DrawingCanvas';

import {Drawable} from './Drawable';
import {Triangle} from './EquilateralTriangle';

export class SerpinskiTriangle implements Drawable {
  x_start: number;
  y_start: number;
  sideLength: number;
  constructor(x_start, y_start, sideLength) {
    this.x_start = x_start;
    this.y_start = y_start;
    this.sideLength = sideLength;
  }

  draw(drawingManager: DrawingCanvas) {
    const min = 5;
    function generate(
        drawingManager: DrawingCanvas, x_start: number, y_start: number,
        sideLength: number) {
      if (sideLength < min / 2) {
        return;
      }
      const next_side = sideLength / 2;

      new Triangle(drawingManager, x_start, y_start, sideLength).draw();

      generate(drawingManager, x_start, y_start, sideLength / 2);
      generate(
          drawingManager, x_start + next_side / 2, y_start - next_side / 2,
          sideLength / 2);
      generate(drawingManager, x_start + next_side, y_start, sideLength / 2);
    };

    generate(drawingManager, this.x_start, this.y_start, this.sideLength);
  }

  erase(drawingManager: DrawingCanvas) {
    throw new Error('Method not implemented.');
  }
}