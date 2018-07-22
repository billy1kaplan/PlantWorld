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
   * Inserts an element into the tree if the tree does not contain any duplicates.
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
    return this.findMaxInternalWithAdjustments(this.root, nodeAdjuster, []);
  }

  /**
   * returns true if the node is contained in the tree within the specified range.
   */
  public contains(node: T, nodeAdjuster: (node: T) => T): boolean {
    //return this.findInternal(node, this.root).isPresent();
    return null;
  }

  /**
   * Deletes the given node between the specified range.
   * Need to pass in minpriority and maxpriority to search for the element.
   */
  public delete(node: T): void {
    //this.root = this.deleteInternal(node, this.root);
    return null;
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

  private findMaxInternalWithAdjustments(root: BSTTree<T>, nodeAdjuster: (node: T) => T, acc: T[]): T[] {
    if (root.kind === 'empty') {
      return acc;
    } else {
      let head: T, tail: T[];
      [head, ...tail] = acc;

      let computedLeftMaxes: T[];
      if (root.walkLeft().kind === 'node' &&
        nodeAdjuster(root.nodeInfo)
          .compareTo(nodeAdjuster(
            (root.walkLeft() as BSTNode<T>).nodeInfo)) === 0) {

        const leftMaxes = this.findMaxInternalWithAdjustments(root.walkLeft(), nodeAdjuster, []);

        let leftMax: T, junk: T[];
        [leftMax, ...junk] = leftMaxes;

        const compareLeftToRight = nodeAdjuster(leftMax).compareTo(nodeAdjuster(root.nodeInfo));
        if (compareLeftToRight < 0) {
          computedLeftMaxes = [];
        } else if (compareLeftToRight === 0) {
          computedLeftMaxes = leftMaxes;
        } else {
          throw new Error("Priority adjuster breaks the BST tree property");
        }
      } else {
        computedLeftMaxes = [];
      }


      if (head === undefined) {
        return this.findMaxInternalWithAdjustments(root.walkRight(), nodeAdjuster, [root.nodeInfo, ...computedLeftMaxes])
      } else {
        const compare = nodeAdjuster(root.nodeInfo).compareTo(nodeAdjuster(head));
        const nodeInfo = root.nodeInfo;

        if (compare > 0) {
          return this.findMaxInternalWithAdjustments(root.walkRight(), nodeAdjuster, [nodeInfo, ...computedLeftMaxes])
        } else if (compare === 0) {
          return this.findMaxInternalWithAdjustments(root.walkRight(), nodeAdjuster, [nodeInfo, ...acc, ...computedLeftMaxes])
        } else {
          throw new Error("Priority adjuster breaks the BST tree property");
        }
      }
    }
  }

  /*

  private adjacent(node: T, adjacentLocation: TreeDirection): Optional<T> {
    const nodeLocWithContext = this.findWithCrumbs(node, this.root, []);

    return nodeLocWithContext.flatMap((loc) => {
      const curRoot = loc.fst;

      if (curRoot.walk(adjacentLocation).kind !== 'empty') {
        let curLoc = curRoot.walk(adjacentLocation);
        while (curLoc.walk(adjacentLocation.flip()).kind !== 'empty') {
          curLoc = curLoc.walk(adjacentLocation.flip());
        }
        return Optional.of(curLoc.getNodeInfo());
      } else {
        const crumbs = loc.snd;
        if (crumbs.length === 0
          || crumbs[0].direction === adjacentLocation) {
          return Optional.empty();
        } else {
          return Optional.of(crumbs[0].root.getNodeInfo());
        }
      }
    });
  }

  private deleteInternal(node: T, root: BSTTree<T>): BSTTree<T> {
    if (root.kind === 'node') {
      if (node.getPriority() === root.getPriority()) {
        this.numElements--;
        let heir: BSTTree<T>;
        if (root.walkLeft().kind !== 'empty' &&
          root.walkRight().kind !== 'empty') {
          heir = root.walkLeft();

          while (heir.walkRight().kind !== 'empty') {
            heir = heir.walkRight();
          }
        } else {
          if (root.walkLeft().kind === 'empty') {
            root = root.walkRight();
          } else {
            root = root.walkLeft();
          }
        }
        const 

        root.de(heir.getNodeInfo());
      } else if (node.getPriority() < root.getPriority()) {
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
          const right = root.walkRight();
          right.setLevel(root.getLevel());
        }

        root = this.skew(root);
        root = this.split(root);
      }
    }
    return root;
  }

  private findWithCrumbs(node: T, root: BSTTree<T>, breadcrumbs: Array<BreadCrumb<T>>):
    Optional<Pair<BSTTree<T>, Array<BreadCrumb<T>>>> {
    switch (root.kind) {
      case 'empty':
        return Optional.empty();
      case 'node':
        if (node.equals(root.nodeInfo)) {
          return Optional.of(new Pair(root, breadcrumbs));
        } else if (node.getPriority() === root.getPriority()) {
          const left = this.findWithCrumbs(node, root.walkLeft(), [new BreadCrumb(TreeDirection.LEFT, root, root.walkRight()), ...breadcrumbs]);
          const right = this.findWithCrumbs(node, root.walkRight(), [new BreadCrumb(TreeDirection.RIGHT, root, root.walkLeft()), ...breadcrumbs]);
          if (left.isPresent()) {
            return left;
          } else {
            return right;
          }
        } else if (node.getPriority() < root.getPriority()) {
          return this.findWithCrumbs(node, root.walkLeft(),
            [new BreadCrumb(TreeDirection.LEFT, root, root.walkRight()), ...breadcrumbs]);
        } else {
          return this.findWithCrumbs(node, root.walkRight(),
            [new BreadCrumb(TreeDirection.RIGHT, root, root.walkLeft()), ...breadcrumbs]);
        }
    }
  }

  private findInternal(node: T, root: BSTTree<T>): Optional<BSTNode<T>> {
    switch (root.kind) {
      case 'empty':
        return Optional.empty();
      case 'node':
        if (node.equals(root.nodeInfo)) {
          return Optional.of(root);
        } else if (node.getPriority() === root.getPriority()) {
          const left = this.findInternal(node, root.walkLeft());
          const right = this.findInternal(node, root.walkRight());
          if (left.isPresent()) {
            return left;
          } else {
            return right;
          }
        } else if (node.getPriority() < root.getPriority()) {
          return this.findInternal(node, root.walkLeft());
        } else {
          return this.findInternal(node, root.walkRight());
        }
    }
  }
  */

}
