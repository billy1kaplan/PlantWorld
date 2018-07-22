import { BST } from 'bst';
import { Heap } from 'Heap';
import { LineSegment } from '../elements/primitives/LineSegment';
import { Point } from '../elements/primitives/Point';
import { IBalanceableNode } from '../../../lib/bst/dist/IBalanceableNode';

class IntersectionNode {
  public kind: 'INTERSECTION';

  constructor(
    public point: Point,
    public lowerSegment: LineSegment,
    public upperSegment: LineSegment) {
    this.kind = 'INTERSECTION';
  }

  // Makes sure we can detect duplicate intersection nodes
  public equals(other: TNode) {
    return this.kind === other.kind && this.point.equals(other.point) &&
      this.lowerSegment.equals(other.lowerSegment) &&
      this.upperSegment.equals(other.upperSegment);
  }

  public compareTo(other: TNode) {
    return this.point.compareTo(other.point);
  }
}

class EndNode {
  public kind: 'LEFT' | 'RIGHT';
  public point: Point;
  public segment: LineSegment;

  public static createLeft(point: Point, segment: LineSegment) {
    return new EndNode(point, segment, 'LEFT');
  }

  public static createRight(point: Point, segment: LineSegment) {
    return new EndNode(point, segment, 'RIGHT');
  }

  private constructor(point: Point, segment: LineSegment, kind: 'LEFT' | 'RIGHT') {
    this.point = point;
    this.segment = segment;
    this.kind = kind;
  }

  public equals(other: TNode) {
      return this.kind === other.kind 
      && this.point.equals(other.point) 
      && this.segment.equals(other.segment);
  }

  public compareTo(other: TNode) {
    return this.point.compareTo(other.point);
  }
}

type TNode = EndNode | IntersectionNode;

class LineEntity {
  constructor(
    public point1: Point, public point2: Point,
    public energySegment: LineSegment) { }
}

class PrioritySegment implements IBalanceableNode {
  private y: number;
  private lineSegment: LineSegment;

  constructor(y: number, lineSegment: LineSegment) {
    this.y = y;
    this.lineSegment = lineSegment;
  }

  equals(other: IBalanceableNode): boolean {
    if (other instanceof PrioritySegment) {
      return this.lineSegment.equals(other.lineSegment);
    } else {
      return false;
    }
  }  

  getPriority(): number {
    return this.y;
  }

  getSegment(): LineSegment {
    return this.lineSegment;
  }
}

export class LineSweeper {
  private priority: Heap<TNode>;
  private lines: BST<PrioritySegment>;

  public constructor() {
    this.priority = new Heap();
    this.lines = new BST();
  }

  /**
   * 
   * @param line a non-vertical line segments. Vertical lines are ignored.
   */
  public add(line: LineSegment): void {
    if (line.isVertical()) {
      return;
    }

    const leftNode = EndNode.createLeft(line.p1, line);
    const rightNode = EndNode.createRight(line.p2, line);
    this.priority.insert(leftNode);
    this.priority.insert(rightNode);
  }

  public addAll(lines: LineSegment[]) {
    lines.forEach((line) => this.add(line));
  }

  /*
    By the invariant of the add and add-all methods and immutability of segments & points, 
    there are no vertical lines.
  */
  public sweep() {
    const bonusEnergy: LineEntity[] = [];
    let previousEvent: TNode;
    while (!this.priority.isEmpty()) {
      const event = this.priority.deleteMin().getOrError();
      const maxSegment = this.lines.findMax((node: PrioritySegment) => node.getSegment().atPoint(event.point.x).getOrElse(0));
      maxSegment.ifPresent((prioritySegment) => {
        const bonusEnergySegment = new LineEntity(
          previousEvent.point, event.point, prioritySegment.getSegment());
        bonusEnergy.unshift(bonusEnergySegment);
      });

      switch (event.kind) {
        case 'LEFT':
          const segment = event.segment;
          const prioritySegment = new PrioritySegment(event.point.y, segment);
          this.lines.insert(prioritySegment);
          const segmentAbove = this.lines.predecessor(prioritySegment);
          const segmentBelow = this.lines.successor(prioritySegment);

          segmentAbove.ifPresent((segA) =>
            segment.intersection(segA.getSegment()).ifPresent((intersectionPoint) => {
              const intersectionNode =
                new IntersectionNode(intersectionPoint, segment, segA.getSegment());
              this.priority.insert(intersectionNode);
            }));
          segmentBelow.ifPresent((segB) =>
            segment.intersection(segB.getSegment()).ifPresent((intersectionPoint) => {
              const intersectionNode =
                new IntersectionNode(intersectionPoint, segment, segB.getSegment());
              this.priority.insert(intersectionNode);
            }));
          break;
        case 'RIGHT':
          const endingSegment = event.segment;
          const rightPrioritySegment = new PrioritySegment(event.point.y, endingSegment);
          const aboveSegment = this.lines.predecessor(rightPrioritySegment);
          const belowSegment = this.lines.successor(rightPrioritySegment);
          this.lines.delete(rightPrioritySegment);

          aboveSegment.ifPresent((segA) =>
            belowSegment.ifPresent((segB) =>
              segA.getSegment().intersection(segB.getSegment())
                .ifPresent((intersectionPoint) => {
                  const intersectionNode = new IntersectionNode(
                    intersectionPoint, segB.getSegment(), segA.getSegment());
                  this.priority.insert(intersectionNode);
                })));
          break;
        case 'INTERSECTION':
          const lowerSegment = event.lowerSegment;
          const yCoordinate = event.point.y;
          const lowerPrioritySegment = new PrioritySegment(yCoordinate, lowerSegment);

          const upperSegment = event.upperSegment;
          const upperPrioritySegment = new PrioritySegment(yCoordinate, upperSegment);

          this.lines.swapPositions(lowerPrioritySegment, upperPrioritySegment);
          const aboveUpperSegment = this.lines.predecessor(lowerPrioritySegment);
          const belowLowerSegment = this.lines.successor(upperPrioritySegment);
          this.lines.delete(lowerPrioritySegment);
          this.lines.delete(upperPrioritySegment);
          aboveUpperSegment.ifPresent((above) =>
            lowerSegment.intersection(above.getSegment())
              .ifPresent((intersectionPoint) => {
                const intersectionNode = new IntersectionNode(
                  intersectionPoint, lowerSegment, above.getSegment());
                this.priority.insert(intersectionNode);
              }));
          belowLowerSegment.ifPresent((below) =>
            upperSegment.intersection(below.getSegment())
              .ifPresent((intersectionPoint) => {
                const intersectionNode = new IntersectionNode(
                  intersectionPoint, below.getSegment(), upperSegment);
                this.priority.insert(intersectionNode);
              }));
          break;
      }

      previousEvent = event;
    }

    return bonusEnergy;
  }
}
