import {RootPoint} from './doodle/DoodleLocation';
import {RootPart} from './doodle/RootDoodle';
import {Seed} from './doodle/Seed';
import {SeedGenome} from './doodle/SeedGenome';
import {SimpleBranchingTree} from './doodle/SimpleBranchingTree';
import {Point} from './elements/primitives/Point';
import {Sun} from './world/Sun';
import {World} from './world/World';

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

const doodleGenome = new SimpleBranchingTree();
const seedGenome = new SeedGenome(doodleGenome);
const rootPoint: RootPoint = new RootPoint(new Point(300, 50), 90);
var plant: RootPart = new Seed(seedGenome, rootPoint, 0);

const sun = new Sun(10, 10);
var world = new World(sun, [plant]);

var i = 0
for (i; i < 3; i++) {
  // plant = plant.grow();
  world.log();
  world = world.step();
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