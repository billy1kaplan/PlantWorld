import { IBalanceableNode } from '../IBalanceableNode';
import { MinimumNode } from '../MinimumNode';
import { TreeDirection } from '../TreeDirection';

import { BSTTree } from './BSTTree';

export class EmptyTree<T extends IBalanceableNode> {
  public static instance(): EmptyTree<any> {
    return this.emptyTree;
  }

  private static emptyTree: EmptyTree<any> = new EmptyTree();

  public kind: 'empty';

  private constructor() {
    this.kind = 'empty';
  }

  public walkLeft(): EmptyTree<T> {
    return this;
  }

  public walkRight(): EmptyTree<T> {
    return this;
  }

  public getLevel() {
    return 0;
  }

  public walk() {
    return EmptyTree.emptyTree;
  }

  public setLeft(node: BSTTree<T>): void { return undefined; }

  public setRight(node: BSTTree<T>): void { return undefined; }

  public set(node: BSTTree<T>, direction: TreeDirection) { return undefined; }

  public getNodeInfo(): T {
    return undefined;
  }

  public setNodeInfo(nodeInfo: IBalanceableNode): void { return undefined; }

  public setLevel(n: number) { return undefined; }

  public incrementLevel() { return undefined; }
}
