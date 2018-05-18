import {Optional} from 'Optional';

import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';
import {Sun} from '../world/Sun';

import {Doodle} from './Doodle';
import {IDoodleGenome} from './DoodleGenome';
import {DoodleNode, IDoodleNode, INodeMakeUp} from './DoodleNode';
import {DoodlePart} from './DoodlePart';
import {DoodleSegment, IDoodleSegment} from './DoodleSegment';

export class UnidirectionalStem implements IDoodleSegment {
  private fixedNode: DoodleNode;
  private freeNode: DoodleNode;

  private lineSegment: LineSegment;
  private geneticMakeup: IDoodleGenome;

  constructor(
      fixedNode: DoodleNode, lineSegment: LineSegment, freeNode: DoodleNode) {
    this.fixedNode = fixedNode;
    this.freeNode = freeNode;
  }

  grow(): DoodlePart {
    this.geneticMakeup.differentiate(this.freeNode);
    const newFreeNode = this.geneticMakeup.differentiate(this.freeNode);
    return new UnidirectionalStem(
        this.fixedNode, this.lineSegment, newFreeNode);
  }

  print(): void {
    console.log(this);
  }

  update(visible: LineSegment[]): void {
    throw new Error('Method not implemented.');
  }

  children() {
    return [];
  }

  collectEnergy(sun: Sun): void {
    throw new Error('Method not implemented.');
  }
}