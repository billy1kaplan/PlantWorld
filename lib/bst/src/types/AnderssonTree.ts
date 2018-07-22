import { Optional } from 'Optional';
import { IBalanceableNode } from '../IBalanceableNode';
import { IBST } from '../IBST';
import { TreeDirection } from '../TreeDirection';
import { BreadCrumb } from './BreadCrumb';
import { BSTNode } from './BSTNode';
import { BSTTree } from './BSTTree';

import { EmptyNode } from './EmptyTree';
import { Pair } from './Pair';

// Reference:
// http://www.eternallyconfuzzled.com/tuts/datastructures/jsw_tut_andersson.aspx
export class AnderssonTree<T extends IBalanceableNode> implements IBST<T> {
  private root: BSTTree<T>;
  private numElements: number;

  public constructor() {
    this.root = EmptyNode.instance();
    this.numElements = 0;
  }

  /**
   * Returns tree if all elements of the tree are empty.
   */
  public isEmpty(): boolean {
    return this.numElements === 0;
  }

  /**
   * Returns the number of elements in the tree, including tree elements with multiple nodes
   * of the same priority.
   */
  public size(): number {
    return this.numElements;
  }

  /**
   * Inserts an element into the tree if the tree does not contain a duplicate node.
   */
  public insert(node: T): void {
    this.root = this.internalInsert(node, this.root);
  }
  
  /**
   * Returns the maximum element of the tree. If multiple elements, returns the first one inserted of the maximum priority.
   */
  public findMax(): Optional<T> {
    return this.findMaxInternal(this.root);
  }

  /**
   * Returns the maximum priority element of the tree. If multiple elements, uses the priority to break ties, returning the first 
   * value of the highest priority.
   */
  public findMaxWithVariableKey(nodeAdjuster: (node: T) => T): T[] {
    //return this.findMaxInternalWithAdjustments(this.root, nodeAdjuster, []);
    return null;
  }

  /**
   * returns true if the node is contained in the tree within the specified range.
   */
  public contains(node: T): boolean {
    return this.findInternal(node, this.root).isPresent();
  }

  /**
   * Deletes the given node between the specified range.
   */
  public delete(node: T): void {
    this.root = this.deleteInternal(node, this.root);
  }

  /**
   * Finds the predecessor element within the given range.
   */
  public predecessor(node: T): Optional<T> {
    //return this.adjacent(node, TreeDirection.LEFT);
    return null;
  }

  /**
   * Finds the successor element within the given priority range
   */
  public successor(node: T): Optional<T> {
    //return this.adjacent(node, TreeDirection.RIGHT);
    return null;
  }

  /**
   * Swaps the position of two nodes with equal priority
   */
  public swapPositions(node1: T, node2: T): void {
    /*
    if (!(node1.getPriority() === node2.getPriority())) {
      return;
    }

    const bstNode1 = this.findInternal(node1, this.root);
    bstNode1.ifPresent((foundNode1) => {
      foundNode1.swapNodes(node1, node2);
    });
    */
  }

  private internalInsert(node: T, root: BSTTree<T>): BSTTree<T> {
    if (root.kind === 'empty') {
      this.numElements += 1;
      return BSTNode.leafNodeOf(node, 1);
    } else {
      const nodeInfo = root.nodeInfo;
      if (node.equals(nodeInfo)) {
        return root;
      } else if (node.compareTo(root.nodeInfo) < 0) {
        root.setLeft(this.internalInsert(node, root.walkLeft()));
      } else {
        root.setRight(this.internalInsert(node, root.walkRight()));
      }

      root = this.skew(root);
      if (root.kind === 'node') {
        root = this.split(root);
      }
    }

    return root;
  }

  public skew(root: BSTNode<T>): BSTTree<T> {
    if (root.getLevel() !== 0 && root.walkLeft().getLevel() === root.getLevel()) {
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
  
  private findMaxInternal(root: BSTTree<T>): Optional<T> {
    if (root.kind === 'empty') {
      return Optional.empty();
    } else {
      let cur: BSTNode<T> = root;
      while (cur.walkRight().kind === 'node') {
        // We've just made sure we can walk right, so we can make this assertion safely.
        cur = cur.walkRight() as BSTNode<T>;
      }
      return Optional.of(cur.nodeInfo);
    }
  }

  private filterTree(root: BSTTree<T>, predicate: (node: T) => boolean): T[] {
    if (root.kind === 'empty') {
      return [];
    } else {
      if (predicate(root.nodeInfo)) {
        return [
          ...this.filterTree(root.walkLeft(), predicate),
          root.nodeInfo,
          ...this.filterTree(root.walkRight(), predicate)
        ];
      } else {
        return [
          ...this.filterTree(root.walkLeft(), predicate),
          ...this.filterTree(root.walkRight(), predicate)
        ];
      }
    }
  }

  private reduceTree(root: BSTTree<T>, reduceFn: (acc: T, cur: T) => T): Optional<T> {
    const reduceInternal = (root: BSTTree<T>, acc: T): T => {
      if (root.kind === 'empty') {
        return acc;
      } else {
        const left = reduceInternal(root.walkLeft(), acc);
        const right = reduceInternal(root.walkRight(), acc);
        return reduceFn(left, right);
      }
    };

    if (root.kind === 'empty') {
      return Optional.empty();
    } else {
      return Optional.of(reduceInternal(root, root.nodeInfo));
    }
  }

  private findMaxInternalWithAdjustments(root: BSTTree<T>, nodeAdjuster: (node: T) => T): Optional<T> {
    return this.reduceTree(root, nodeAdjuster)
  }

  private findInternal(node: T, root: BSTTree<T>): Optional<BSTNode<T>> {
    switch (root.kind) {
      case 'empty':
        return Optional.empty();
      case 'node':
        if (node.equals(root.nodeInfo)) {
          return Optional.of(root);
        } else if (node.compareTo(root.nodeInfo) < 0) {
          return this.findInternal(node, root.walkLeft());
        } else {
          return this.findInternal(node, root.walkRight());
        }
    }
  }

  private deleteInternal(node: T, root: BSTTree<T>): BSTTree<T> {
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
          root.setLeft(this.deleteInternal(root.nodeInfo, root.walkLeft()));
        } else {
          if (root.walkLeft().kind === 'empty') {
            root = root.walkRight();
          } else {
            root = root.walkLeft();
          }
        }
      } else if (node.compareTo(root.nodeInfo) < 0) {
        root.setLeft(this.deleteInternal(node, root.walkLeft()));
      } else {
        root.setRight(this.deleteInternal(node, root.walkRight()));
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

  private adjacent(node: T, adjacentLocation: TreeDirection): Optional<T> {
    const nodeLocWithContext = this.findWithCrumbs(node, this.root, []);

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

  private findWithCrumbs(node: T, root: BSTTree<T>, breadcrumbs: Array<BreadCrumb<T>>):
    Optional<Pair<BSTTree<T>, Array<BreadCrumb<T>>>> {
    switch (root.kind) {
      case 'empty':
        return Optional.empty();
      case 'node':
        if (node.equals(root.nodeInfo)) {
          return Optional.of(new Pair(root, breadcrumbs));
        } else if (node.compareTo(root.nodeInfo) < 0) {
          return this.findWithCrumbs(node, root.walkLeft(),
            [new BreadCrumb(TreeDirection.LEFT, root, root.walkRight()), ...breadcrumbs]);
        } else {
          return this.findWithCrumbs(node, root.walkRight(),
            [new BreadCrumb(TreeDirection.RIGHT, root, root.walkLeft()), ...breadcrumbs]);
        }
    }
  }
}
