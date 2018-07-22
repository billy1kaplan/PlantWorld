import {IBalanceableNode} from '../IBalanceableNode';
import {TreeDirection} from '../TreeDirection';
import {BSTTree} from './BSTTree';
import { BSTNode } from './BSTNode';

export class BreadCrumb<T extends IBalanceableNode> {
  constructor(public direction: TreeDirection, public root: BSTNode<T>, public untaken: BSTTree<T>) { }
}
