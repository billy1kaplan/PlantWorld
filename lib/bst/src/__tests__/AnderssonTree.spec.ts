import 'jasmine';

import { Optional } from 'Optional';

import { IBalanceableNode } from '../IBalanceableNode';
import { AnderssonTree } from '../types/AnderssonTree';

/**
 * Simple Node that implements
 */
class SimpleNode implements IBalanceableNode<SimpleNode> {
  private n: number;

  constructor(n: number) {
    this.n = n;
  }

  public getPriority() {
    return this.n;
  }

  public equals(other: SimpleNode): boolean {
    return this.n === other.n;
  }
}

describe('Tree', () => {
  let one;
  let two;
  let three;
  let four;
  let five;
  beforeAll(() => {
    one = new SimpleNode(1);
    two = new SimpleNode(2);
    three = new SimpleNode(3);
    four = new SimpleNode(4);
    five = new SimpleNode(5);
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
      expect(tree.isEmpty()).toEqual(true);
    });
  });

  describe('size', () => {
    it('returns 0 for an empty tree', () => {
      const tree = new AnderssonTree();
      expect(tree.size()).toEqual(0);
    });

    it('returns 3 for a tree of three elements', () => {
      const tree = new AnderssonTree();
      tree.insert(one);
      tree.insert(one);
      tree.insert(one);
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
      expect(tree.size()).toEqual(6);
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
    it('finds the predecessor', () => {
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

    it('finds the predecessor', () => {
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
    });
  });
});
