import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';
import {EnergyBoard} from '../world/Board';

import {DoodleSegment} from './DoodleSegment';

export class Doodle {
  private components: DoodleSegment[];
  private energyLevel: number;

  constructor(initialEnergy: number) {
    this.energyLevel = initialEnergy;
    this.components = [];
  }

  act(energyBoard: EnergyBoard) {
    energyBoard.insertSegment(this.createSegment());
  }

  private createSegment() {
    console.log(this.energyLevel);

    const a = this.energyLevel * Math.random();
    const b = this.energyLevel * Math.random();

    return null;  // DoodleSegment.of(
                  // this, new LineSegment(new Point(0.5, 0.5), new Point(a,
                  // b)));
  }

  collectEnergy(energy: number): void {
    this.energyLevel += energy;
  }
}