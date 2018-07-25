import {DoodleLocalSignal} from '../DoodleLocalSignal';
import {DoodleSegment} from '../DoodleSegment';
import {IDoodlePart} from '../IDoodlePart';
import {IDoodleGenome} from './DoodleGenome';
import {FernAlternate} from './FernAlternate';

export class Fern implements IDoodleGenome {
    private w: number;
    private h: number;
    public constructor(w: number, h: number) {
        this.w = w;
        this.h = h;
    }

    public differentiatePart(localSignal: DoodleLocalSignal): IDoodlePart {
        const random = Math.random();
        const location = localSignal.doodleLocation;
        const scaleX = 1 / 108;
        const scaleY = 1 / 360;

        const x = location.getGlobalPosition().getX() * scaleX;
        const y = (1080 - location.getGlobalPosition().getY()) * scaleY;

        let tmpX;
        let tmpY;
        let splits;
        if (random <= 0.01) {
            tmpX = 0;
            tmpY = 0.16 * y;
            splits = 2;
        } else if (random <= 0.08) {
            tmpX = 0.2 * x - 0.26 * y;
            tmpY = 0.23 * x + 0.22 * y + 1.6;
            splits = 3;
        } else if (random <= 0.5) {
            tmpX = -0.15 * x + 0.28 * y;
            tmpY = 0.26 * x + 0.24 * y + 0.44;
            splits = 2;
        } else {
            tmpX = 0.85 * x + 0.04 * y;
            tmpY = -0.04 * x + 0.85 * y + 1.6;
            splits = 1;
        }
        const finalX = this.w / 2 + tmpX * this.w / 11;
        const finalY = this.h - tmpY * this.h / 11;

        const angle =
          5 * Math.sqrt(localSignal.hopLength) *
          Math.round(Math.atan(finalY / finalX) * 360 / (2 * Math.PI));
        const mag = (1 / localSignal.hopLength) * Math.round(Math.sqrt(finalX * finalX + finalY * finalY));

        return DoodleSegment.bud(mag, location, new FernAlternate(angle, this, splits));
    }
}
