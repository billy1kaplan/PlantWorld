import {BSTNode} from './BSTNode';

export interface BST<T extends BalancableNode> {
  insert(node: T): void;
  delete(node: T): void;
  peek(): T;
  aboveSegment(node: T): T;
  belowSegment(node: T): T;
  swapPositions(node1: T, node2: T): void;
}

export interface BalancableNode {
  getPriority(): number;
  equals(other: BalancableNode): boolean
}