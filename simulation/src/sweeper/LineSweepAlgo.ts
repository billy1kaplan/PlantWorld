import {Heap} from 'Heap';
import {Optional} from 'Optional';

import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';

interface AVLTree<T> {
  insert(node: T): void;
  delete(node: T): void;
  peek(): T;
  aboveSegment(node: T);
  belowSegment(node: T);
  swapPositions(node1: T, node2: T): void;
}

class IntersectionNode {
  kind: 'Intersection';

  constructor(
      public point: Point, public lowerSegment: LineSegment,
      public upperSegment: LineSegment) {}

  equals(other: TNode) {
    return this.kind == other.kind && this.point.equals(other.point) &&
        this.lowerSegment.equals(other.lowerSegment) &&
        this.upperSegment.equals(other.upperSegment);
  }

  compareTo(other: TNode) {
    return this.point.compareTo(other.point);
  }
}

class LeftNode {
  kind: 'Left';
  point: Point;
  segment: LineSegment;

  equals(other: TNode) {
    return this.kind == other.kind && this.point.equals(other.point) &&
        this.segment.equals(other.segment);
  }

  compareTo(other: TNode) {
    return this.point.compareTo(other.point);
  }
}

class RightNode {
  kind: 'Right';
  point: Point;
  segment: LineSegment;

  equals(other: TNode) {
    return this.kind == other.kind && this.point.equals(other.point) &&
        this.segment.equals(other.segment);
  }

  compareTo(other: TNode) {
    return this.point.compareTo(other.point);
  }
}

type TNode = LeftNode|IntersectionNode|RightNode;

class Node {
  isLeft: boolean;
  isRight: boolean;
  isIntersection: boolean;
  lineSegment: LineSegment;
  entity: number;
}

class LineEntity {
  constructor(
      public point1: Point, public point2: Point,
      public energySegment: LineSegment) {}
}

class LineSweeper {
  private priority: Heap<TNode>;

  // Sorted by y-coordinate
  private lines: AVLTree<LineSegment>;

  private bonusEnergy: LineEntity[];

  sweep() {
    var previousEvent: TNode;
    while (!this.priority.isEmpty()) {
      const event = this.priority.deleteMin();

      switch (event.kind) {
        case 'Left':
          const segment = event.segment;
          this.lines.insert(segment);
          const segmentAbove = this.lines.aboveSegment(segment);
          const segmentBelow = this.lines.belowSegment(segment);
          segment.intersection(segmentAbove).ifPresent(intersectionPoint => {
            const intersectionNode =
                new IntersectionNode(intersectionPoint, segment, segmentAbove);
            this.priority.insert(intersectionNode);
          });
          segment.intersection(segmentBelow).ifPresent(intersectionPoint => {
            const intersectionNode =
                new IntersectionNode(intersectionPoint, segment, segmentBelow);
            this.priority.insert(intersectionNode);
          });
          break;
        case 'Right':
          const endingSegment = event.segment;
          const aboveSegment = this.lines.aboveSegment(endingSegment);
          const belowSegment = this.lines.belowSegment(endingSegment);

          const bonusEnergySegment = new LineEntity(
              previousEvent.point, event.point, this.lines.peek());
          this.bonusEnergy.unshift(bonusEnergySegment);

          this.lines.delete(endingSegment);
          segmentAbove.intersection(segmentBelow)
              .ifPresent(intersectionPoint => {
                const intersectionNode = new IntersectionNode(
                    intersectionPoint, segmentBelow, segmentAbove);
                this.priority.insert(intersectionNode);
              });
          break;
        case 'Intersection':
          const intersectionBonus = new LineEntity(
              previousEvent.point, event.point, this.lines.peek());
          this.bonusEnergy.unshift(bonusEnergySegment);

          const lowerSegment = event.lowerSegment;
          const upperSegment = event.upperSegment;
          this.lines.swapPositions(lowerSegment, upperSegment);
          const aboveUpperSegment = this.lines.aboveSegment(upperSegment);
          const belowLowerSegment = this.lines.belowSegment(lowerSegment);
          lowerSegment.intersection(aboveUpperSegment)
              .ifPresent(intersectionPoint => {
                const intersectionNode = new IntersectionNode(
                    intersectionPoint, lowerSegment, aboveUpperSegment);
                this.priority.insert(intersectionNode);
              });
          upperSegment.intersection(belowLowerSegment)
              .ifPresent(intersectionPoint => {
                const intersectionNode = new IntersectionNode(
                    intersectionPoint, belowLowerSegment, upperSegment);
                this.priority.insert(intersectionNode);
              });
          break;
      }

      previousEvent = event;
    }

    return this.bonusEnergy;
  }
}