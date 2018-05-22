import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';

export class DoodleLocation {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  transformChildX(x: number): number {
    return this.x + x;
  }

  transformChildY(y: number): number {
    return this.y + y;
  }

  shift(x: number, y: number) {
    return new DoodleLocation(this.x + x, this.y + y);
  }

  convertToGlobalPosition(x: number, y: number): LineSegment {
    console.log(new LineSegment(
        new Point(this.x, this.y), new Point(this.x + x, this.y + y)));
    return new LineSegment(
        new Point(this.x, this.y), new Point(this.x + x, this.y + y));
  }
}