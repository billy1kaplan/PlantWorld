import { Optional } from 'Optional';
import { IBalanceableNode } from '../IBalanceableNode';
import { IBST } from '../IBST';
import { TreeDirection } from '../TreeDirection';
import { BreadCrumb } from './BreadCrumb';
import { BSTNode } from './BSTNode';
import { BSTTree } from './BSTTree';

import { EmptyNode } from './EmptyTree';
import { Pair } from './Pair';
/**
 * Reference:
 * http://www.eternallyconfuzzled.com/tuts/datastructures/jsw_tut_andersson.aspx
 *
 * A self-balancing binary search tree with variable range nodes.
 */
export class AnderssonTree<T extends IBalanceableNode> implements IBST<T> {
  public root: BSTTree<T>;
  private numElements: number;

  public constructor() {
    this.root = EmptyNode.instance();
    this.numElements = 0;
  }

  public isEmpty(): boolean {
    return this.numElements === 0;
  }

  public size(): number {
    return this.numElements;
  }

  public insert(node: T, nodeAdjuster: (node: T) => T): void {
    this.root = this.internalInsert(node, this.root, nodeAdjuster);
  }

  public findMax(): Optional<T> {
    return this.findMaxInternal(this.root);
  }

  public contains(node: T, nodeAdjuster: (node: T) => T): boolean {
    return this.findInternal(node, this.root, nodeAdjuster).isPresent();
  }

  public delete(node: T, nodeAdjuster: (node: T) => T): void {
    this.root = this.deleteInternal(node, this.root, nodeAdjuster);
  }

  public predecessor(node: T, nodeAdjuster: (node: T) => T): Optional<T> {
    return this.adjacent(node, TreeDirection.LEFT, nodeAdjuster);
  }

  public successor(node: T, nodeAdjuster: (node: T) => T): Optional<T> {
    return this.adjacent(node, TreeDirection.RIGHT, nodeAdjuster);
  }

  public swapPositions(node1: T, node2: T, nodeAdjuster: (node: T) => T): void {
    const bstNode1 = this.findInternal(node1, this.root, nodeAdjuster);
    const bstNode2 = this.findInternal(node2, this.root, nodeAdjuster);
    bstNode1.ifPresent((foundNode1) => {
      bstNode2.ifPresent((foundNode2) => {
        foundNode1.setNodeInfo(node2);
        foundNode2.setNodeInfo(node1);
      });
    });
  }

  public skew(root: BSTNode<T>): BSTTree<T> {
    if (root.getLevel() !== 0
      && root.walkLeft().getLevel() === root.getLevel()) {
      const temp = root.walkLeft();

      root.setLeft(temp.walkRight());

      if (temp.kind === 'node') {
        temp.setRight(root);
        root = temp;
      }
    }

    return root;
  }

  public split(root: BSTNode<T>): BSTTree<T> {
    if (root.walkRight().walkRight().getLevel() === root.getLevel() &&
      root.getLevel() !== 0) {
      const temp = root.walkRight();

      root.setRight(temp.walkLeft());

      if (temp.kind === 'node') {
        temp.setLeft(root);
        root = temp;
      }

      root.incrementLevel();
    }

    return root;
  }

  private internalInsert(node: T, root: BSTTree<T>, nodeAdjuster: (node: T) => T): BSTTree<T> {
    if (root.kind === 'empty') {
      this.numElements += 1;
      return BSTNode.leafNodeOf(node, 1);
    } else {
      const nodeInfo = root.nodeInfo;
      if (node.equals(nodeInfo)) {
        return root;
      } else if (nodeAdjuster(node).compareTo(nodeAdjuster(root.nodeInfo)) < 0) {
        root.setLeft(this.internalInsert(node, root.walkLeft(), nodeAdjuster));
      } else {
        root.setRight(this.internalInsert(node, root.walkRight(), nodeAdjuster));
      }

      root = this.skew(root);
      if (root.kind === 'node') {
        root = this.split(root);
      }
    }

    return root;
  }

  private findMaxInternal(root: BSTTree<T>): Optional<T> {
    if (root.kind === 'empty') {
      return Optional.empty();
    } else {
      let cur: BSTNode<T> = root;
      while (cur.walkRight().kind === 'node') {
        // We've just made sure we can walk right, so we can make this assertion
        // safely.
        cur = cur.walkRight() as BSTNode<T>;
      }
      return Optional.of(cur.nodeInfo);
    }
  }

