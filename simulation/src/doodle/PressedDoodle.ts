import {LineSegment} from '../elements/primitives/LineSegment';

export class PressedDoodle {
  private segments: LineSegment[];
  private energy: number;

  constructor(segments: LineSegment[], energy: number) {
    this.segments = segments;
    this.energy = energy;
  };

  getSegments() {
    return this.segments;
  }

  getEnergy() {
    return this.energy;
  }
}