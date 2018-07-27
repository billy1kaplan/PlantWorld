import {SeedGenome} from './doodle/genomes/SeedGenome';
import {SimpleBranchingTree} from './doodle/genomes/SimpleBranchingTree';
import {RootLocation} from './doodle/location/RootLocation';
import {Seed} from './doodle/Seed';
import {Point} from './elements/primitives/Point';
import {Sun} from './world/Sun';
import {World} from './world/World';
import { IRootPart } from './doodle/IRootPart';

const doodleGenome = new SimpleBranchingTree();
const seedGenome = new SeedGenome(doodleGenome);
const rootPoint: RootLocation = new RootLocation(new Point(300, 50), 90);
const plant: IRootPart = new Seed(seedGenome, rootPoint, 0);

const sun = new Sun(10, 10);
let world = new World(sun, [plant]);

for (let i = 0; i < 6; i++) {
  // plant = plant.grow();
  // world.log();
  world = world.step();
}
