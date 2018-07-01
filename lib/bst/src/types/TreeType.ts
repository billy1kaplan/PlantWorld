import {IBalancableNode} from '../BalancableNode';
import {BSTNode} from './BSTNode';
import {EmptyTree} from './EmptyTree';

export type BSTTree<T extends IBalancableNode> = EmptyTree|BSTNode<T>;
