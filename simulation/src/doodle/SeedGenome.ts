import {Doodle} from './Doodle';
import {IDoodleGenome} from './DoodleGenome';
import {DoodlePart} from './DoodlePart';
import {DoodleSegment, IDoodleSegment} from './DoodleSegment';
import {SpokePart} from './SpokePart';
import {UndifferentiatedPart} from './UndifferentiatedPart';

export interface ISeedGenome {
  grow: () => DoodlePart;
  getDoodleGenome: () => IDoodleGenome;
}

export class SeedGenome implements ISeedGenome {
  private doodleGenome: IDoodleGenome;
  constructor(doodleGenome: IDoodleGenome) {
    this.doodleGenome = doodleGenome;
  }

  grow() {
    const undifferentiatedPart = new UndifferentiatedPart(this.doodleGenome);
    const segment = DoodleSegment.of(undifferentiatedPart, null);
    return new SpokePart(this.doodleGenome, [segment, segment]);
  }

  print(): void {
    console.log(this);
  }

  getDoodleGenome() {
    return this.doodleGenome;
  }
}

export class Seed implements ISeedGenome, DoodlePart {
  private doodleGenome: ISeedGenome;
  constructor(doodleGenome: ISeedGenome) {
    this.doodleGenome = doodleGenome;
  }

  grow(): DoodlePart {
    return this.doodleGenome.grow();
  }

  print(): void {
    console.log(this);
  }

  children(): DoodlePart[] {
    return [];
  }

  getDoodleGenome(): IDoodleGenome {
    return this.doodleGenome.getDoodleGenome();
  }

  segments() {
    return [];
  }
}