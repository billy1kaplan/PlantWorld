import { IRootPart } from '../doodle/RootDoodle';
import { EnergyCollector, LoggingVisitor, DrawingVisitor } from '../doodle/Visitor';
import { Sun } from './Sun';
import { IDrawingManager } from '../drawing/SimpleDrawingManager';

export class World {
  private sun: Sun;
  private plants: IRootPart[];

  constructor(sun: Sun, plants: IRootPart[]) {
    this.sun = sun;
    this.plants = plants;
  }

  public step(): World {
    const grownPlants = this.plants.map((p) => {
      const energyCollector = new EnergyCollector(this.sun);
      p.visit(energyCollector);
      const energy = energyCollector.done();
      return p.grow(energy);
    });
    return new World(this.sun, grownPlants);
  }

  public log(): void {
    this.plants.forEach((p) => p.visit(new LoggingVisitor()));
  }
  
  public draw(drawingManager: IDrawingManager): void {
    this.plants.forEach((p) => p.visit(new DrawingVisitor(drawingManager)));
  }
}
