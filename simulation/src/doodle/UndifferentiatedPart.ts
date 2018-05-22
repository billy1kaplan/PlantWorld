import {IDrawingManager} from '../drawing/SimpleDrawingManager';
import {Line} from '../elements/primitives/Line';
import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';

import {IDoodleGenome} from './DoodleGenome';
import {DoodleLocation} from './DoodleLocation';
import {DoodlePart} from './DoodlePart';
import {DoodleSegment} from './DoodleSegment';
import {SpokePart} from './SpokePart';

export class UndifferentiatedPart implements DoodlePart {
  private doodleGenome: IDoodleGenome;
  private doodleLocation: DoodleLocation;

  constructor(doodleGenome: IDoodleGenome, doodleLocation: DoodleLocation) {
    this.doodleGenome = doodleGenome;
    this.doodleLocation = doodleLocation;
  }

  grow(doodleLocation: DoodleLocation): DoodlePart {
    const undifferentiatedPart =
        new UndifferentiatedPart(this.doodleGenome, doodleLocation);
    const segment =
        DoodleSegment.of(undifferentiatedPart, 50, 50, doodleLocation);
    return new SpokePart(
        this.doodleGenome, doodleLocation, [segment, segment, segment]);
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