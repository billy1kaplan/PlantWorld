import {BalancableNode, BST} from './BST';
import {BSTNode, BSTTree, EmptyTree, flip, NodeColor, TreeDirection} from './BSTNode';

export class AVLTree<T extends BalancableNode> implements BST<T> {
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

  private root: BSTTree<T>;

  constructor() {
    this.root = EmptyTree.getInstance();
  }

  insert(node: T): void {
    this.internalInsert(node, this.root);
  }

  private singleRotate(treeNode: BSTNode<T>, dir: TreeDirection) {
    const temp = treeNode.walk(flip(dir));

    treeNode.walkSet(flip(dir), temp.walk(dir));
    if (temp.kind == 'node') {
      temp.walkSet(dir, treeNode);
    }

    treeNode.paintRed();
    temp.paintBlack();

    return temp;
  }

  private doubleRotate(treeNode: BSTNode<T>, dir: TreeDirection) {
    treeNode.walkSet(
        flip(dir), this.singleRotate(treeNode.walk(flip(dir)), flip(dir)));

    return this.singleRotate(treeNode, dir);
  }

  private rightRotate(treeNode: BSTNode<T>) {}

  private internalInsert(node: T, treeNode: BSTTree<T>): BSTTree<T> {
    switch (treeNode.kind) {
      case 'empty':
        return BSTNode.leafNode<T>(node);
      case 'node':
        if (node.getPriority() > treeNode.getPriority()) {
          treeNode.right = this.internalInsert(node, treeNode.right);

          if (treeNode.right.isRed()) {
            if (treeNode.left.isRed()) {
              treeNode.paintRed();
              treeNode.left.paintBlack();
              treeNode.right.paintBlack();
            } else {
              const leftChild = treeNode.left;

              switch (leftChild.kind) {
                case 'empty':
                  throw new Error('Unexpected empty node');
                case 'node':
                  if (leftChild.left.isRed()) {
                    treeNode =
                  }
              }
            }
          } else {
            treeNode.left = this.internalInsert(node, treeNode.left);
          }
          return treeNode;
        }
    }
  }
}