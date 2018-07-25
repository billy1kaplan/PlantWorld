import { DoodleLocalSignal } from '../DoodleLocalSignal';
import { IDoodlePart } from '../IDoodlePart';
import { SpokePart } from '../SpokePart';
import { IDoodleGenome } from './DoodleGenome';

export class FernAlternate implements IDoodleGenome {
    private angle: number;
    private other: IDoodleGenome;
    private splits: number;
    constructor(angle: number, other: IDoodleGenome, splits: number) {
        this.angle = angle;
        this.other = other;
        this.splits = splits;
    }

    public differentiatePart(localSignal: DoodleLocalSignal): IDoodlePart {
        return SpokePart.bud(this.splits, this.other, -this.angle / 4, this.angle);
    }
}
