import { Optional } from 'Optional';
import { IBalanceableNode } from '../IBalanceableNode';
import { IBST } from '../IBST';
import { TreeDirection } from '../TreeDirection';
import { BreadCrumb } from './BreadCrumb';
import { BSTNode } from './BSTNode';
import { BSTTree } from './BSTTree';

import { EmptyTree } from './EmptyTree';
import { Pair } from './Pair';

// Reference:
// http://www.eternallyconfuzzled.com/tuts/datastructures/jsw_tut_andersson.aspx
export class AnderssonTree<T extends IBalanceableNode> implements IBST<T> {
  private root: BSTTree<T>;
  private numElements: number;

  public constructor() {
    this.root = EmptyTree.instance();
    this.numElements = 0;
  }

  public isEmpty(): boolean {
    return this.numElements === 0;
  }

  public size(): number {
    return this.numElements;
  }

  public insert(node: T): void {
    this.root = this.internalInsert(node, this.root);
  }

  public findMax(): Optional<T> {
    return this.findMaxInternal(this.root);
  }

  public contains(node: T): boolean {
    return this.findInternal(node, this.root).isPresent();
  }

  public delete(node: T): void {
    this.root = this.deleteInternal(node, this.root);
  }

  public predecessor(node: T): Optional<T> {
    const nodeLocWithContext = this.findWithCrumbs(node, this.root, []);

    return nodeLocWithContext.flatMap((loc) => {
      const curRoot = loc.fst;

      if (curRoot.walkLeft().kind !== 'empty') {
        let curLoc = curRoot.walkLeft();
        while (curLoc.walkRight().kind !== 'empty') {
          curLoc = curLoc.walkRight();
        }
        return Optional.of(curLoc.getNodeInfo());
      } else {
        const crumbs = loc.snd;
        if (crumbs.length === 0 || crumbs[0].direction === TreeDirection.LEFT) {
          return Optional.empty();
        } else {
          return Optional.of(crumbs[0].root.getNodeInfo());
        }
      }
    });
  }

  public successor(node: T): Optional<T> {
    const nodeLocWithContext = this.findWithCrumbs(node, this.root, []);

    return nodeLocWithContext.flatMap((loc) => {
      const curRoot = loc.fst;

      if (curRoot.walkRight().kind !== 'empty') {
        let curLoc = curRoot.walkRight();
        while (curLoc.walkLeft().kind !== 'empty') {
          curLoc = curLoc.walkLeft();
        }
        return Optional.of(curLoc.getNodeInfo());
      } else {
        const crumbs = loc.snd;
        if (crumbs.length === 0 || crumbs[0].direction === TreeDirection.RIGHT) {
          return Optional.empty();
        } else {
          return Optional.of(crumbs[0].root.getNodeInfo());
        }
      }
    });
  }

  public swapPositions(node1: T, node2: T): void {
    if (!(node1.getPriority() === node2.getPriority())) {
      return;
    }

    const bstNode1 = this.findInternal(node1, this.root);
    const bstNode2 = this.findInternal(node2, this.root);

    bstNode1.ifPresent((foundNode1) => {
      bstNode2.ifPresent((foundNode2) => {
        if (foundNode1.kind === 'node' && foundNode2.kind === 'node') {
          foundNode1.setNodeInfo(node2);
          foundNode2.setNodeInfo(node1);
        }
      });
    });
  }

  private internalInsert(node: T, root: BSTTree<T>): BSTTree<T> {
    if (root.kind === 'empty') {
      this.numElements += 1;
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

  private deleteInternal(node: T, root: BSTTree<T>): BSTTree<T> {
    if (root.kind === 'node') {
      if (node.equals(root.getNodeInfo())) {
        this.numElements--;
        if (root.walkLeft().kind !== 'empty' &&
          root.walkRight().kind !== 'empty') {
          let heir = root.walkLeft();

          while (heir.walkRight().kind !== 'empty') {
            heir = heir.walkRight();
          }

          root.setNodeInfo(heir.getNodeInfo());

          root.setLeft(this.deleteInternal(root.getNodeInfo(), root.walkLeft()));
        } else {
          if (root.walkLeft().kind === 'empty') {
            root = root.walkRight();
          } else {
            root = root.walkLeft();
          }
        }
      } else {
        if (node.getPriority() < root.getNodeInfo().getPriority()) {
          root.setLeft(this.deleteInternal(node, root.walkLeft()));
        } else {
          root.setRight(this.deleteInternal(node, root.walkRight()));
        }
      }
    }

    if (root.walkLeft().getLevel() < root.getLevel() - 1 ||
      root.walkRight().getLevel() < root.getLevel() - 1) {
      if (root.kind === 'node') {
        root.decrementLevel();
        if (root.walkRight().getLevel() > root.getLevel()) {
          const right = root.walkRight();
          right.setLevel(root.getLevel());
        }

        root = this.skew(root);
        root = this.split(root);
      }
    }
    return root;
  }

  private split(root: BSTTree<T>): BSTTree<T> {
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

  private findMaxInternal(root: BSTTree<T>): Optional<T> {
    if (root.kind === 'empty') {
      return Optional.empty();
    } else {
      if (root.walkRight().kind === 'node') {
        return this.findMaxInternal(root.walkRight());
      } else {
        return Optional.of(root.getNodeInfo());
      }
    }
  }

  private findWithCrumbs(node: T, root: BSTTree<T>, breadcrumbs: Array<BreadCrumb<T>>):
    Optional<Pair<BSTTree<T>, Array<BreadCrumb<T>>>> {
    switch (root.kind) {
      case 'empty':
        return Optional.empty();
      case 'node':
        if (node.equals(root.nodeInfo)) {
          return Optional.of(new Pair(root, breadcrumbs));
        } else if (node.getPriority() < root.getPriority()) {
          return this.findWithCrumbs(node, root.walkLeft(),
            [new BreadCrumb(TreeDirection.LEFT, root, root.walkRight()), ...breadcrumbs]);
        } else {
          return this.findWithCrumbs(node, root.walkRight(),
            [new BreadCrumb(TreeDirection.RIGHT, root, root.walkLeft()), ...breadcrumbs]);
        }
    }
  }

  private findInternal(node: T, root: BSTTree<T>): Optional<BSTTree<T>> {
    switch (root.kind) {
      case 'empty':
        return Optional.empty();
      case 'node':
        if (node.equals(root.nodeInfo)) {
          return Optional.of(root);
        } else if (node.getPriority() < root.getPriority()) {
          return this.findInternal(node, root.walkLeft());
        } else {
          return this.findInternal(node, root.walkRight());
        }
    }
  }

  private skew(root: BSTTree<T>): BSTTree<T> {
    if (root.getLevel() !== 0 && root.walkLeft().getLevel() === root.getLevel()) {
      const temp = root.walkLeft();

      root.setLeft(temp.walkRight());

      temp.setRight(root);
      root = temp;
    }

    return root;
  }
}
