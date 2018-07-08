import { BST } from 'bst';
import { Heap } from 'Heap';
import { LineSegment } from '../elements/primitives/LineSegment';
import { Point } from '../elements/primitives/Point';

class IntersectionNode {
  public kind: 'Intersection';

  constructor(
    public point: Point, public lowerSegment: LineSegment,
    public upperSegment: LineSegment) {
    this.kind = 'Intersection';
    }

  public equals(other: TNode) {
    return this.kind === other.kind && this.point.equals(other.point) &&
      this.lowerSegment.equals(other.lowerSegment) &&
      this.upperSegment.equals(other.upperSegment);
  }

  public compareTo(other: TNode) {
    return this.point.compareTo(other.point);
  }
}

class LeftNode {
  public kind: 'Left';
  public point: Point;
  public segment: LineSegment;

  constructor(point: Point, segment: LineSegment) {
    this.point = point;
    this.segment = segment;
    this.kind = 'Left';
  }

  public equals(other: TNode) {
    return this.kind === other.kind && this.point.equals(other.point) &&
      this.segment.equals(other.segment);
  }

  public compareTo(other: TNode) {
    return this.point.compareTo(other.point);
  }
}

class RightNode {
  public kind: 'Right';
  public point: Point;
  public segment: LineSegment;

  constructor(point: Point, segment: LineSegment) {
    this.point = point;
    this.segment = segment;
    this.kind = 'Right';
  }

  public equals(other: TNode) {
    return this.kind === other.kind && this.point.equals(other.point) &&
      this.segment.equals(other.segment);
  }

  public compareTo(other: TNode) {
    return this.point.compareTo(other.point);
  }
}

type TNode = LeftNode | IntersectionNode | RightNode;

class LineEntity {
  constructor(
    public point1: Point, public point2: Point,
    public energySegment: LineSegment) { }
}

export class LineSweeper {
  private priority: Heap<TNode>;

  // Sorted by y-coordinate
  private lines: BST<LineSegment>;

  public constructor() {
    this.priority = new Heap();
    this.lines = new BST();
  }

  public add(line: LineSegment) {
    const leftNode = new LeftNode(line.p1, line);
    const rightNode = new RightNode(line.p2, line);
    this.priority.insert(leftNode);
    this.priority.insert(rightNode);
  }

  public addAll(lines: LineSegment[]) {
    lines.forEach((line) => this.add(line));
  }

  public sweep() {
    const bonusEnergy: LineEntity[] = [];
    let previousEvent: TNode;
    while (!this.priority.isEmpty()) {
      const event = this.priority.deleteMin().getOrError();

      const maxSegment = this.lines.findMax();
      maxSegment.ifPresent((seg) => {
        const bonusEnergySegment = new LineEntity(
          previousEvent.point, event.point, seg);
        bonusEnergy.unshift(bonusEnergySegment);
      });

      switch (event.kind) {
        case 'Left':
          const segment = event.segment;
          this.lines.insert(segment);
          const segmentAbove = this.lines.predecessor(segment);
          const segmentBelow = this.lines.successor(segment);

          segmentAbove.ifPresent((segA) =>
            segment.intersection(segA).ifPresent((intersectionPoint) => {
              const intersectionNode =
                new IntersectionNode(intersectionPoint, segment, segA);
              this.priority.insert(intersectionNode);
            }));
          segmentBelow.ifPresent((segB) =>
            segment.intersection(segB).ifPresent((intersectionPoint) => {
              const intersectionNode =
                new IntersectionNode(intersectionPoint, segment, segB);
              this.priority.insert(intersectionNode);
            }));
          break;
        case 'Right':
          const endingSegment = event.segment;
          const aboveSegment = this.lines.predecessor(endingSegment);
          const belowSegment = this.lines.successor(endingSegment);

          this.lines.delete(endingSegment);
          aboveSegment.ifPresent((segA) =>
            belowSegment.ifPresent((segB) =>
              segA.intersection(segB)
                .ifPresent((intersectionPoint) => {
                  const intersectionNode = new IntersectionNode(
                    intersectionPoint, segB, segA);
                  this.priority.insert(intersectionNode);
                })));
          break;
        case 'Intersection':
          const lowerSegment = event.lowerSegment;
          const upperSegment = event.upperSegment;
          this.lines.swapPositions(lowerSegment, upperSegment);
          const aboveUpperSegment = this.lines.predecessor(upperSegment);
          const belowLowerSegment = this.lines.successor(lowerSegment);
          aboveUpperSegment.ifPresent((above) =>
            lowerSegment.intersection(above)
              .ifPresent((intersectionPoint) => {
                const intersectionNode = new IntersectionNode(
                  intersectionPoint, lowerSegment, above);
                this.priority.insert(intersectionNode);
              }));
          belowLowerSegment.ifPresent((below) =>
            upperSegment.intersection(below)
              .ifPresent((intersectionPoint) => {
                const intersectionNode = new IntersectionNode(
                  intersectionPoint, below, upperSegment);
                this.priority.insert(intersectionNode);
              }));
          break;
      }

      previousEvent = event;
    }

    return bonusEnergy;
  }
}
