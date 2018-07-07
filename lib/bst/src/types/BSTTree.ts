import { IBalanceableNode } from '../IBalanceableNode';
import { BSTNode } from './BSTNode';
import { EmptyTree } from './EmptyTree';

export type BSTTree<T extends IBalanceableNode> = EmptyTree<T>|BSTNode<T>;
