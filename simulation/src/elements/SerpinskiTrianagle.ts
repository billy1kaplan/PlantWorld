import { IDrawingCanvas } from '../drawing/IDrawingCanvas';
import { Triangle } from './EquilateralTriangle';
import { IDrawable } from './IDrawable';

export class SerpinskiTriangle implements IDrawable {
  private xStart: number;
  private yStart: number;
  private sideLength: number;
  public constructor(xStart, yStart, sideLength) {
    this.xStart = xStart;
    this.yStart = yStart;
    this.sideLength = sideLength;
  }

  public draw(drawingManager: IDrawingCanvas) {
    const min = 5;
    function generate(xStart: number, yStart: number, sideLength: number) {
      if (sideLength < min / 2) {
        return;
      }
      const nextSide = sideLength / 2;

      new Triangle(drawingManager, xStart, yStart, sideLength).draw();

      generate(xStart, yStart, sideLength / 2);
      generate(
        xStart + nextSide / 2, yStart - nextSide / 2,
        sideLength / 2);
      generate(xStart + nextSide, yStart, sideLength / 2);
    }

    generate(this.xStart, this.yStart, this.sideLength);
  }

  public erase(drawingManager: IDrawingCanvas) {
    throw new Error('Method not implemented.');
  }
}
