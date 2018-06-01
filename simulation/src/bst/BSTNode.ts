import {BalancableNode} from './BST';

export class BSTNode<T extends BalancableNode> implements BalancableNode {
  height: number;
  left: BSTNode<T>;
  right: BSTNode<T>;

  nodeInfo: T;

  constructor(nodeInfo: T) {
    this.height = 1;
    this.nodeInfo = nodeInfo;
  }

  getPriority(): number {
    return this.nodeInfo.getPriority();
  }

  equals(other: BalancableNode): boolean {
    return this.nodeInfo.equals(other);
  }
}