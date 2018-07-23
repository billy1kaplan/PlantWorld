import 'jasmine';
import { Optional } from 'Optional';
import { IBalanceableNode } from '../IBalanceableNode';
import { IBST } from '../IBST';
import { AnderssonTree } from '../types/AnderssonTree';
import { BSTNode } from '../types/BSTNode';

/**
 * Simple Node that implements
 */
class SimpleNode implements IBalanceableNode {
  private n: number;
  public id: number;

  static fromNumber(n: number) {
    return new SimpleNode(n, n);
  }

  constructor(n: number,
    id: number) {
    this.n = n;
    this.id = id;
  }

  public getPriority() {
    return this.n;
  }

  public equals(other: SimpleNode): boolean {
    return this.n === other.n;
  }

  public compareTo(other: SimpleNode): number {
    return this.n - other.n;
  }
}

describe('Tree', () => {
  let one;
  let one_two;
  let one_three;
  let two;
  let three;
  let four;
  let five;
  beforeAll(() => {
    one = SimpleNode.fromNumber(1);
    two = SimpleNode.fromNumber(2);
    three = SimpleNode.fromNumber(3);
    four = SimpleNode.fromNumber(4);
    five = SimpleNode.fromNumber(5);

    one_two = new SimpleNode(1, 2);
    one_three = new SimpleNode(1, 3);
  });

  describe('skew', () => {
    it('properly skews the tree', () => {
      const original = BSTNode.constructBSTNode(
        four, 2,
        BSTNode.constructBSTNode(
          two, 2,
          BSTNode.leafNodeOf(one, 1),
          BSTNode.leafNodeOf(three, 1)),
        BSTNode.leafNodeOf(five, 1));

      const expectedResult =
        BSTNode.constructBSTNode(two, 2,
          BSTNode.leafNodeOf(one, 1),
          BSTNode.constructBSTNode(four, 2,
            BSTNode.leafNodeOf(three, 1),
            BSTNode.leafNodeOf(five, 1)));

      const tree = new AnderssonTree();
      const skewedResult = tree.skew(original);

      expect(skewedResult).toEqual(expectedResult);
    });
  });

  describe('split', () => {
    it('properly splits the tree', () => {
      const original =
        BSTNode.constructBSTNode(two, 2,
          BSTNode.leafNodeOf(one, 1),
          BSTNode.constructBSTNode(four, 2,
            BSTNode.leafNodeOf(three, 1),
            BSTNode.leafNodeOf(five, 2)));

      const expectedResult = BSTNode.constructBSTNode(
        four, 3,
        BSTNode.constructBSTNode(
          two, 2,
          BSTNode.leafNodeOf(one, 1),
          BSTNode.leafNodeOf(three, 1)),
        BSTNode.leafNodeOf(five, 2));

      const tree = new AnderssonTree();
      const splitResult = tree.split(original);

      expect(splitResult).toEqual(expectedResult);
    });
  });

  describe('empty', () => {
    it('detects an empty tree', () => {
      const tree = new AnderssonTree();

      expect(tree.isEmpty()).toEqual(true);
    });

    it('detects a non-empty tree', () => {
      const tree = new AnderssonTree();
      tree.insert(one);

      expect(tree.isEmpty()).toEqual(false);
    });

    it('detects a recently empty tree', () => {
      const tree = new AnderssonTree();
      expect(tree.isEmpty()).toEqual(true);

      tree.insert(one);
      expect(tree.isEmpty()).toEqual(false);

      tree.delete(one);
      //expect(tree.isEmpty()).toEqual(true);
    });
  });

  describe('size', () => {
    it('returns 0 for an empty tree', () => {
      const tree = new AnderssonTree();
      expect(tree.size()).toEqual(0);
    });

    it('returns 1 when inserting duplicates', () => {
      const tree = new AnderssonTree();
      tree.insert(one);
      tree.insert(one);
      tree.insert(one);
      expect(tree.size()).toEqual(1);
    });

    it('returns 3 when inserting 3 unique elements', () => {
      const tree = new AnderssonTree();
      tree.insert(one);
      tree.insert(two);
      tree.insert(three);
      expect(tree.size()).toEqual(3);
    });
  });

  describe('insert', () => {
    it('inserts a node', () => {
      const tree = new AnderssonTree();

      tree.insert(one);
      expect(tree.size()).toEqual(1);
    });

    it('inserts multiple nodes', () => {
      const tree = new AnderssonTree();

      tree.insert(one);
      tree.insert(two);
      tree.insert(three);
      tree.insert(four);
      tree.insert(five);
      tree.insert(five);
      expect(tree.size()).toEqual(5);
    });
  });

  describe('find max', () => {
    it('returns empty for the empty tree', () => {
      const tree = new AnderssonTree();
      const max = tree.findMax();
      expect(max).toEqual(Optional.empty());
    });

    it('returns element value for a single element tree', () => {
      const tree = new AnderssonTree();
      tree.insert(one);
      const max = tree.findMax();
      expect(max).toEqual(Optional.of(one));
    });

    it('returns max element value for a multi-element tree', () => {
      const tree = new AnderssonTree();
      tree.insert(one);
      tree.insert(two);
      tree.insert(five);
      tree.insert(three);
      tree.insert(four);
      tree.insert(five);
      const max = tree.findMax();
      expect(max).toEqual(Optional.of(five));
    });
  });

  describe('contains', () => {
    it('returns true if the node is in the tree', () => {
      const tree = new AnderssonTree();
      tree.insert(one);
      tree.insert(two);
      expect(tree.contains(one)).toEqual(true);
    });

    it('returns false if the node is not in the tree', () => {
      const tree = new AnderssonTree();
      tree.insert(one);
      tree.insert(two);
      expect(tree.contains(three)).toEqual(false);
    });
  });

  describe('delete', () => {
    it('deletes nodes', () => {
      const tree = new AnderssonTree();

      tree.insert(one);
      expect(tree.size()).toEqual(1);

      tree.delete(one);
      expect(tree.contains(one)).toEqual(false);
      expect(tree.size()).toEqual(0);
    });

    it('deletes nodes', () => {
      const tree = new AnderssonTree();

      tree.insert(one);
      tree.insert(two);

      tree.delete(one);
      expect(tree.contains(two)).toEqual(true);

      tree.delete(two);
      expect(tree.contains(two)).toEqual(false);
    });

    it('does nothing when the node is not present', () => {
      const tree = new AnderssonTree();
      tree.delete(one);
      tree.delete(two);

      expect(tree.size()).toEqual(0);
    });
  });

  describe('predecessor', () => {
    it('finds the predecessors', () => {
      const tree = new AnderssonTree();

      tree.insert(one);
      tree.insert(two);
      tree.insert(three);
      tree.insert(four);

      expect(tree.predecessor(one)).toEqual(Optional.empty());
      expect(tree.predecessor(two)).toEqual(Optional.of(one));
      expect(tree.predecessor(three)).toEqual(Optional.of(two));
      expect(tree.predecessor(four)).toEqual(Optional.of(three));
    });

    it('finds the predecessors', () => {
      const tree = new AnderssonTree();

      tree.insert(four);
      tree.insert(two);
      tree.insert(one);
      tree.insert(three);

      expect(tree.predecessor(one)).toEqual(Optional.empty());
      expect(tree.predecessor(two)).toEqual(Optional.of(one));
      expect(tree.predecessor(three)).toEqual(Optional.of(two));
      expect(tree.predecessor(four)).toEqual(Optional.of(three));
      expect(tree.predecessor(five)).toEqual(Optional.empty());
    });
  });

  describe('successor', () => {
    it('finds the successor', () => {
      const tree = new AnderssonTree();

      tree.insert(one);
      tree.insert(two);
      tree.insert(three);
      tree.insert(four);

      expect(tree.successor(one)).toEqual(Optional.of(two));
      expect(tree.successor(two)).toEqual(Optional.of(three));
      expect(tree.successor(three)).toEqual(Optional.of(four));
      expect(tree.successor(four)).toEqual(Optional.empty());
      expect(tree.successor(five)).toEqual(Optional.empty());
    });
  });

  describe('swap', () => {
    /*
    it('swaps nodes of equal ranking in the tree without adjustment', () => {
      const tree = new AnderssonTree();
      const firstInstance = SimpleNode.fromNumber(1);
      const secondInstance =  SimpleNode.fromNumber(1);

      tree.insert(firstInstance);
      tree.insert(secondInstance);

      const firstMax = tree.findMax();
      tree.swapPositions(firstInstance, secondInstance, (x) => x);
      const secondMax = tree.findMax();
      expect(firstMax !== secondMax);
    });
    */

    it('swaps nodes of equal ranking in the tree with adjustment', () => {
      const tree = new AnderssonTree();
      tree.insert(one);
      tree.insert(two);
      tree.insert(three);

      const specialNode1 = new SimpleNode(2, 22);
      const specialNode2 = new SimpleNode(3, 33);

      tree.swapPositions(specialNode1, specialNode2, (node) => {
        switch (node.getPriority()) {
          case (2):
            return specialNode1;
          case (3):
            return specialNode2;
          default:
            return node;
        };
      });
      expect(tree.findMax()).toEqual(Optional.of(specialNode2));
      });
    });

    /*
    describe('integration test', () => {
      it('handles complex sequences of insertions and deletions', () => {
        const tree = new AnderssonTree();
        tree.insert(two);
        tree.insert(one);
        tree.insert(three);
        tree.insert(one);
        tree.insert(five);
        tree.insert(one);
        tree.insert(three);
        tree.insert(three);
        tree.insert(two);
        tree.delete(two)
        tree.delete(two)
        expect(tree.findMax()).toEqual(Optional.of(five));
        tree.delete(three);
        expect(tree.findMax()).toEqual(Optional.of(three));
      });
    });
    */
  });
