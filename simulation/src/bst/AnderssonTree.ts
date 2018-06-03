import {BalancableNode, BST} from './BST';
import {BSTNode, BSTTree, EmptyTree} from './BSTNode';

export class AnderssonTree<T extends BalancableNode> implements BST<T> {
  findMax(): T {
    return null;
  }

  peek(): T {
    if (this.root.kind == 'node') {
      return this.root.nodeInfo;
    } else {
      throw new Error('Can\'t peek at the empty tree');
    }
  }

  aboveSegment(node: T): T {
    throw new Error('Method not implemented.');
  }
  belowSegment(node: T): T {
    throw new Error('Method not implemented.');
  }
  swapPositions(node1: T, node2: T): void {
    throw new Error('Method not implemented.');
  }

  private root: BSTTree<T>;

  constructor() {
    this.root = EmptyTree.getInstance();
  }

  insert(node: T): void {
    this.root = this.internalInsert(node, this.root);
  }

  private skew(root: BSTNode<T>): BSTNode<T> {
    if (root.getLevel() != 0 && root.walkLeft().getLevel() == root.getLevel()) {
      const temp = root.walkLeft();

      root.setLeft(temp.walkRight());

      // Must be true based on the if statment, 'empty' has level == 0
      if (temp.kind == 'node') {
        temp.setRight(root);
        root = temp;
      }
    }

    return root;
  }

  print(): void {
    this.printInternal(this.root);
  }

  printInternal(root: BSTTree<T>): void {
    switch (root.kind) {
      case 'empty':
        return;
      case 'node':
        this.printInternal(root.walkLeft());
        console.log(root.nodeInfo, root.getLevel());
        this.printInternal(root.walkRight());
        return;
    }
  }

  private split(root: BSTNode<T>): BSTNode<T> {
    if (root.walkRight().walkRight().getLevel() == root.getLevel() &&
        root.getLevel() != 0) {
      const temp = root.walkRight();

      root.setRight(temp.walkLeft());

      if (temp.kind == 'node') {
        temp.setLeft(root);
        root = temp;
      }

      root.incrementLevel();
    }

    return root;
  }

  private internalInsert(node: T, root: BSTTree<T>): BSTTree<T> {
    if (root.kind == 'empty') {
      return BSTNode.leafNodeOf(node, 1);
    } else {
      if (node.getPriority() < root.getPriority()) {
        root.setLeft(this.internalInsert(node, root.walkLeft()));
      } else {
        root.setRight(this.internalInsert(node, root.walkRight()));
      }

      root = this.skew(root);
      root = this.split(root);
    }

    return root;
  }

  delete(node: T): void {
    this.root = this.deleteInternal(node, this.root);
  }

  deleteInternal(node: T, root: BSTTree<T>): BSTTree<T> {
    if (root.kind == 'node') {
      if (node.equals(root.nodeInfo)) {
        if (root.walkLeft().kind != 'empty' &&
            root.walkRight().kind != 'empty') {
          var heir = root.walkLeft();

          while (heir.walkRight().kind != 'empty') {
            heir = heir.walkRight();
          }

          if (heir.kind == 'node') {
            root.nodeInfo = heir.nodeInfo;
          }

          root.setLeft(this.deleteInternal(root.nodeInfo, root.walkLeft()));
        } else {
          if (root.walkLeft().kind == 'empty') {
            root = root.walkRight();
          } else {
            root = root.walkLeft();
          }
        }
      } else {
        if (node.getPriority() < root.nodeInfo.getPriority()) {
          root.setLeft(this.deleteInternal(node, root.walkLeft()));
        } else {
          root.setRight(this.deleteInternal(node, root.walkRight()));
        }
      }
    }

    if (root.walkLeft().getLevel() < root.getLevel() - 1 ||
        root.walkRight().getLevel() < root.getLevel() - 1) {
      if (root.kind == 'node') {
        root.decrementLevel();
        if (root.walkRight().getLevel() > root.getLevel()) {
          const right = root.walkRight()
          if (right.kind == 'node') {
            right.setLevel(root.getLevel());
          }
        }

        root = this.skew(root);
        root = this.split(root);
      }

      return root;
    }
  }
}