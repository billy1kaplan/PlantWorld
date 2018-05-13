import {DrawingCanvas} from '../drawing/DrawingCanvas';
import {Drawable} from '../elements/Drawable';
import {Point} from '../elements/primitives/Point';

export class NoiseGenerator implements Drawable {
  width: number;
  height: number;
  history: number[];
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.history = [];
  }

  draw(drawingManager: DrawingCanvas): void {
    for (var i = 0; i < this.width; i++) {
      for (var j = 0; j < this.height; j++) {
        if (this.weighting(i, j) > Math.random()) {
          drawingManager.drawLine(new Point(i, j), new Point(i, j));
        }
      }
    }
  }

  weighting(x: number, y: number) {
    function computeWeight(value: number, center: number) {
      const diff = (value - center + 1);
      return 1 / (diff * diff);
    }
    const centerX = computeWeight(x, this.width);
    const centerY = computeWeight(y, this.height);

    const averageWeight = (centerX + centerY / 2);
    return averageWeight;
  }

  erase(drawingManager: DrawingCanvas): void {}
}