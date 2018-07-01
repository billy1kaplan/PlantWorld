import 'jasmine';

import { Optional } from 'Optional';

import { IBalancableNode } from '../BalancableNode';
import { AnderssonTree } from '../types/AnderssonTree';

/**
 * Simple Node that implements
 */
class SimpleNode implements IBalancableNode {
  private n: number;

  constructor(n: number) {
    this.n = n;
  }

  public getPriority() {
    return this.n;
  }

  public equals(other: IBalancableNode): boolean {
    if (!(other instanceof SimpleNode)) {
      return false;
    } else {
      return this.n === other.n;
    }
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

  describe('empty', () => {
    it('inserts a node', () => {
      const tree = new AnderssonTree();

      tree.insert(one);
      expect(tree.find(one)).toEqual(true);
    });

    it('inserts nodes', () => {
      const tree = new AnderssonTree();

      tree.insert(one);
      tree.insert(two);
      tree.insert(three);
      tree.insert(four);
      tree.insert(five);
    });
  });

  it('deletes nodes', () => {
    const tree = new AnderssonTree();

    tree.insert(one);
    tree.delete(one);

    expect(tree.find(one)).toEqual(false);
  });

  it('deletes nodes', () => {
    const tree = new AnderssonTree();

    tree.insert(one);
    tree.insert(two);

    tree.delete(one);
    expect(tree.find(two)).toEqual(true);

    tree.delete(two);
    expect(tree.find(two)).toEqual(false);
  });

  it('finds the predecessor', () => {
    const tree = new AnderssonTree();

    tree.insert(one);
    tree.insert(two);
    tree.insert(three);
    tree.insert(four);

    expect(tree.belowSegment(three).getOrError()).toEqual(two);
    expect(tree.belowSegment(one)).toEqual(Optional.empty());
    expect(tree.belowSegment(four).getOrError()).toEqual(three);
  });
});
