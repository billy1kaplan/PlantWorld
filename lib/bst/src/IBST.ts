import {Optional} from 'Optional';
import { IBalancableNode } from './BalancableNode';

export interface IBST<T extends IBalancableNode> {
  isEmpty(): boolean;
  size(): number;
  insert(node: T): void;
  findMax(): Optional<T>;
  contains(node: T): boolean;
  delete(node: T): void;
  predecessor(node: T): Optional<T>;
  successor(node: T): Optional<T>;
  swapPositions(node1: T, node2: T): void;
}
