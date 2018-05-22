import {Point} from '../elements/primitives/Point';

export interface IDrawingManager {
  drawLine(p1: Point, p2: Point): void;
  drawBlankScreen(): void;
}

export class SimpleDrawingManager implements IDrawingManager {
  private width: number;
  private height: number;
  private ctx: CanvasRenderingContext2D;
  constructor(width: number, height: number, ctx: CanvasRenderingContext2D) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;
  }

  drawLine(p1: Point, p2: Point): void {
    console.log('Draw line');
    const context = this.ctx;
    context.beginPath();
    context.strokeStyle = 'white';
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

  private correctY(y: number) {
    return this.height - y;
  }
}