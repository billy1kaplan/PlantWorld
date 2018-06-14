import {EnergyBoard} from '../world/Board';

export class Doodle {
  private energyLevel: number;

  constructor(initialEnergy: number) {
    this.energyLevel = initialEnergy;
  }

  act(energyBoard: EnergyBoard) {
    energyBoard.insertSegment(this.createSegment());
  }

  private createSegment() {
    console.log(this.energyLevel);

    return null;  // DoodleSegment.of(
                  // this, new LineSegment(new Point(0.5, 0.5), new Point(a,
                  // b)));
  }

  collectEnergy(energy: number): void {
    this.energyLevel += energy;
  }
}