import {DoodleGenome} from './doodle/DoodleGenome';
import {DoodleLocalSignal} from './doodle/DoodleLocalSignal';
import {RootPoint} from './doodle/DoodleLocation';
import {SeedGenome} from './doodle/SeedGenome';
import {IDrawingManager, SimpleDrawingManager} from './drawing/SimpleDrawingManager';
import {Point} from './elements/primitives/Point';
import { Seed } from './doodle/Seed';
import { RootPart } from './doodle/RootDoodle';
import { DrawingVisitor } from './doodle/Visitor';
import { SimpleBranchingTree } from './doodle/SimpleBranchingTree';

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;
var totalTicks = 0;

class Simulation {
  public lastTick: number;
  public tickLength: number;
  public lastRender: number;
  public drawingManager: IDrawingManager;
  public roots: RootPart[];

  update(): void {
    if (totalTicks < 6) {
      this.roots = this.roots.map(r => r.grow(0));
    }
    totalTicks += 1;
  }

  render(tFrame: number): void {
    // this.drawingManager.drawBlankScreen();
    this.drawingManager.clearCanvas();
    this.roots.forEach(r => r.visit(new DrawingVisitor(this.drawingManager)));
  }
}

const doodleGenome = new SimpleBranchingTree();
const seedGenome = new SeedGenome(doodleGenome);

const starting = [300];
const rootCharacteristics = starting.map(
    s => DoodleLocalSignal.rootSignal(new RootPoint(new Point(s, 50), 90)));
const seeds = rootCharacteristics.map(r => new Seed(seedGenome, r));
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
  simulation.tickLength = 100;

  // Render
  canvas = <HTMLCanvasElement>document.getElementById('canvas');
  ctx = canvas.getContext('2d');

  simulation.drawingManager = new SimpleDrawingManager(1080, 720, ctx);
  simulation.roots = seeds;

  main(performance.now());
}