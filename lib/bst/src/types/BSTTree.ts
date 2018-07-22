import { IBalanceableNode } from '../IBalanceableNode';
import { BSTNode } from './BSTNode';
import { EmptyNode } from './EmptyTree';

export type BSTTree<T extends IBalanceableNode> = EmptyNode<T>|BSTNode<T>;
