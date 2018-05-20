import {Point} from '../elements/primitives/Point';

export interface IDrawingManager {
  drawLine(p1: Point, p2: Point): void;
  drawBlankScreen(): void;
}

export class SimpleDrawingManager implements IDrawingManager {
  private ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  drawLine(p1: Point, p2: Point): void {
    console.log('Draw line');
    const context = this.ctx;
    context.beginPath();
    context.strokeStyle = 'white';
    context.moveTo(p1.x, p1.y);
    context.lineWidth = 5;
    context.lineTo(p2.x, p2.y);
    context.stroke();
  }

  drawBlankScreen() {
    this.ctx.beginPath();
    this.ctx.rect(0, 0, 1080, 720);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
  }
}