  private findInternal(node: T, root: BSTTree<T>, nodeAdjuster: (node: T) => T): Optional<BSTNode<T>> {
    switch (root.kind) {
      case 'empty':
        return Optional.empty();
      case 'node':
        if (node.equals(root.nodeInfo)) {
          return Optional.of(root);
        } else if (nodeAdjuster(node).compareTo(nodeAdjuster(root.nodeInfo)) < 0) {
          return this.findInternal(node, root.walkLeft(), nodeAdjuster);
        } else {
          return this.findInternal(node, root.walkRight(), nodeAdjuster);
        }
    }
  }

  private deleteInternal(node: T, root: BSTTree<T>, nodeAdjuster: (node: T) => T): BSTTree<T> {
    if (root.kind === 'node') {
      if (node.equals(root.nodeInfo)) {
        this.numElements--;
        let heir: BSTTree<T>;
        if (root.walkLeft().kind !== 'empty' &&
          root.walkRight().kind !== 'empty') {
          heir = root.walkLeft();

          while (heir.walkRight().kind !== 'empty') {
            heir = heir.walkRight();
          }
          root.setNodeInfo((heir as BSTNode<T>).nodeInfo);
          root.setLeft(this.deleteInternal(root.nodeInfo, root.walkLeft(), nodeAdjuster));
        } else {
          if (root.walkLeft().kind === 'empty') {
            root = root.walkRight();
          } else {
            root = root.walkLeft();
          }
        }
      } else if (nodeAdjuster(node).compareTo(nodeAdjuster(root.nodeInfo)) < 0) {
        root.setLeft(this.deleteInternal(node, root.walkLeft(), nodeAdjuster));
      } else {
        root.setRight(this.deleteInternal(node, root.walkRight(), nodeAdjuster));
      }
    }

    if (root.walkLeft().getLevel() < root.getLevel() - 1 ||
      root.walkRight().getLevel() < root.getLevel() - 1) {
      if (root.kind === 'node') {
        root.decrementLevel();
        if (root.walkRight().getLevel() > root.getLevel()) {
          // Empty nodes have the lowest level, this will only be hit with BSTNodes
          const right = root.walkRight() as BSTNode<T>;
          right.setLevel(root.getLevel());
        }

        root = this.skew(root) as BSTNode<T>;
        root = this.split(root);
      }
    }
    return root;
  }

  private adjacent(node: T, adjacentLocation: TreeDirection, nodeAdjuster: (node: T) => T): Optional<T> {
    const nodeLocWithContext = this.findWithCrumbs(node, this.root, [], nodeAdjuster);

    return nodeLocWithContext.flatMap((loc) => {
      const curRoot = loc.fst;

      if (curRoot.walk(adjacentLocation).kind !== 'empty') {
        let curLoc: BSTNode<T> = curRoot.walk(adjacentLocation) as BSTNode<T>;
        while (curLoc.walk(adjacentLocation.flip()).kind !== 'empty') {
          curLoc = curLoc.walk(adjacentLocation.flip()) as BSTNode<T>;
        }
        return Optional.of(curLoc.nodeInfo);
      } else {
        const crumbs = loc.snd;
        if (crumbs.length === 0
          || crumbs[0].direction === adjacentLocation) {
          return Optional.empty();
        } else {
          return Optional.of(crumbs[0].root.nodeInfo);
        }
      }
    });
  }

  private findWithCrumbs(
      node: T, root: BSTTree<T>, breadcrumbs: Array<BreadCrumb<T>>,
      nodeAdjuster: (nodeAdjuster: T) => T):
      Optional<Pair<BSTTree<T>, Array<BreadCrumb<T>>>> {
    switch (root.kind) {
      case 'empty':
        return Optional.empty();
      case 'node':
        if (node.equals(root.nodeInfo)) {
          return Optional.of(new Pair(root, breadcrumbs));
        } else if (node.compareTo(root.nodeInfo) < 0) {
          return this.findWithCrumbs(node, root.walkLeft(),
            [new BreadCrumb(TreeDirection.LEFT, root, root.walkRight()), ...breadcrumbs], nodeAdjuster);
        } else {
          return this.findWithCrumbs(node, root.walkRight(),
            [new BreadCrumb(TreeDirection.RIGHT, root, root.walkLeft()), ...breadcrumbs], nodeAdjuster);
        }
    }
  }
}
