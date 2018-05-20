import {IDrawingManager} from '../drawing/SimpleDrawingManager';
import {Line} from '../elements/primitives/Line';
import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';

import {IDoodleGenome} from './DoodleGenome';
import {DoodlePart} from './DoodlePart';
import {DoodleSegment} from './DoodleSegment';
import {SpokePart} from './SpokePart';

export class UndifferentiatedPart implements DoodlePart {
  private doodleGenome: IDoodleGenome;
  constructor(doodleGenome: IDoodleGenome) {
    this.doodleGenome = doodleGenome;
  }

  grow(): DoodlePart {
    const undifferentiatedPart = new UndifferentiatedPart(this.doodleGenome);
    const segment = DoodleSegment.of(
        undifferentiatedPart,
        new LineSegment(new Point(20, 20), new Point(100, 100)));
    return new SpokePart(this.doodleGenome, [segment, segment, segment]);
  }

  children() {
    return [];
  }

  print(): void {
    console.log(this);
  }

  segments() {
    return [];
  }

  draw(drawingManager: IDrawingManager): void {}
}