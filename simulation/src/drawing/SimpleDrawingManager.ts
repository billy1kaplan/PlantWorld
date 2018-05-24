import {Point} from '../elements/primitives/Point';

export interface IDrawingManager {
  drawLine(p1: Point, p2: Point): void;
  drawBlankScreen(): void;
  clearCanvas(): void;
}

export class SimpleDrawingManager implements IDrawingManager {
  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;
  private n: number;
  constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.n = 0;
  }

  drawLine(p1: Point, p2: Point): void {
    this.n += 1;
    const context = this.ctx;
    context.beginPath();
    context.strokeStyle = 'black';
    context.moveTo(p1.x, this.correctY(p1.y));
    context.lineWidth = 5;
    context.lineTo(p2.x, this.correctY(p2.y));
    context.stroke();
  }

  drawBlankScreen() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.width, this.height);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  private correctY(y: number) {
    return this.height - y;
  }
}