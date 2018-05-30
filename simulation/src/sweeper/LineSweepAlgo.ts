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
      public point: Point, public segment1: LineSegment,
      public segment2: LineSegment) {}

  getPriority() {
    return this.point.getX();
  }

  getElement() {
    return this;
  }
}

class LeftNode {
  kind: 'Left';
  point: Point;
  segment: LineSegment;

  getPriority() {}

  getElement() {
    return this;
  }
}

class RightNode {
  kind: 'Right';
  point: Point;
  segment: LineSegment;

  getPriority() {}

  getElement() {
    return this;
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
      const element = this.priority.deleteMin();
      const event = element.getElement();

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
                    intersectionPoint, segmentAbove, segmentBelow);
                // Change to uniqueInsert
                this.priority.insert(intersectionNode);
              });
          break;
        case 'Intersection':
          const intersectionBonus = new LineEntity(
              previousEvent.point, event.point, this.lines.peek());
          this.bonusEnergy.unshift(bonusEnergySegment);
          // Make sure this invariant is not broken; above and below
          const segment1 = event.segment1;
          const segment2 = event.segment2;
          this.lines.swapPositions(segment1, segment2);
          const segA = this.lines.aboveSegment(segment2);
          const segB = this.lines.belowSegment(segment1);
          event.segment2.intersection(segmentAbove)
              .ifPresent(intersectionPoint => {
                const intersectionNode = new IntersectionNode(
                    intersectionPoint, segmentAbove, segment2);
                // Change to uniqueInsert
                this.priority.insert(intersectionNode);
              });
          event.segment1.intersection(segmentBelow)
              .ifPresent(intersectionPoint => {
                const intersectionNode = new IntersectionNode(
                    intersectionPoint, segmentBelow, segment1);
                // Change to uniqueInsert
                this.priority.insert(intersectionNode);
              });
          break;
      }

      previousEvent = event;
    }

    return this.bonusEnergy;
  }
}