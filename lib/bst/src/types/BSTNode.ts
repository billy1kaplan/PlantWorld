import { IBalanceableNode } from '../IBalanceableNode';
import { TreeDirection } from '../TreeDirection';
import { BSTTree } from './BSTTree';
import { EmptyNode } from './EmptyTree';

/**
 * A BST node with the given node information.
 *
 * Contains two child nodes with the BST property that all
 * left nodes are comparatively less than this node and all
 * right nodes are comparatively more than this node.
 */
export class BSTNode<T extends IBalanceableNode> {
  public static leafNodeOf<U extends IBalanceableNode>(nodeInfo: U, level: number) {
    return new BSTNode(nodeInfo, level, EmptyNode.instance(), EmptyNode.instance());
  }

  public static constructBSTNode<U extends IBalanceableNode>(
      nodeInfo: U, level: number, left: BSTTree<U>, right: BSTTree<U>) {
    return new BSTNode(nodeInfo, level, left, right);
  }

  public kind: 'node';

  public nodeInfo: T;
  private level: number;

  private left: BSTTree<T>;
  private right: BSTTree<T>;

  private constructor(nodeInfo: T, level: number, left: BSTTree<T>, right: BSTTree<T>) {
    this.nodeInfo = nodeInfo;
    this.level = level;
    this.left = left;
    this.right = right;
    this.kind = 'node';
  }

  public setLeft(node: BSTTree<T>): void {
    this.left = node;
  }

  public setRight(node: BSTTree<T>): void {
    this.right = node;
  }

  public walkLeft(): BSTTree<T> {
    return this.left;
  }

  public walkRight(): BSTTree<T> {
    return this.right;
  }

  public compareTo(other: BSTTree<T>): number {
    if (other.kind === 'empty') {
      return 1;
    } else {
      return this.nodeInfo.compareTo(other.nodeInfo);
    }
  }

  public getLevel() {
    return this.level;
  }

  /**
   * Increments this BSTNode's level by 1.
   */
  public incrementLevel() {
    this.level += 1;
  }

  /**
   * Decrements this BSTNode's level by 1.
   */
  public decrementLevel() {
    this.level -= 1;
  }

  /**
   * Mutates the level of the specified BSTNode.
   * @param level new value to update to
   */
  public setLevel(level: number) {
    this.level = level;
  }

  /**
   * Walks to one of the child nodes in the specified direction.
   * @param direction to traverse the node in
   */
  public walk(direction: TreeDirection) {
    if (direction === TreeDirection.LEFT) {
      return this.walkLeft();
    } else {
      return this.walkRight();
    }
  }

  /**
   * Mutates the node information contained by this BSTNode.
   * @param nodeInfo node information for the BST to contain
   */
  public setNodeInfo(nodeInfo: T): void {
    this.nodeInfo = nodeInfo;
  }

  /**
   * Mutates one of the two child BST nodes in the direction specified.
   * @param node the node to update the tree with
   * @param direction the direction to update
   */
  public set(node: BSTTree<T>, direction: TreeDirection): void {
    if (direction === TreeDirection.LEFT) {
      this.left = node;
    } else {
      this.right = node;
    }
  }
}
