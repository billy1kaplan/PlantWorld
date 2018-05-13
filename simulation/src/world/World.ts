import {Doodle} from '../doodle/Doodle';
import {DoodleSegment} from '../doodle/DoodleSegment';

import {EnergyBoard} from './Board';
import {Sun} from './Sun';

export class World {
  private board: EnergyBoard;
  constructor(public sun: Sun) {
    this.board = new EnergyBoard(sun);
  }

  addDoodle(doodleSegment: DoodleSegment) {
    this.board.insertSegment(doodleSegment);
  }

  collectEnergy() {
    this.board.distributeEnergy();
  }
}