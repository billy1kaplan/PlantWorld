import 'p5';

import {Point} from '../elements/primitives/Point';

import {DrawingCanvas} from './DrawingCanvas';

export class PS5DrawingCanvas implements DrawingCanvas {
  p5: p5;
  constructor(p5: p5) {
    this.p5 = p5;
  }

  drawLine(p1: Point, p2: Point) {
    this.p5.stroke(0, 0, 0);
    this.p5.line(p1.getX(), p1.getY(), p2.getX(), p2.getY());
  }

  eraseLine(p1: Point, p2: Point) {
    this.p5.stroke(255, 255, 255);
    this.p5.line(p1.getX(), p1.getY(), p2.getX(), p2.getY());
  }
}