import {IDrawingManager} from '../drawing/SimpleDrawingManager';
import {Line} from '../elements/primitives/Line';
import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';

import {IDoodleGenome} from './DoodleGenome';
import {DoodleLocalSignal} from './DoodleLocalSignal';
import {DoodleLocation, LocalLocation, LocalPoint} from './DoodleLocation';
import {DoodlePart, DrawableDoodle} from './DoodlePart';
import {DoodleSegment} from './DoodleSegment';
import {SpokePart} from './SpokePart';

export class UndifferentiatedPart implements DrawableDoodle {
  private doodleGenome: IDoodleGenome;

  constructor(doodleGenome: IDoodleGenome) {
    this.doodleGenome = doodleGenome;
  }

  grow(doodleLocalSignal: DoodleLocalSignal): DrawableDoodle {
    const placeholder = new UndifferentiatedPart(this.doodleGenome);
    const angles = [-20, 20];
    const locations = angles.map(
        a => new LocalLocation(doodleLocalSignal.doodleLocation, a, 20));
    const nextParts = locations.map(n => new DoodleSegment(placeholder, n, []));
    return new SpokePart(this.doodleGenome, nextParts);
  }

  children() {
    return [];
  }

  log(): void {
    console.log(this);
  }

  lightParts() {
    return [];
  }

  draw(drawingManager: IDrawingManager): void {}
}