import {DoodleGenome} from './doodle/DoodleGenome';
import {DoodleLocation, RootPoint} from './doodle/DoodleLocation';
import {DoodlePart} from './doodle/DoodlePart';
import {DoodleSegment, IDoodleSegment} from './doodle/DoodleSegment';
import {DoodleRoot, DrawableRoot, RootPart, Seed, SeedGenome} from './doodle/SeedGenome';
import {IDrawingManager, SimpleDrawingManager} from './drawing/SimpleDrawingManager';
import {Point} from './elements/primitives/Point';

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var totalTicks = 0;

class Simulation {
  public lastTick: number;
  public tickLength: number;
  public lastRender: number;
  public drawingManager: IDrawingManager;
  public root: DrawableRoot;

  update(): void {
    if (totalTicks < 10) {
      this.root = this.root.grow();
    }
    totalTicks += 1;
  }

  render(tFrame: number): void {
    // this.drawingManager.drawBlankScreen();
    this.drawingManager.clearCanvas();
    this.root.draw(this.drawingManager);
  }
}

const doodleGenome = new DoodleGenome();
const seedGenome = new SeedGenome(doodleGenome);
const rootPoint = new RootPoint(new Point(10, 0), 90);
const seed = new Seed(seedGenome, rootPoint);
const simulation = new Simulation();

window.onload = function() {
  function main(tFrame) {
    window.requestAnimationFrame(main);
    var nextTick = simulation.lastTick + simulation.tickLength;
    var numTicks = 0;

    if (tFrame > nextTick) {
      var timeSinceTick = tFrame - simulation.lastTick;
      numTicks = Math.floor(timeSinceTick / simulation.tickLength);
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
  simulation.tickLength = 1000;

  // Render
  canvas = <HTMLCanvasElement>document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  simulation.drawingManager = new SimpleDrawingManager(1080, 720, ctx);
  simulation.root = seed;

  main(performance.now());
}