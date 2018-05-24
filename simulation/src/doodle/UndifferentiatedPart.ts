import {IDrawingManager} from '../drawing/SimpleDrawingManager';
import {Line} from '../elements/primitives/Line';
import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';

import {IDoodleGenome} from './DoodleGenome';
import {DoodleLocation, LocalPoint} from './DoodleLocation';
import {DoodlePart, DrawableDoodle} from './DoodlePart';
import {DoodleSegment} from './DoodleSegment';
import {SpokePart} from './SpokePart';

export class UndifferentiatedPart implements DrawableDoodle {
  private doodleGenome: IDoodleGenome;

  constructor(doodleGenome: IDoodleGenome) {
    this.doodleGenome = doodleGenome;
  }

  grow(localPoint: LocalPoint): DrawableDoodle {
    const undifferentiatedPart = new UndifferentiatedPart(this.doodleGenome);
    const segment = new DoodleSegment(undifferentiatedPart, localPoint, []);
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