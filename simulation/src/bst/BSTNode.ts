import {BalancableNode} from './BST';

export enum NodeColor {
  BLACK = 'black-node-color',
  RED = 'red-node-color'
}

export enum TreeDirection {
  LEFT = 'left-tree-direction',
  RIGHT = 'right-tree-direction'
}

export function flip(dir: TreeDirection) {
  if (dir == TreeDirection.LEFT) {
    return TreeDirection.RIGHT;
  } else {
    return TreeDirection.LEFT;
  }
}

export type BSTTree<T extends BalancableNode> = EmptyTree|BSTNode<T>;

export class EmptyTree {
  kind: 'empty';
  height: number;
  nodeColor: NodeColor;

  private static emptyTree: EmptyTree = new EmptyTree();

  private constructor() {
    this.height = 0;
    this.nodeColor = NodeColor.BLACK;
  }

  public static getInstance(): EmptyTree {
    return this.emptyTree;
  }

  walk(dir: TreeDirection): EmptyTree {
    return this;
  }

  isRed() {
    return this.nodeColor == NodeColor.RED;
  }

  paintRed(): void {
    this.nodeColor = NodeColor.RED;
  }

  paintBlack(): void {
    this.nodeColor = NodeColor.BLACK;
  }

  getHeight() {
    return this.height;
  }

  getBalance(): number {
    return 0;
  }
}

export class BSTNode<T extends BalancableNode> {
  kind: 'node';
  nodeColor: NodeColor;

  nodeInfo: T;
  left: BSTTree<T>;
  right: BSTTree<T>;

  static leafNode<U extends BalancableNode>(nodeInfo: U) {
    return new BSTNode(
        nodeInfo, EmptyTree.getInstance(), EmptyTree.getInstance());
  }

  constructor(nodeInfo: T, left: BSTTree<T>, right: BSTTree<T>) {
    this.nodeInfo = nodeInfo;
    this.left = left;
    this.right = right;
  }

  walk(dir: TreeDirection): BSTTree<T> {
    if (dir == TreeDirection.LEFT) {
      return this.left;
    } else {
      return this.right;
    }
  }

  walkSet(dir: TreeDirection, node: BSTTree<T>): void {
    if (dir == TreeDirection.LEFT) {
      this.left = node;
    } else {
      this.right = node;
    }
  }

  isRed() {
    return this.nodeColor == NodeColor.RED;
  }

  paintRed(): void {
    this.nodeColor = NodeColor.RED;
  }

  paintBlack(): void {
    this.nodeColor = NodeColor.BLACK;
  }

  getPriority(): number {
    return this.nodeInfo.getPriority();
  }

  equals(other: BalancableNode): boolean {
    return this.nodeInfo.equals(other);
  }

  getHeight() {
    return 1 + Math.max(this.left.getHeight(), this.right.getHeight());
  }

  getBalance(): number {
    return this.left.getHeight() - this.right.getHeight();
  }
}