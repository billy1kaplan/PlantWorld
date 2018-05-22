import {DoodleGenome} from './doodle/DoodleGenome';
import {DoodleLocation} from './doodle/DoodleLocation';
import {DoodlePart} from './doodle/DoodlePart';
import {DoodleSegment, IDoodleSegment} from './doodle/DoodleSegment';
import {Seed, SeedGenome} from './doodle/SeedGenome';
import {IDrawingManager, SimpleDrawingManager} from './drawing/SimpleDrawingManager';

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;

const doodleLocation = new DoodleLocation(10, 10);

class Simulation {
  public lastTick: number;
  public tickLength: number;
  public lastRender: number;
  public drawingManager: IDrawingManager;
  public root: DoodlePart;

  update(): void {
    console.log('UPDATE');
    this.root = this.root.grow(doodleLocation);
  }

  render(tFrame: number): void {
    console.log('RENDER');
    this.drawingManager.drawBlankScreen();
    this.root.draw(this.drawingManager);
  }
}

const doodleGenome = new DoodleGenome();
const seedGenome = new SeedGenome(doodleGenome);
const seed = new Seed(seedGenome, doodleLocation);
const simulation = new Simulation();

window.onload = function() {
  function main(tFrame) {
    window.requestAnimationFrame(main);
    var nextTick = simulation.lastTick + simulation.tickLength;
    var numTicks = 0;

    if (tFrame > nextTick) {
      var timeSinceTick = tFrame - simulation.lastTick;
      numTicks = Math.floor(timeSinceTick / simulation.tickLength);
      console.log(numTicks);
    }

    queueUpdates(numTicks, tFrame);
  }

  function queueUpdates(numTicks, tFrame) {
    for (var i = 0; i < numTicks; i++) {
      simulation.lastTick = simulation.lastTick + simulation.tickLength;
      simulation.update();
      simulation.render(tFrame);
      simulation.lastRender = tFrame;
    }
  }

  simulation.lastTick = performance.now();
  simulation.lastRender = simulation.lastTick;
  simulation.tickLength = 10000;

  // Render
  canvas = <HTMLCanvasElement>document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  simulation.drawingManager = new SimpleDrawingManager(1080, 720, ctx);
  simulation.root = seed;

  main(performance.now());
}