import 'mocha';

import {expect} from 'chai';

import {Line} from '../Line';
import {Point} from '../Point';


describe('Distance function - Boring Line Test 1', () => {
  it('should return 1', () => {
    const line = Line.fromSlopeIntercept(0, 0);
    const result = line.distanceToPoint(new Point(0, 0));
    expect(result).to.equal(0);
  });
});

describe('Distance function - Diagonal Line Test 1', () => {
  it('should return half root 2', () => {
    const line = Line.fromSlopeIntercept(1, 1);
    const result = line.distanceToPoint(new Point(0, 0));
    expect(result).to.closeTo(0.5 * Math.sqrt(2), 0.000001);
  });
});

describe('Distance function - Diagonal Line Test 2', () => {
  it('should return half root 2', () => {
    const line = Line.fromSlopeIntercept(0, 1);
    const result = line.distanceToPoint(new Point(0, 0));
    expect(result).to.closeTo(1, 0.000001);
  });
});