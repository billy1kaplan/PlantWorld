import {DoodleGenome, IDoodleGenome} from './DoodleGenome';
import {DoodlePart} from './DoodlePart';
import {DoodleSegment, IDoodleSegment} from './DoodleSegment';

export class SpokePart implements DoodlePart {
  private genome: IDoodleGenome;
  private doodleSegments: DoodlePart[];

  constructor(genome: IDoodleGenome, doodleSegments: DoodlePart[]) {
    this.genome = genome;
    this.doodleSegments = doodleSegments;
  }

  grow(): DoodlePart {
    const newSegments = this.doodleSegments.map(segment => segment.grow());
    return new SpokePart(this.genome, newSegments);
  }

  children() {
    return this.doodleSegments;
  }

  print(): void {
    console.log(this);
    this.doodleSegments.forEach(e => e.print());
  }

  segments() {
    return [];
  }
}