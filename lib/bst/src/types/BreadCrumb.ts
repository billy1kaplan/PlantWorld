import {IBalanceableNode} from '../IBalanceableNode';
import {TreeDirection} from '../TreeDirection';
import {BSTTree} from './BSTTree';

export class BreadCrumb<T extends IBalanceableNode> {
  constructor(public direction: TreeDirection, public root: BSTTree<T>, public untaken: BSTTree<T>) { }
}
