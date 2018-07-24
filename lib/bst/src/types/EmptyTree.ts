import { IBalanceableNode } from '../IBalanceableNode';
import { TreeDirection } from '../TreeDirection';

/**
 * An empty tree node used to terminate a path in the BST.
 * Attempting to walk past the empty node leads to a land of
 * infinite other empty nodes.
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

  /**
   * Simulates walking left to another empty node.
   */
  public walkLeft(): EmptyNode<T> {
    return this;
  }

  /**
   * Simulates walking right to another empty node.
   */
  public walkRight(): EmptyNode<T> {
    return this;
  }

  public getLevel() {
    return 0;
  }

  /**
   * Simulates walking in the specified direction.
   * @param direction to walk in
   */
  public walk(direction: TreeDirection) {
    return EmptyNode.emptyTree;
  }
}
