import { TreeDirection } from "../TreeDirection";
import { IBalanceableNode } from "../IBalanceableNode";
import { BSTTree } from "./BSTTree";
import { MinimumNode } from "../MinimumNode";

export class EmptyTree<T extends IBalanceableNode<T>> {
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

  public setLeft(node: BSTTree<T>): void {}

  public setRight(node: BSTTree<T>): void {}

  public set(node: BSTTree<T>, direction: TreeDirection) {}

  public getNodeInfo(): IBalanceableNode<T> {
    return MinimumNode.getInstance();
  }

  public setNodeInfo(nodeInfo: IBalanceableNode<T>): void {}

  public setLevel(n: number) {}
  
  public incrementLevel() {}
}
