import {SeedGenome} from './doodle/genomes/SeedGenome';
import {SimpleBranchingTree} from './doodle/genomes/SimpleBranchingTree';
import {RootLocation} from './doodle/location/RootLocation';
import {Seed} from './doodle/Seed';
import {
  IDrawingManager,
  SimpleDrawingManager,
} from './drawing/SimpleDrawingManager';
import {Point} from './elements/primitives/Point';
import {Sun} from './world/Sun';
import {World} from './world/World';

class Simulation {
  public lastTick: number;
  public tickLength: number;
  public lastRender: number;
  public drawingManager: IDrawingManager;
  public world: World;

  private totalTicks: number;
  private maxTicks: number;

  constructor(maxTicks: number) {
    this.maxTicks = maxTicks;
    this.totalTicks = 0;
  }

  public update(): void {
    if (this.totalTicks < this.maxTicks) {
      this.world = this.world.step();
    }
    this.totalTicks += 1;
  }

  public render(tFrame: number): void {
    this.drawingManager.clearCanvas();
    this.world.draw(this.drawingManager);
  }
}

window.onload = () => {
  const doodleGenome = new SimpleBranchingTree();
  // const doodleGenome = new Fern(20, 100);
  const seedGenome = new SeedGenome(doodleGenome);

  const starting = [540];
  const rootCharacteristics =
    starting.map((s) => (new RootLocation(new Point(s, 50), 90)));
  const seeds = rootCharacteristics.map((r) => new Seed(seedGenome, r, 0));
  const simulation = new Simulation(12);

  function main(tFrame) {
    window.requestAnimationFrame(main);
    const nextTick = simulation.lastTick + simulation.tickLength;
    let numTicks = 0;

    if (tFrame > nextTick) {
      const timeSinceTick = tFrame - simulation.lastTick;
      numTicks = Math.floor(timeSinceTick / simulation.tickLength);
    }

    queueUpdates(numTicks, tFrame);
  }

  function queueUpdates(numTicks, tFrame) {
    for (let i = 0; i < numTicks; i++) {
      simulation.lastTick = simulation.lastTick + simulation.tickLength;
      simulation.update();
      simulation.render(tFrame);
      simulation.lastRender = tFrame;
    }
  }

  simulation.lastTick = performance.now();
  simulation.lastRender = simulation.lastTick;
  simulation.tickLength = 100;

  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  simulation.drawingManager = new SimpleDrawingManager(1080, 720, ctx);
  const sun = new Sun(10, 10);
  simulation.world = new World(sun, seeds);

  main(performance.now());
};
