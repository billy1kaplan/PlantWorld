import {IDrawingManager} from '../../drawing/SimpleDrawingManager';
import {DoodleSegment} from '../DoodleSegment';

import {NoOpVisitorSkeleton} from './NoOpVisitorSkeleton';

export class DrawingVisitor extends NoOpVisitorSkeleton<void> {
  private drawingManager: IDrawingManager;

  public constructor(drawingManager: IDrawingManager) {
    super();
    this.drawingManager = drawingManager;
  }

  public visitSegment(value: DoodleSegment) {
    const lineSegment = value.getLineSegment();
    this.drawingManager.drawLine(lineSegment.getP1(), lineSegment.getP2());
  }

  public done() { return undefined; }
}
