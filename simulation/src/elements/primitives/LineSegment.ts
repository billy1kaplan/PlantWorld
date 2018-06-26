import {Optional} from 'Optional';

import {DrawingCanvas} from '../../drawing/DrawingCanvas';
import {Drawable} from '../Drawable';

import {Line} from './Line';
import {Point} from './Point';
import {Primitive} from './Primitive';
import {VerticalLine} from './VerticalLine';

export class LineSegment implements Drawable, Primitive {
  constructor(public p1: Point, public p2: Point) {
    if (!this.isFlipOrder(p1, p2)) {
      this.p1 = p1;
      this.p2 = p2;
    } else {
      this.p1 = p2;
      this.p2 = p1;
    }
  }

  draw(drawingManager: DrawingCanvas) {
    drawingManager.drawLine(this.p1, this.p2);
  }

  erase(drawingManager: DrawingCanvas) {
    drawingManager.eraseLine(this.p1, this.p2);
  }

  getDistance(origin: Point) {
    const slope = this.getSlope();
    const perpendicularSlope = this.perpendicularSlope();

    if (slope == Infinity) {
      return this.horizontalLineSelect(origin);
    } else if (Math.abs(perpendicularSlope) == Infinity) {
      return this.verticalLineSelect(origin);
    } else {
      return this.ProjectToLine(origin);
    }
  }

  private getSlope() {
    const deltaY = (this.p2.getY() - this.p1.getY());
    const deltaX = (this.p2.getX() - this.p1.getX());
    return deltaY / deltaX;
  }

  private perpendicularSlope() {
    const slope = this.getSlope();
    return -1 / slope;
  }

  private verticalLineSelect(origin: Point) {
    if (origin.getX() > this.p1.getX() && origin.getX() < this.p2.getX()) {
      return origin.distanceTo(new Point(origin.getX(), this.p1.getY()));
    } else {
      return this.minDistance(origin);
    }
  }

  private horizontalLineSelect(origin: Point) {
    if ((origin.getY() > this.p1.getY() && origin.getY() < this.p2.getY()) ||
        (origin.getY() > this.p2.getY() && origin.getY() < this.p1.getY())) {
      return origin.distanceTo(new Point(this.p1.getX(), origin.getY()));
    } else {
      return this.minDistance(origin);
    }
  }

  private ProjectToLine(point: Point) {
    const slope = this.getSlope();
    const perpendicularSlope = this.perpendicularSlope();

    const b1 = -this.p1.getX() * slope + this.p1.getY();
    const b2 = -point.getX() * perpendicularSlope + point.getY();

    const newX = (b2 - b1) / (slope - perpendicularSlope);
    const newY = point.getY() + perpendicularSlope * (newX - point.getX());

    const minDistanceFromEnds = this.minDistance(point);
    const distanceFromLine = point.distanceTo(new Point(newX, newY));

    if (newX > this.p1.getX() && newX < this.p2.getX()) {
      return distanceFromLine;
    } else {
      return minDistanceFromEnds;
    }
  }

  private isFlipOrder(p1: Point, p2: Point) {
    return (p2.getX() < p1.getX());
  }

  private minDistance(point: Point) {
    const p1Distance = this.p1.distanceTo(point);
    const p2Distance = this.p2.distanceTo(point);

    if (p1Distance < p2Distance) {
      return p1Distance;
    } else {
      return p2Distance;
    }
  }

  distanceTo(other: Primitive) {
    return other.distanceToLineSegment(this);
  }

  distanceToPoint(point: Point): number {
    throw new Error('Method not implemented.');
  }
  distanceToLine(line: Line): number {
    throw new Error('Method not implemented.');
  }

  distanceToLineSegment(lineSegment: LineSegment) {
    return 0;
  }

  distanceToVerticalLine(verticalLine: VerticalLine) {
    return 0;
  }

  intersection(lineSegment: LineSegment): Optional<Point> {
    return Optional.of(new Point(1, 1));
  }

  atPoint(x: number): Optional<number> {
    if (!(this.p1.getX() <= x && this.p2.getX() >= x)) {
      return Optional.empty();
    }

    const lineForm = Line.fromTwoPoints(this.p1, this.p2);
    return Optional.of(lineForm.evaluate(x));
  }

  overlap(other: LineSegment): Optional<LineSegment> {
    if ((this.p2.getX() < other.p1.getX()) ||
        (this.p1.getX() > other.p1.getX())) {
      return Optional.empty();
    }
    const intersection = this.intersection(other);
    if (intersection.isPresent()) {
      const overlapFromAnchor = this.overlapFromAnchor(
          new LineSegment(other.p1, intersection.getOrError()));
      if (overlapFromAnchor.isPresent()) {
        return overlapFromAnchor;
      } else {
        return this.overlapFromAnchor(
            new LineSegment(intersection.getOrError(), other.p2));
      };
    } else {
      return this.overlapFromAnchor(other);
    }
  }

  equals(other: LineSegment) {
    return this.p1.equals(other.p1) && this.p2.equals(other.p2);
  }

  overlapFromAnchor(other: LineSegment): Optional<LineSegment> {
    // key points
    const key1 = other.atPoint(this.p1.getX());
    const key2 = other.atPoint(this.p2.getX());

    const key3 = this.atPoint(other.p1.getX());
    const key4 = this.atPoint(other.p2.getX());
    let first: number;
    if (key1.isPresent() && key1.getOrError() > this.p1.getY()) {
      first = this.p1.getX();
    } else if (key3.isPresent && other.p2.getY() > key3.getOrError()) {
      first = other.p1.getX();
    }
    const firstOpt = Optional.of(first);

    let second: number;
    if (firstOpt.isPresent()) {
      if (key2.isPresent && key2.getOrError() > this.p2.getY()) {
        second = this.p2.getX();
      } else if (key4.isPresent && other.p2.getY() > key3.getOrError()) {
        second = other.p2.getX()
      }
    }

    const p1 = new Point(first, this.atPoint(first).getOrError());
    const p2 = new Point(second, this.atPoint(second).getOrError());

    return firstOpt.map(f => Optional.of(new LineSegment(p1, p2)))
        .getOrElse(Optional.empty());
  }

  getP1() {
    return this.p1;
  }

  getP2() {
    return this.p2;
  }

  magnitude() {
    return this.p1.distanceToPoint(this.p2);
  }

  getPriority() {
    return Math.max(this.p1.y, this.p2.y);
  }
}