import {Doodle} from '../doodle/Doodle';
import {DoodleSegment} from '../doodle/DoodleSegment';
import {DrawableRoot} from '../doodle/SeedGenome';
import {LineSegment} from '../elements/primitives/LineSegment';
import {flatMap} from '../geometricmath/Utility';

import {EnergyBoard} from './Board';
import {Sun} from './Sun';

export class World {
  private sun: Sun;
  private plants: DrawableRoot[];

  constructor(sun: Sun, plants: DrawableRoot[]) {
    this.sun = sun;
    this.plants = plants;
  }

  step(): World {
    const lightParts: LineSegment[] = flatMap(this.plants, p => p.lightParts());
    const grownPlants = this.plants.map(p => p.grow());
    return new World(this.sun, grownPlants);
  }
}