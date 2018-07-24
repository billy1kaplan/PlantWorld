import { IBalanceableNode } from '../IBalanceableNode';
import { TreeDirection } from '../TreeDirection';
import { BSTNode } from './BSTNode';
import { BSTTree } from './BSTTree';

/**
 * A trail of breadcrumbs leading to a given node in the BST.
 * Contains information on the path taken and the unwalked nodes.
 */
export class BreadCrumb<T extends IBalanceableNode> {
  constructor(public direction: TreeDirection, public root: BSTNode<T>, public untaken: BSTTree<T>) { }
}
