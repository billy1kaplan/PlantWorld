import {Doodle} from './doodle/Doodle';
import {DoodleGenome} from './doodle/DoodleGenome';
import {DoodleLocation} from './doodle/DoodleLocation';
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

const doodleLocation = new DoodleLocation(10, 10);

const doodleGenome = new DoodleGenome();
const seedGenome = new SeedGenome(doodleGenome);
console.log('Start');
const seed = new Seed(seedGenome, doodleLocation);
const plant = seed.grow(doodleLocation);
const grow1 = plant.grow(doodleLocation);
const grow2 = plant.grow(doodleLocation);
const grow3 = plant.grow(doodleLocation);
const grow4 = plant.grow(doodleLocation);
grow4.print();

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