import {Doodle} from '../doodle/Doodle';
import {DoodleLocalSignal} from '../doodle/DoodleLocalSignal';
import {RootPoint} from '../doodle/DoodleLocation';
import {DoodleSegment} from '../doodle/DoodleSegment';
import {DrawableRoot} from '../doodle/SeedGenome';
import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';
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
    const grownPlants = this.plants.map(
        p => p.grow(this.energyUpdateRoot(energyPerRoot.get(p))));
    return new World(this.sun, grownPlants);
  }

  energyUpdateRoot(energy: number) {
    return (local: DoodleLocalSignal) => {
      console.log(local);
      return new DoodleLocalSignal(
          local.doodleLocation, local.hopLength, local.freeEnergy + energy);
    }
  }
}