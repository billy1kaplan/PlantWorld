import { IBalanceableNode } from '../IBalanceableNode';
import { TreeDirection } from '../TreeDirection';

import { BSTTree } from './BSTTree';

/**
 * An empty tree node.
 */
export class EmptyNode<T extends IBalanceableNode> {
  public static instance(): EmptyNode<any> {
    return this.emptyTree;
  }

  private static emptyTree: EmptyNode<any> = new EmptyNode();

  public kind: 'empty';

  private constructor() {
    this.kind = 'empty';
  }

  public walkLeft(): EmptyNode<T> {
    return this;
  }

  public walkRight(): EmptyNode<T> {
    return this;
  }

  public getLevel() {
    return 0;
  }

  public walk(direction: TreeDirection) {
    return EmptyNode.emptyTree;
  }

  /*
  public setLeft(node: BSTTree<T>): void { return undefined; }

  public setRight(node: BSTTree<T>): void { return undefined; }

  public set(node: BSTTree<T>, direction: TreeDirection) { return undefined; }

  public setNodeInfo(nodeInfo: IBalanceableNode): void { return undefined; }

  public setLevel(n: number) { return undefined; }

  public incrementLevel() { return undefined; }
  */
}
