import {DoodleLocalSignal} from '../doodle/DoodleLocalSignal';
import {DrawableRoot} from '../doodle/RootDoodle';
import {LineSegment} from '../elements/primitives/LineSegment';
import {flatMap} from '../geometricmath/Utility';

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
      const newEnergy = e.lineSegment.getEnergy();
      if (existingEnergy !== undefined) {
        energyPerRoot.set(e.plant, existingEnergy + newEnergy);
      } else {
        energyPerRoot.set(e.plant, newEnergy);
      }
    });
    console.log('BEFORE');
    this.plants.forEach(p => p.log());
    const grownPlants = this.plants.map(p => {
      const energyDiff = this.getOrDefault(energyPerRoot, p, 0);
      console.log('DIFF' + energyDiff);
      return p.grow(this.energyUpdateRoot(energyDiff));
    });
    console.log('AFTER');
    grownPlants.forEach(p => p.log());
    return new World(this.sun, grownPlants);
  }

  getOrDefault(map, key, d) {
    const res = map.get(key);
    if (res) {
      return res;
    } else {
      return d;
    }
  }

  energyUpdateRoot(energy: number) {
    console.log('HERE');
    return (local: DoodleLocalSignal) => {
      if (energy !== NaN) {
        return new DoodleLocalSignal(
            local.doodleLocation, local.hopLength, local.freeEnergy + energy);
      } else {
        return local;
      }
    }
  }
}