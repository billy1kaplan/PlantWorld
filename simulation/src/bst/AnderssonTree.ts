import {Optional} from 'Optional';

import {BalancableNode, BST} from './BST';
import {BSTNode, BSTTree, EmptyTree} from './BSTNode';

// Reference:
// http://www.eternallyconfuzzled.com/tuts/datastructures/jsw_tut_andersson.aspx
export class AnderssonTree<T extends BalancableNode> implements BST<T> {
  findMax(): T {
    return this.findMaxInternal(this.root);
  }

  private findMaxInternal(root: BSTTree<T>): T {
    if (root.kind == 'empty') {
      throw new Error('No max of empty tree');
    } else {
      if (root.walkRight().kind == 'node') {
        return this.findMaxInternal(root.walkRight());
      } else {
        return root.nodeInfo;
      }
    }
  }

  peek(): T {
    if (this.root.kind == 'node') {
      return this.root.nodeInfo;
    } else {
      throw new Error('Can\'t peek at the empty tree');
    }
  }

  private findPredecessor(node: T, root) {}

  private find(node: T, root: BSTTree<T>): Optional<BSTTree<T>> {
    switch (root.kind) {
      case 'empty':
        return Optional.empty();
      case 'node':
        if (node.equals(root.nodeInfo)) {
          return Optional.of(root)
        } else if (node.getPriority() < root.getPriority()) {
          return this.find(node, root.walkLeft());
        } else {
          return this.find(node, root.walkRight());
        }
    }
  }
  // Use optional
  aboveSegment(node: T): Optional<T> {
    const nodeLoc = this.find(node, this.root);

    return nodeLoc.flatMap(loc => {
      var curLoc = loc.walkRight();

      while (curLoc.walkLeft().kind != 'empty') {
        curLoc = curLoc.walkLeft();
      }

      if (curLoc.kind == 'node') {
        return Optional.of(curLoc.nodeInfo);
      } else {
        return Optional.empty();
      }
    });
  }

  belowSegment(node: T): Optional<T> {
    const nodeLoc = this.find(node, this.root);

    return nodeLoc.flatMap(loc => {
      var curLoc = loc.walkLeft();

      if (curLoc.kind == 'empty') {
        var loc = this.root;
        var pred: Optional<T> = Optional.empty();
        while (loc.kind == 'node' && !loc.nodeInfo.equals(node)) {
          if (loc.getPriority() < node.getPriority() &&
              (!pred.isPresent() ||
               pred.getOrError().getPriority() < loc.getPriority())) {
            pred = Optional.of(loc.nodeInfo);
          }

          if (node.getPriority() < loc.nodeInfo.getPriority()) {
            loc = loc.walkLeft();
          } else {
            loc = loc.walkRight();
          }
        }
        return pred;
      } else {
        while (curLoc.walkRight().kind != 'empty') {
          curLoc = curLoc.walkRight();
        }

        if (curLoc.kind == 'node') {
          return Optional.of(curLoc.nodeInfo);
        } else {
          return Optional.empty();
        }
      }
    });
  }

  swapPositions(node1: T, node2: T): void {
    if (!(node1.getPriority() === node2.getPriority())) {
      return;
    }

    const bstNode1 = this.find(node1, this.root);
    const bstNode2 = this.find(node2, this.root);
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
    }
    return root;
  }
}