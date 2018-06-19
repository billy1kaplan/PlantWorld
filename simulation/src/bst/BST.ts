import {Optional} from 'Optional';

export interface BST<T extends BalancableNode> {
  insert(node: T): void;
  delete(node: T): void;
  peek(): T;
  aboveSegment(node: T): Optional<T>;
  belowSegment(node: T): Optional<T>;
  swapPositions(node1: T, node2: T): void;
}

export interface BalancableNode {
  getPriority(): number;
  equals(other: BalancableNode): boolean
}