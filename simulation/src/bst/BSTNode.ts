import {BalancableNode} from './BST';

export type BSTTree<T extends BalancableNode> = EmptyTree|BSTNode<T>;

export class EmptyTree {
  kind: 'empty';

  private static emptyTree: EmptyTree = new EmptyTree();

  private constructor() {
    this.kind = 'empty';
  }

  public static getInstance(): EmptyTree {
    return this.emptyTree;
  }

  walkLeft(): EmptyTree {
    return this;
  }

  walkRight(): EmptyTree {
    return this;
  }

  getLevel() {
    return 0;
  }
}

export class BSTNode<T extends BalancableNode> {
  kind: 'node';

  private level: number;
  private left: BSTTree<T>;
  private right: BSTTree<T>;

  nodeInfo: T;

  static leafNodeOf<U extends BalancableNode>(nodeInfo: U, level: number) {
    return new BSTNode(
        nodeInfo, EmptyTree.getInstance(), EmptyTree.getInstance(), level);
  }

  constructor(nodeInfo: T, left: BSTTree<T>, right: BSTTree<T>, level: number) {
    this.kind = 'node';

    this.nodeInfo = nodeInfo;
    this.left = left;
    this.right = right;
    this.level = level;
  }

  setLeft(node: BSTTree<T>): void {
    this.left = node;
  }

  setRight(node: BSTTree<T>): void {
    this.right = node;
  }

  walkLeft(): BSTTree<T> {
    return this.left;
  }

  walkRight(): BSTTree<T> {
    return this.right;
  }

  getPriority(): number {
    return this.nodeInfo.getPriority();
  }

  getLevel() {
    return this.level;
  }

  incrementLevel() {
    this.level += 1;
  }

  decrementLevel() {
    this.level -= 1;
  }

  setLevel(level: number) {
    this.level = level;
  }
}