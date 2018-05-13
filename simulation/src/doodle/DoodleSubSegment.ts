import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';
import {Sun} from '../world/Sun';

import {DoodleSegment} from './DoodleSegment';

export class DoodleSubSegment {
  start: Point;
  end: Point;
  lineSegment: LineSegment;

  constructor(start: Point, end: Point, lineSegment: LineSegment) {}

  yieldEnergy(sun: Sun) {}
}