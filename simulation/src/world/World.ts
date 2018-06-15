import {DoodleLocalSignal} from '../doodle/DoodleLocalSignal';
import {RootPart} from '../doodle/RootDoodle';
import {LoggingVisitor} from '../doodle/Visitor';

import {Sun} from './Sun';

export class World {
  private sun: Sun;
  private plants: RootPart[];

  constructor(sun: Sun, plants: RootPart[]) {
    this.sun = sun;
    this.plants = plants;
  }

  step(): World {
    const grownPlants = this.plants.map(p => {
      const energyDiff = 0;
      return p.grow(this.energyUpdateRoot(energyDiff));
    });
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
    return (local: DoodleLocalSignal) => {
      if (energy !== NaN) {
        return new DoodleLocalSignal(
            local.doodleLocation, local.hopLength, local.freeEnergy + energy);
      } else {
        return local;
      }
    }
  }

  log(): void {
    console.log('VISITOR LOGGER');
    this.plants.forEach(p => p.visit(new LoggingVisitor()));
  }
}