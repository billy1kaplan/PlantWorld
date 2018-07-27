import { DrawingVisitor } from '../doodle/doodlevisitor/DrawingVisitor';
import { EnergyCollector } from '../doodle/doodlevisitor/EnergyCollector';
import { LoggingVisitor } from '../doodle/doodlevisitor/LoggingVisitor';
import { IDrawingManager } from '../drawing/SimpleDrawingManager';
import { Sun } from './Sun';
import { IRootPart } from '../doodle/IRootPart';

export class World {
  private sun: Sun;
  private plants: IRootPart[];

  constructor(sun: Sun, plants: IRootPart[]) {
    this.sun = sun;
    this.plants = plants;
  }

  public step(): World {
    const grownPlants = this.plants.map((p) => {
      const energy = this.collectEnergyFromDoodle(p);
      console.log(energy);
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

  private collectEnergyFromDoodle(root: IRootPart): number {
      const energyCollector = new EnergyCollector(this.sun);
      root.visit(energyCollector);
      return energyCollector.done();
  }
}
