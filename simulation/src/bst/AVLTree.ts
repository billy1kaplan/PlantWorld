import {BalancableNode, BST} from './BST';
import {BSTNode} from './BSTNode';

export class AVLTree<T extends BalancableNode> implements BST<T> {
  private root: BSTNode<T> = null;

  insert(node: T): void {
    this.internalInsert(node, this.root)
  }

  private nodeHeight(node: BSTNode<T>) {
    if (node == null) {
      return 0;
    }

    return node.height;
  }

  private internalInsert(node: T, treeNode: BSTNode<T>) {
    if (treeNode == null) {
      treeNode = new BSTNode(node);
      return;
    }

    if (node.getPriority() >= treeNode.getPriority()) {
      this.internalInsert(node, treeNode.left);
    } else {
      this.internalInsert(node, treeNode.right);
    }

    treeNode.height = 1 +
        Math.max(
            this.nodeHeight(treeNode.left), this.nodeHeight(treeNode.right));
  }

  delete(node: T): void {
    throw new Error('Method not implemented.');
  }
  peek(): T {
    throw new Error('Method not implemented.');
  }
  aboveSegment(node: T): T {
    throw new Error('Method not implemented.');
  }
  belowSegment(node: T): T {
    throw new Error('Method not implemented.');
  }
  swapPositions(node1: T, node2: T): void {
    throw new Error('Method not implemented.');
  }
}