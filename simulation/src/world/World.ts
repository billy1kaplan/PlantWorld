import { RootPart } from '../doodle/RootDoodle';
import { LoggingVisitor, EnergyCollector } from '../doodle/Visitor';

import { Sun } from './Sun';

export class World {
  private sun: Sun;
  private plants: RootPart[];

  constructor(sun: Sun, plants: RootPart[]) {
    this.sun = sun;
    this.plants = plants;
  }

  step(): World {
    const grownPlants = this.plants.map(p => {
      const energyCollector = new EnergyCollector(this.sun);
      p.visit(energyCollector);
      const energy = energyCollector.done();
      return p.grow(energy);
    });
    return new World(this.sun, grownPlants);
  }

  log(): void {
    this.plants.forEach(p => p.visit(new LoggingVisitor()));
  }
}