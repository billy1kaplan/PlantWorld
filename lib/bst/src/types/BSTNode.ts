import {IBalancableNode} from '../BalancableNode';

import {EmptyTree} from './EmptyTree';
import {BSTTree} from './TreeType';

export class BSTNode<T extends IBalancableNode> {
  public static leafNodeOf<U extends IBalancableNode>(nodeInfo: U, level: number) {
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
}
