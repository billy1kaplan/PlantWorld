import { IBalanceableNode } from '../../../lib/bst/dist/IBalanceableNode';
import { LineSegment } from '../elements/primitives/LineSegment';

export class PrioritySegment implements IBalanceableNode {
    public static normalOrder(y: number, lineSegment: LineSegment) {
      return new PrioritySegment(
        y, lineSegment, PrioritySegment.normalComparisonFunction);
    }

    public static reverseOrder(y: number, lineSegment: LineSegment) {
      return new PrioritySegment(
        y, lineSegment, PrioritySegment.reversedComparisonFunction);
    }

    private static normalComparisonFunction = (m1: number, m2: number): number =>
        m1 - m2

    private static reversedComparisonFunction =
        (m1: number, m2: number): number => m2 - m1

    private static approximatelyEqual = (n1: number, n2: number) =>
        Math.abs(n1 - n2) < 0.000001

    private y: number;
    private lineSegment: LineSegment;
    private slopeComparisonFunction: (m1: number, m2: number) => number;

    constructor(y: number,
                lineSegment: LineSegment,
                slopeComparisonFunction: (m1: number, m2: number) => number) {
      this.y = y;
      this.lineSegment = lineSegment;
      this.slopeComparisonFunction = slopeComparisonFunction;
    }

    public equals(other: IBalanceableNode): boolean {
        if (other instanceof PrioritySegment) {
            return this.lineSegment.equals(other.lineSegment);
        } else {
            return false;
        }
    }

    public getSegment(): LineSegment { return this.lineSegment; }

    public getY(): number { return this.y; }

    public compareTo(other: PrioritySegment): number {
        const thisY = this.y;
        const otherY = other.y;
        if (PrioritySegment.approximatelyEqual(thisY, otherY)) {
          return this.slopeComparisonFunction(this.getSegment().getSlope(),
                                              other.getSegment().getSlope());
        } else {
            return thisY - otherY;
        }
    }

    public reverseComparison(): PrioritySegment {
        if (this.slopeComparisonFunction === PrioritySegment.normalComparisonFunction) {
          return PrioritySegment.reverseOrder(this.y, this.lineSegment);
        } else {
          return PrioritySegment.normalOrder(this.y, this.lineSegment);
        }
    }
}
