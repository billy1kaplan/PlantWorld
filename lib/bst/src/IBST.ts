import {Optional} from 'Optional';
import { IBalancableNode } from './BalancableNode';

export interface IBST<T extends IBalancableNode> {
  isEmpty(): boolean;
  insert(node: T): void;
  findMax(): Optional<T>;
  find(node: T): boolean;
  delete(node: T): void;
  aboveSegment(node: T): Optional<T>;
  belowSegment(node: T): Optional<T>;
  swapPositions(node1: T, node2: T): void;
}
