import {Doodle} from './doodle/Doodle';
import {DoodleGenome} from './doodle/DoodleGenome';
import {DoodleSegment} from './doodle/DoodleSegment';
import {Seed, SeedGenome} from './doodle/SeedGenome';
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

const doodleGenome = new DoodleGenome();
const seedGenome = new SeedGenome(doodleGenome);
console.log('Start');
const seed = new Seed(seedGenome);
seed.print();
console.log('-------------------');
const plant = seed.grow();
plant.print();
console.log('-------------------');
const plant2 = plant.grow();
plant2.print();
console.log('-------------------');
const plant3 = plant2.grow();
plant3.print();
console.log('-------------------');

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