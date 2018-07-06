import {BSTNode} from './BSTNode';
import {EmptyTree} from './EmptyTree';
import { IBalanceableNode } from '../IBalanceableNode';

export type BSTTree<T extends IBalanceableNode<T>> = EmptyTree<T>|BSTNode<T>;
