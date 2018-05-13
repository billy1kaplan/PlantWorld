import 'mocha';

import {expect} from 'chai';

import {LineSegment} from '../LineSegment';
import {Point} from '../Point';

describe('Point distance function - 1', () => {
  it('should return 6', () => {
    const point = new Point(0, 0);

    const result = calculateDistanceFrom(point, 3, 4);

    expect(result).to.equal(5);
  });
});

describe('Point distance function - 2', () => {
  it('should return 0', () => {
    const point = new Point(0, 0);

    const result = calculateDistanceFrom(point, 0, 0);

    expect(result).to.equal(0);
  });
});

const calculateDistanceFrom = (p: Point, x: number, y: number) =>
    (p.distanceTo(new Point(x, y)));