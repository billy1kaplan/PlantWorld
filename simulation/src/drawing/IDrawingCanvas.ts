import {Point} from '../elements/primitives/Point';

export interface IDrawingCanvas {
  drawLine(p1: Point, p2: Point);
  eraseLine(p1: Point, p2: Point);
}
