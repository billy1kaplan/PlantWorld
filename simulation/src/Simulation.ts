import {Doodle} from './doodle/Doodle';
import {DoodleGenome} from './doodle/DoodleGenome';
import {DoodleLocation, RootPoint} from './doodle/DoodleLocation';
import {DoodleSegment} from './doodle/DoodleSegment';
import {DrawableRoot, Seed, SeedGenome} from './doodle/SeedGenome';
import {LineSegment} from './elements/primitives/LineSegment';
import {Point} from './elements/primitives/Point';
import {EnergyBoard} from './world/Board';
import {Sun} from './world/Sun';

/*
const sun = new Sun(1, 10);
const lineSegment = new LineSegment(new Point(0.1, 0.1), new Point(1, 1));
const doodle = new Doodle(10);
const energyBoard = new EnergyBoard(sun);
doodle.act(energyBoard);
energyBoard.distributeEnergy();
doodle.act(energyBoard);
energyBoard.distributeEnergy();
doodle.act(energyBoard);
energyBoard.distributeEnergy();
*/


console.log('Start');
const doodleGenome = new DoodleGenome();
const seedGenome = new SeedGenome(doodleGenome);
const rootPoint = new RootPoint(new Point(10, 0), 0);
var plant: DrawableRoot = new Seed(seedGenome, rootPoint);

var i = 0
for (i; i < 10; i++) {
  plant = plant.grow();
}

/*
const MS_PER_UPDATE = 1;

var previous = Date.now();
var lag = 0.0;
while (true) {
  var current = Date.now();
  var elapsed = current - previous;
  previous = current;
  lag += elapsed;

  console.log('running');

  // processInput()

  while (lag > MS_PER_UPDATE) {
    // Update()
    lag -= MS_PER_UPDATE;
  }

  // render()
}*/