import { IBalanceableNode } from '../IBalanceableNode';
import { TreeDirection } from '../TreeDirection';
import { BSTTree } from './BSTTree';
import { EmptyTree } from './EmptyTree';

export class BSTNode<T extends IBalanceableNode> {
  public static leafNodeOf<U extends IBalanceableNode>(nodeInfo: U, level: number) {
    return new BSTNode(
        nodeInfo, EmptyTree.instance(), EmptyTree.instance(), level);
  }

  public kind: 'node';
  public nodeInfo: T;

  private level: number;
  private left: BSTTree<T>;
  private right: BSTTree<T>;

  constructor(nodeInfo: T, left: BSTTree<T>, right: BSTTree<T>, level: number) {
    this.kind = 'node';

    this.nodeInfo = nodeInfo;
    this.left = left;
    this.right = right;
    this.level = level;
  }

  public setNodeInfo(nodeInfo: T) {
    this.nodeInfo = nodeInfo;
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

  public getPriority(): number {
    return this.nodeInfo.getPriority();
  }

  public getLevel() {
    return this.level;
  }

  public incrementLevel() {
    this.level += 1;
  }

  public decrementLevel() {
    this.level -= 1;
  }

  public setLevel(level: number) {
    this.level = level;
  }

  public walk(direction: TreeDirection) {
    if (direction === TreeDirection.LEFT) {
      return this.walkLeft();
    } else {
      return this.walkRight();
    }
  }

  public set(node: BSTTree<T>, direction: TreeDirection) {
    if (direction === TreeDirection.LEFT) {
      node.setLeft(node);
      return;
    } else {
      node.setRight(node);
      return;
    }
  }

  public getNodeInfo(): T {
    return this.nodeInfo;
  }
}
