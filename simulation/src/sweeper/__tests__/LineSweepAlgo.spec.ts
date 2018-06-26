import 'jasmine';
import { LineSweeper } from '../LineSweepAlgo';
import { LineSegment } from '../../elements/primitives/LineSegment';
import { Point } from '../../elements/primitives/Point';

describe('Uses line sweep to determine the highest line segment across the x-axis', () => {
  it('inserts a node', () => {
    const lineSweeper: LineSweeper = new LineSweeper();
    const lineSegment = new LineSegment(new Point(1, 0), new Point(2, 0));
    lineSweeper.add(lineSegment);
    console.log("SWEEP", lineSweeper.sweep());
  });
});