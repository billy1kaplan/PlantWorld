import {DrawingCanvas} from '../drawing/DrawingCanvas';
import {Drawable} from './Drawable';
import {Point} from './primitives/Point';

export class Triangle implements Drawable {
  drawingManager: DrawingCanvas;
  x1: number;
  y1: number;
  sideLength: number;
  constructor(
      drawingManager: DrawingCanvas, x1: number, y1: number,
      sideLength: number) {
    this.drawingManager = drawingManager;
    this.x1 = x1;
    this.y1 = y1;
    this.sideLength = sideLength;
  }

  draw() {
    this.drawTriangle((p1, p2) => this.drawingManager.drawLine(p1, p2));
  }

  erase() {
    this.drawTriangle((p1, p2) => this.drawingManager.eraseLine(p1, p2));
  }

  private drawTriangle(action: (p1: Point, p2: Point) => void) {
    const midPoint = this.sideLength / 2;

    action(
        new Point(this.x1, this.y1),
        new Point(this.x1 + this.sideLength, this.y1));
    action(
        new Point(this.x1, this.y1),
        new Point(this.x1 + midPoint, this.y1 - midPoint));
    action(
        new Point(this.x1 + this.sideLength, this.y1),
        new Point(this.x1 + midPoint, this.y1 - midPoint));
  }
}