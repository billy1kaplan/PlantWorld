import 'mocha';

import {expect} from 'chai';

import {LineSegment} from '../LineSegment';
import {Point} from '../Point';

describe('Distance function - Horizontal Line Test 1', () => {
  it('should return half root 2', () => {
    const line = new LineSegment(new Point(-1, 0), new Point(0, 1));
    const result = line.getDistance(new Point(0, 0));
    expect(result).to.equal(0.5 * Math.sqrt(2));
  });

  it('should find points at a given coordinate', () => {
    const line = new LineSegment(new Point(0, 0), new Point(1, 1));
    const onLine = line.atPoint(0);
    expect(onLine.getOrError()).to.equal(0);
  });

  it('should find points at a given coordinate', () => {
    const line = new LineSegment(new Point(0, 0), new Point(1, 1));
    const onLine = line.atPoint(0.5);
    expect(onLine.getOrError()).to.equal(0.5);
  });

  it('should return empty for points outside of the line segment', () => {
    const line = new LineSegment(new Point(0, 0), new Point(1, 1));
    const onLine = line.atPoint(2);
    expect(onLine.isPresent()).to.equal(false);
  });

  it('should find correct overlap', () => {
    const line = new LineSegment(new Point(0, 0), new Point(1, 0));
    const otherLine = new LineSegment(new Point(0, 1), new Point(1, 1));
    const onLine = line.overlap(otherLine);
    expect(onLine.getOrError().equals(line)).to.equal(true);
  });

  it('should find correct overlap', () => {
    const line = new LineSegment(new Point(0, 0), new Point(1, 0));
    const otherLine = new LineSegment(new Point(0.5, 1), new Point(1.5, 1));
    const onLine = line.overlap(otherLine);
    expect(onLine.getOrError().equals(
               new LineSegment(new Point(0.5, 0), new Point(1, 0))))
        .to.equal(true);
  });

  it('Should find the intersection of two line segments', () => {
    const segment1 = new LineSegment(new Point(0, 0), new Point(1, 1));
    const segment2 = new LineSegment(new Point(0, 1), new Point(1, 0));
    const intersectionPoint = segment1.intersection(segment2);
    expect(intersectionPoint.getOrError().equals(new Point(0.5, 0.5)))
      .to.equal(true);
  });

  it('Should ignore colinear line segments', () => {
    const segment1 = new LineSegment(new Point(0, 0), new Point(1, 1));
    const segment2 = new LineSegment(new Point(0, 0), new Point(1, 1));
    const intersectionPoint = segment1.intersection(segment2);
    expect(intersectionPoint.isPresent()).to.be.equal(false);
  });

  it('Should ignore colinear line segments that don\'t overlap', () => {
    const segment1 = new LineSegment(new Point(0, 0), new Point(1, 1));
    const segment2 = new LineSegment(new Point(2, 2), new Point(1, 1));
    const intersectionPoint = segment1.intersection(segment2);
    expect(intersectionPoint.isPresent()).to.be.equal(false);
  });

  it('Should detect overlap at end points', () => {
    const segment1 = new LineSegment(new Point(0, 0), new Point(1, 1));
    const segment2 = new LineSegment(new Point(0.5, 0.5), new Point(0.6, 0.5));
    const intersectionPoint = segment1.intersection(segment2);
    expect(intersectionPoint.getOrError().equals(new Point(0.5, 0.5)))
      .to.be.equal(true);
  });

  it('Should ignore line segments that don\'t overlap', () => {
    const segment1 = new LineSegment(new Point(0, 0), new Point(1, 1));
    const segment2 = new LineSegment(new Point(400, 401), new Point(200, 20));
    const intersectionPoint = segment1.intersection(segment2);
    expect(intersectionPoint.isPresent()).to.be.equal(false);
  });
});
