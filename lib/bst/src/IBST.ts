import {Optional} from 'Optional';
import { IBalanceableNode } from './IBalanceableNode';

export interface IBST<T extends IBalanceableNode<T>> {
  isEmpty(): boolean;
  size(): number;
  insert(node: IBalanceableNode<T>): void;
  findMax(): Optional<IBalanceableNode<T>>;
  contains(node: IBalanceableNode<T>): boolean;
  delete(node: IBalanceableNode<T>): void;
  predecessor(node: IBalanceableNode<T>): Optional<IBalanceableNode<T>>;
  successor(node: IBalanceableNode<T>): Optional<IBalanceableNode<T>>;
  swapPositions(node1: IBalanceableNode<T>, node2: IBalanceableNode<T>): void;
}
