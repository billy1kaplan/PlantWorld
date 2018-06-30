import 'jasmine';
import { LineSweeper } from '../LineSweepAlgo';
import { LineSegment } from '../../elements/primitives/LineSegment';
import { Point } from '../../elements/primitives/Point';

describe('Uses line sweep to determine the highest line segment across the x-axis', () => {
  it('inserts a node', () => {
    const lineSweeper = new LineSweeper();
    const lineSegment = new LineSegment(new Point(1, 0), new Point(2, 0));
    lineSweeper.add(lineSegment);
    const res = lineSweeper.sweep();
    expect(res.length).toBe(1);
  });

  it('handles breaks', () => {
    const lineSweeper = new LineSweeper();
    const lower = new LineSegment(new Point(1, 0), new Point(4, 0));
    const higher = new LineSegment(new Point(2, 1), new Point(3, 1));
    lineSweeper.add(lower);
    lineSweeper.add(higher);
    const res = lineSweeper.sweep();
    expect(res.length).toBe(3);
  });
  
  it('handles diagonals', () => {
    const lineSweeper = new LineSweeper();
    const lower = new LineSegment(new Point(1, 0), new Point(4, 0));
    const middle = new LineSegment(new Point(0, 0), new Point(0, 1));
    const higher = new LineSegment(new Point(2, 1), new Point(3, 1));
    lineSweeper.add(lower);
    lineSweeper.add(middle);
    lineSweeper.add(higher);
    const res = lineSweeper.sweep();
    console.log(res);
  });
});