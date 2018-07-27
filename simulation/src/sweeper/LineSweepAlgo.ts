import { BST } from 'bst';
import { Heap } from 'Heap';
import { LineSegment } from '../elements/primitives/LineSegment';
import { Point } from '../elements/primitives/Point';
import { EndEvent } from './EndNode';
import { IntersectionEvent } from './IntersectionNode';
import { LineSubsegment } from './LineSubsegment';
import { PrioritySegment } from './PrioritySegment';
import { SweepEvent } from './SweepEvent';
import { Line } from '../elements/primitives/Line';

export class LineSweeper {
  public static sweepSegments(lineSegments: LineSegment[]): LineSubsegment[] {
    const sweeper = new LineSweeper();
    sweeper.addAll(lineSegments);
    return sweeper.sweep();
  }

  private static updater = (x: number) => (node: PrioritySegment):
    PrioritySegment => {
    return PrioritySegment.normalOrder(node.getSegment().atPoint(x).getOrError(),
      node.getSegment());
  }

  private priority: Heap<SweepEvent>;
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

    const leftNode = EndEvent.createLeft(line);
    const rightNode = EndEvent.createRight(line);
    this.priority.insert(leftNode);
    this.priority.insert(rightNode);
  }

  public addAll(lines: LineSegment[]) {
    lines.forEach((line) => this.add(line));
  }

  /**
   * By the invariant of the add and add-all methods and immutability of
   * segments & points, there are no vertical lines.
   */
  public sweep() {
    const bonusEnergy: LineSubsegment[] = [];
    let previousEvent: SweepEvent;
    while (!this.priority.isEmpty()) {
      const event = this.priority.deleteMin().getOrError();
      const maxSegment = this.lines.findMax();
      maxSegment.ifPresent((currentMaxSegment) => {
        if (event.point.x !== previousEvent.point.x) {
          const currentPoint = currentMaxSegment.getSegment().atPoint(event.point.x).getOrError();
          const bonusEnergySegment = new LineSubsegment(
            previousEvent.point, new Point(event.point.x, currentPoint), currentMaxSegment.getSegment());
          bonusEnergy.unshift(bonusEnergySegment);
        }
      });

      const updateFunction = LineSweeper.updater(event.point.x);
      switch (event.kind) {
        case 'LEFT':
          const segment = event.segment;
          const prioritySegment = PrioritySegment.normalOrder(event.point.y, segment);
          this.lines.insert(prioritySegment, updateFunction);
          const segmentAbove = this.lines.predecessor(prioritySegment, updateFunction);
          const segmentBelow = this.lines.successor(prioritySegment, updateFunction);

          segmentAbove.ifPresent((segA) =>
            segment.intersection(segA.getSegment()).ifPresent((intersectionPoint) => {
              const intersectionNode =
                new IntersectionEvent(intersectionPoint, segment, segA.getSegment());
              this.priority.insert(intersectionNode);
            }));
          segmentBelow.ifPresent((segB) =>
            segment.intersection(segB.getSegment()).ifPresent((intersectionPoint) => {
              const intersectionNode =
                new IntersectionEvent(intersectionPoint, segment, segB.getSegment());
              this.priority.insert(intersectionNode);
            }));
          break;
        case 'RIGHT':
          const endingSegment = event.segment;
          const rightPrioritySegment = PrioritySegment.normalOrder(event.point.y, endingSegment);
          const aboveSegment = this.lines.predecessor(rightPrioritySegment, updateFunction);
          const belowSegment = this.lines.successor(rightPrioritySegment, updateFunction);
          this.lines.delete(rightPrioritySegment, updateFunction);

          aboveSegment.ifPresent((segA) =>
            belowSegment.ifPresent((segB) =>
              segA.getSegment().intersection(segB.getSegment())
                .ifPresent((intersectionPoint) => {
                  const intersectionNode = new IntersectionEvent(
                    intersectionPoint, segB.getSegment(), segA.getSegment());
                  this.priority.insert(intersectionNode);
                })));
          break;
        case 'INTERSECTION':
          const lowerSegment = event.lowerSegment;
          const yCoordinate = event.point.y;
          const lowerPrioritySegment = PrioritySegment.normalOrder(yCoordinate, lowerSegment);

          const upperSegment = event.upperSegment;
          const upperPrioritySegment = PrioritySegment.normalOrder(yCoordinate, upperSegment);

          this.lines.swapPositions(lowerPrioritySegment,
                                   upperPrioritySegment,
                                   (node) => PrioritySegment.reverseOrder(
                                     node.getY(), node.getSegment()));
          const aboveUpperSegment = this.lines.predecessor(lowerPrioritySegment, updateFunction);
          const belowLowerSegment = this.lines.successor(upperPrioritySegment, updateFunction);
          this.lines.delete(lowerPrioritySegment, updateFunction);
          this.lines.delete(upperPrioritySegment, updateFunction);
          aboveUpperSegment.ifPresent((above) =>
            lowerSegment.intersection(above.getSegment())
              .ifPresent((intersectionPoint) => {
                const intersectionNode = new IntersectionEvent(
                  intersectionPoint, lowerSegment, above.getSegment());
                this.priority.insert(intersectionNode);
              }));
          belowLowerSegment.ifPresent((below) =>
            upperSegment.intersection(below.getSegment())
              .ifPresent((intersectionPoint) => {
                const intersectionNode = new IntersectionEvent(
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
