import {Doodle} from '../doodle/Doodle';
import {DoodleSegment} from '../doodle/DoodleSegment';
import {DrawableRoot} from '../doodle/SeedGenome';
import {LineSegment} from '../elements/primitives/LineSegment';
import {flatMap} from '../geometricmath/Utility';

import {EnergyBoard} from './Board';
import {Sun} from './Sun';

interface PlantSegment {
  plant: DrawableRoot;
  lineSegment: LineSegment;
}

export class World {
  private sun: Sun;
  private plants: DrawableRoot[];

  constructor(sun: Sun, plants: DrawableRoot[]) {
    this.sun = sun;
    this.plants = plants;
  }

  step(): World {
    const lightParts = flatMap(this.plants, p => p.lightParts().map(segment => {
      return {
        'plant': p, 'lineSegment': segment
      }
    }));
    const energyPerRoot = new Map<DrawableRoot, number>();
    lightParts.forEach(e => {
      const existingEnergy = energyPerRoot.get(e.plant);
      const newEnergy = e.lineSegment.magnitude();
      if (existingEnergy !== undefined) {
        energyPerRoot.set(e.plant, existingEnergy + newEnergy);
      } else {
        energyPerRoot.set(e.plant, newEnergy);
      }
    });
    console.log(energyPerRoot);
    const grownPlants = this.plants.map(p => p.grow());
    return new World(this.sun, grownPlants);
  }
}