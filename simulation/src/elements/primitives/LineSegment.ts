import { Optional } from 'Optional';
import { IDrawingCanvas } from '../../drawing/IDrawingCanvas';
import { IDrawable } from '../IDrawable';
import { IPrimitive } from './IPrimitive';
import { Line } from './Line';
import { Point } from './Point';
import { VerticalLine } from './VerticalLine';

export class LineSegment implements IDrawable, IPrimitive {
  private static crossProduct(point1: Point, point2: Point) {
    return point1.x * point2.y - point2.x * point1.y;
  }

  private static subtractPoints(point1: Point, point2) {
    return new Point(point1.x - point2.x, point1.y - point2.y);
  }

  constructor(public p1: Point, public p2: Point) {
    if (!this.isFlipOrder(p1, p2)) {
      this.p1 = p1;
      this.p2 = p2;
    } else {
      this.p1 = p2;
      this.p2 = p1;
    }
  }

  public draw(drawingManager: IDrawingCanvas) {
    drawingManager.drawLine(this.p1, this.p2);
  }

  public erase(drawingManager: IDrawingCanvas) {
    drawingManager.eraseLine(this.p1, this.p2);
  }

  public getDistance(origin: Point) {
    const slope = this.getSlope();
    const perpendicularSlope = this.perpendicularSlope();

    if (slope === Infinity) {
      return this.horizontalLineSelect(origin);
    } else if (Math.abs(perpendicularSlope) === Infinity) {
      return this.verticalLineSelect(origin);
    } else {
      return this.ProjectToLine(origin);
    }
  }

  public distanceTo(other: IPrimitive) {
    return other.distanceToLineSegment(this);
  }

  public distanceToPoint(point: Point): number {
    throw new Error('Method not implemented.');
  }
  public distanceToLine(line: Line): number {
    throw new Error('Method not implemented.');
  }

  public distanceToLineSegment(lineSegment: LineSegment) {
    return 0;
  }

  public distanceToVerticalLine(verticalLine: VerticalLine) {
    return 0;
  }

  // https://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
  public intersection(other: LineSegment): Optional<Point> {
    const p = this.p1;
    const p1 = this.p2;
    const q = other.p1;
    const q1 = other.p2;

    const r = LineSegment.subtractPoints(p1, p);
    const s = LineSegment.subtractPoints(q1, q);

    const uNumerator = LineSegment.crossProduct(LineSegment.subtractPoints(q, p), r);
    const denominator = LineSegment.crossProduct(r, s);

    if (denominator === 0) {
      return Optional.empty();
    }
    const u = uNumerator / denominator;
    const t = LineSegment.crossProduct(LineSegment.subtractPoints(q, p), s) / denominator;

    if ((u >= 0) && (u <= 1) && (t >= 0) && (t <= 1)) {
      const intersectionPoint = new Point(q.x + u * s.x, q.y + u * s.y);
      return Optional.of(intersectionPoint);
    } else {
      return Optional.empty();
    }
  }

  public atPoint(x: number): Optional<number> {
    if (!(this.p1.getX() <= x && this.p2.getX() >= x)) {
      return Optional.empty();
    }

    const lineForm = Line.fromTwoPoints(this.p1, this.p2);
    return Optional.of(lineForm.evaluate(x));
  }

  public overlap(other: LineSegment): Optional<LineSegment> {
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
      }
    } else {
      return this.overlapFromAnchor(other);
    }
  }

  public equals(other: LineSegment) {
    return this.p1.equals(other.p1) && this.p2.equals(other.p2);
  }

  /**
   * Returns true if the line segment is perfectly vertical.
   */
  public isVertical() {
    return this.p1.x === this.p2.x;
  }

  public overlapFromAnchor(other: LineSegment): Optional<LineSegment> {
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
        second = other.p2.getX();
      }
    }

    const p1 = new Point(first, this.atPoint(first).getOrError());
    const p2 = new Point(second, this.atPoint(second).getOrError());

    return firstOpt.map((f) => Optional.of(new LineSegment(p1, p2)))
        .getOrElse(Optional.empty());
  }

  public getP1() {
    return this.p1;
  }

  public getP2() {
    return this.p2;
  }

  public magnitude() {
    return this.p1.distanceToPoint(this.p2);
  }

  public getPriority() {
    return Math.max(this.p1.y, this.p2.y);
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
}
