import 'jasmine';
import { Optional } from 'Optional';
import { IBalanceableNode } from '../IBalanceableNode';
import { AnderssonTree } from '../types/AnderssonTree';
import { BSTNode } from '../types/BSTNode';

/**
 * Simple Node that implements
 */
class SimpleNode implements IBalanceableNode {
  public static fromNumber(n: number) {
    return new SimpleNode(n, n);
  }

  public id: number;
  private n: number;

  constructor(n: number, id: number) {
    this.n = n;
    this.id = id;
  }

  public getIdentifier() {
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
  let one: SimpleNode;
  let oneTwo: SimpleNode;
  let oneThree: SimpleNode;
  let two: SimpleNode;
  let three: SimpleNode;
  let four: SimpleNode;
  let five: SimpleNode;
  let id: <T>(el: T) => T;
  beforeAll(() => {
    one = SimpleNode.fromNumber(1);
    two = SimpleNode.fromNumber(2);
    three = SimpleNode.fromNumber(3);
    four = SimpleNode.fromNumber(4);
    five = SimpleNode.fromNumber(5);

    oneTwo = new SimpleNode(1, 2);
    oneThree = new SimpleNode(1, 3);
    id = (x) => x;
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
      tree.insert(one, id);

      expect(tree.isEmpty()).toEqual(false);
    });

    it('detects a recently empty tree', () => {
      const tree = new AnderssonTree();
      expect(tree.isEmpty()).toEqual(true);

      tree.insert(one, id);
      expect(tree.isEmpty()).toEqual(false);

      tree.delete(one, id);
      expect(tree.isEmpty()).toEqual(true);
    });
  });

  describe('size', () => {
    it('returns 0 for an empty tree', () => {
      const tree = new AnderssonTree();
      expect(tree.size()).toEqual(0);
    });

    it('returns 1 when inserting duplicates', () => {
      const tree = new AnderssonTree();
      tree.insert(one, id);
      tree.insert(one, id);
      tree.insert(one, id);
      expect(tree.size()).toEqual(1);
    });

    it('returns 3 when inserting 3 unique elements', () => {
      const tree = new AnderssonTree();
      tree.insert(one, id);
      tree.insert(two, id);
      tree.insert(three, id);
      expect(tree.size()).toEqual(3);
    });
  });

  describe('insert', () => {
    it('inserts a node', () => {
      const tree = new AnderssonTree();

      tree.insert(one, id);
      expect(tree.size()).toEqual(1);
    });

    it('inserts multiple nodes', () => {
      const tree = new AnderssonTree();

      tree.insert(one, id);
      tree.insert(two, id);
      tree.insert(three, id);
      tree.insert(four, id);
      tree.insert(five, id);
      tree.insert(five, id);
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
      tree.insert(one, id);
      const max = tree.findMax();
      expect(max).toEqual(Optional.of(one));
    });

    it('returns max element value for a multi-element tree', () => {
      const tree = new AnderssonTree();
      tree.insert(one, id);
      tree.insert(two, id);
      tree.insert(five, id);
      tree.insert(three, id);
      tree.insert(four, id);
      tree.insert(five, id);
      const max = tree.findMax();
      expect(max).toEqual(Optional.of(five));
    });
  });

  describe('contains', () => {
    it('returns true if the node is in the tree', () => {
      const tree = new AnderssonTree();
      tree.insert(one, id);
      tree.insert(two, id);
      expect(tree.contains(one, id)).toEqual(true);
    });

    it('returns false if the node is not in the tree', () => {
      const tree = new AnderssonTree();
      tree.insert(one, id);
      tree.insert(two, id);
      expect(tree.contains(three, id)).toEqual(false);
    });
  });

  describe('delete', () => {
    it('deletes nodes', () => {
      const tree = new AnderssonTree();

      tree.insert(one, id);
      expect(tree.size()).toEqual(1);

      tree.delete(one, id);
      expect(tree.contains(one, id)).toEqual(false);
      expect(tree.size()).toEqual(0);
    });

    it('deletes nodes', () => {
      const tree = new AnderssonTree();

      tree.insert(one, id);
      tree.insert(two, id);

      tree.delete(one, id);
      expect(tree.contains(two, id)).toEqual(true);

      tree.delete(two, id);
      expect(tree.contains(two, id)).toEqual(false);
    });

    it('does nothing when the node is not present', () => {
      const tree = new AnderssonTree();
      tree.delete(one, id);
      tree.delete(two, id);

      expect(tree.size()).toEqual(0);
    });
  });

  describe('predecessor', () => {
    it('finds the predecessors', () => {
      const tree = new AnderssonTree();

      tree.insert(one, id);
      tree.insert(two, id);
      tree.insert(three, id);
      tree.insert(four, id);

      expect(tree.predecessor(one, id)).toEqual(Optional.empty());
      expect(tree.predecessor(two, id)).toEqual(Optional.of(one));
      expect(tree.predecessor(three, id)).toEqual(Optional.of(two));
      expect(tree.predecessor(four, id)).toEqual(Optional.of(three));
    });

    it('finds the predecessors', () => {
      const tree = new AnderssonTree();

      tree.insert(four, id);
      tree.insert(two, id);
      tree.insert(one, id);
      tree.insert(three, id);

      expect(tree.predecessor(one, id)).toEqual(Optional.empty());
      expect(tree.predecessor(two, id)).toEqual(Optional.of(one));
      expect(tree.predecessor(three, id)).toEqual(Optional.of(two));
      expect(tree.predecessor(four, id)).toEqual(Optional.of(three));
      expect(tree.predecessor(five, id)).toEqual(Optional.empty());
    });
  });

  describe('successor', () => {
    it('finds the successor', () => {
      const tree = new AnderssonTree();

      tree.insert(one, id);
      tree.insert(two, id);
      tree.insert(three, id);
      tree.insert(four, id);

      expect(tree.successor(one, id)).toEqual(Optional.of(two));
      expect(tree.successor(two, id)).toEqual(Optional.of(three));
      expect(tree.successor(three, id)).toEqual(Optional.of(four));
      expect(tree.successor(four, id)).toEqual(Optional.empty());
      expect(tree.successor(five, id)).toEqual(Optional.empty());
    });
  });

  describe('swap', () => {
    it('swaps nodes of equal ranking in the tree without adjustment', () => {
      const tree = new AnderssonTree();
      const firstInstance = SimpleNode.fromNumber(1);
      const secondInstance = SimpleNode.fromNumber(1);

      tree.insert(firstInstance, id);
      tree.insert(secondInstance, id);

      const firstMax = tree.findMax();
      tree.swapPositions(firstInstance, secondInstance, (x) => x);
      const secondMax = tree.findMax();
      expect(firstMax !== secondMax);
    });

    it('swaps nodes of equal ranking in the tree with adjustment', () => {
      const tree = new AnderssonTree();
      tree.insert(one, id);
      tree.insert(two, id);
      tree.insert(three, id);

      const specialNode1 = new SimpleNode(2, 22);
      const specialNode2 = new SimpleNode(3, 33);

      tree.swapPositions(specialNode1, specialNode2, (node) => {
        const simpleNode = node as SimpleNode;
        switch (simpleNode.getIdentifier()) {
          case (2):
            return specialNode1;
          case (3):
            return specialNode2;
          default:
            return node;
        }
      });
      expect(tree.findMax()).toEqual(Optional.of(specialNode1));
    });
  });

  describe('integration test', () => {
    it('handles complex sequences of insertions and deletions', () => {
      const tree = new AnderssonTree();
      tree.insert(two, id);
      tree.insert(one, id);
      tree.insert(three, id);
      tree.insert(one, id);
      tree.insert(five, id);
      tree.insert(one, id);
      tree.insert(three, id);
      tree.insert(three, id);
      tree.insert(two, id);
      tree.delete(two, id);
      tree.delete(two, id);
      expect(tree.findMax()).toEqual(Optional.of(five));
      tree.delete(five, id);
      expect(tree.findMax()).toEqual(Optional.of(three));
      tree.insert(five, id);
      expect(tree.findMax()).toEqual(Optional.of(five));
    });
  });
});
