import {Point} from '../elements/primitives/Point';

export class IDoodleNode {}

export interface INodeMakeUp {}

export class DoodleNode {
  private point: Point;
  constructor(point: Point) {
    this.point = point;
  }

  getMakeUp(): INodeMakeUp {
    return null;
  }
}