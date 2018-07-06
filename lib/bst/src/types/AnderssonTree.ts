import { Optional } from 'Optional';

import { IBST } from '../IBST';

import { BSTNode } from './BSTNode';
import { EmptyTree } from './EmptyTree';
import { BSTTree } from './BSTTree';
import { IBalanceableNode } from '../IBalanceableNode';
import { TreeDirection } from '../TreeDirection';

class BreadCrumb<T extends IBalanceableNode<T>> {
  constructor(public direction: TreeDirection, public root: BSTTree<T>, public untaken: BSTTree<T>) { }
}

class Pair<A, B> {
  constructor(public fst: A, public snd: B) {}
}

// Reference:
// http://www.eternallyconfuzzled.com/tuts/datastructures/jsw_tut_andersson.aspx
export class AnderssonTree<T extends IBalanceableNode<T>> implements IBST<T> {
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

  public insert(node: IBalanceableNode<T>): void {
    this.root = this.internalInsert(node, this.root);
  }

  public findMax(): Optional<IBalanceableNode<T>> {
    return this.findMaxInternal(this.root);
  }

  public contains(node: IBalanceableNode<T>): boolean {
    return this.findInternal(node, this.root).isPresent();
  }

  public delete(node: IBalanceableNode<T>): void {
    this.root = this.deleteInternal(node, this.root);
  }

  public predecessor(node: IBalanceableNode<T>): Optional<IBalanceableNode<T>> {
    const nodeLoc = this.findInternal(node, this.root);

    return nodeLoc.flatMap((loc) => {
      let curLoc = loc.walkLeft();

      if (curLoc.kind === 'empty') {
        let innerLoc = this.root;
        let pred: Optional<T> = Optional.empty();
        while (innerLoc.kind === 'node' && !innerLoc.nodeInfo.equals(node)) {
          if (innerLoc.getPriority() < node.getPriority() &&
            (!pred.isPresent() ||
              pred.getOrError().getPriority() < innerLoc.getPriority())) {
            pred = Optional.of(innerLoc.nodeInfo);
          }

          if (node.getPriority() < innerLoc.nodeInfo.getPriority()) {
            innerLoc = innerLoc.walkLeft();
          } else {
            innerLoc = innerLoc.walkRight();
          }
        }
        return pred;
      } else {
        while (curLoc.walkRight().kind !== 'empty') {
          curLoc = curLoc.walkRight();
        }

        if (curLoc.kind === 'node') {
          return Optional.of(curLoc.nodeInfo);
        } else {
          return Optional.empty();
        }
      }
    });
  }

  public successor(node: IBalanceableNode<T>): Optional<IBalanceableNode<T>> {
    const nodeLocWithContext = this.findWithCrumbs(node, this.root, []);

    return nodeLocWithContext.flatMap((loc) => {
      let curRoot = loc.fst;

      if (curRoot.walkRight().kind !== 'empty') {
        let curLoc = curRoot.walkRight();
        while (curLoc.walkLeft().kind !== 'empty') {
          curLoc = curLoc.walkLeft();
        }
        return Optional.of(curLoc.getNodeInfo());
      } else {
        let crumbs = loc.snd;
        if (crumbs.length === 0 || crumbs[0].direction === TreeDirection.RIGHT) {
          return Optional.empty();
        } else {
          return Optional.of(crumbs[0].root.getNodeInfo());
        }
      }
    });
  }

  public swapPositions(node1: IBalanceableNode<T>, node2: IBalanceableNode<T>): void {
    if (!(node1.getPriority() === node2.getPriority())) {
      return;
    }

    const bstNode1 = this.findInternal(node1, this.root);
    const bstNode2 = this.findInternal(node2, this.root);

    bstNode1.ifPresent(foundNode1 => {
      bstNode2.ifPresent(foundNode2 => {
        if (foundNode1.kind === 'node' && foundNode2.kind === 'node') {
          foundNode1.setNodeInfo(node2);
          foundNode2.setNodeInfo(node1);
        }
      })
    })
  }

  public print(): void {
    this.printInternal(this.root);
  }

  private internalInsert(node: IBalanceableNode<T>, root: BSTTree<T>): BSTTree<T> {
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

  private deleteInternal(node: IBalanceableNode<T>, root: BSTTree<T>): BSTTree<T> {
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

  private findWithCrumbs(node: IBalanceableNode<T>, root: BSTTree<T>, breadcrumbs: BreadCrumb<T>[]): Optional<Pair<BSTTree<T>, BreadCrumb<T>[]>> {
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

  private findInternal(node: IBalanceableNode<T>, root: BSTTree<T>): Optional<BSTTree<T>> {
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

  // In-order traversal of tree
  private printInternal(root: BSTTree<T>): void {
    switch (root.kind) {
      case 'empty':
        return;
      case 'node':
        this.printInternal(root.walkLeft());
        console.log(root.nodeInfo);
        this.printInternal(root.walkRight());
        return;
    }
  }
}
