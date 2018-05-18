import {DoodleNode} from './DoodleNode';
import {DoodlePart} from './DoodlePart';
import {IDoodleSegment} from './DoodleSegment';

export interface IDoodleGenome {
  differentiate: (parentNodes: DoodleNode) => DoodleNode;
  differentiateMany: (parent: DoodleNode[]) => DoodleNode;
  differentiatePart: (part: DoodlePart) => DoodlePart;
}

export class DoodleGenome implements IDoodleGenome {
  differentiate: (parentNodes: DoodleNode) => DoodleNode;
  differentiateMany: (parent: DoodleNode[]) => DoodleNode;
  differentiatePart: (part: DoodlePart) => DoodlePart;
}