import 'jasmine';

import {Optional} from 'Optional';

import {AnderssonTree} from '../AnderssonTree';
import {BalancableNode} from '../BST';
import {EmptyTree} from '../BSTNode';

class SimpleNode implements BalancableNode {
  n: number;

  constructor(n: number) {
    this.n = n;
  }

  getPriority() {
    return this.n;
  }

  equals(other: BalancableNode): boolean {
    if (!(other instanceof SimpleNode)) {
      return false;
    } else {
      return this.n === other.n;
    }
  }
}

const one = new SimpleNode(1);
const two = new SimpleNode(2);
const three = new SimpleNode(3);
const four = new SimpleNode(4);
const five = new SimpleNode(5);

describe('Tree', () => {
  it('inserts a node', () => {
    const tree = new AnderssonTree();

    tree.insert(one);
    expect(tree.peek()).toEqual(one);
  });

  it('inserts nodes', () => {
    const tree = new AnderssonTree();

    tree.insert(one);
    tree.insert(two);
    tree.insert(three);
    tree.insert(four);
    tree.insert(five);
  });

  it('deletes nodes', () => {
    const tree = new AnderssonTree();

    tree.insert(one);
    tree.delete(one);

    expect(() => tree.peek())
        .toThrow(new Error('Can\'t peek at the empty tree'));
  });

  it('deletes nodes', () => {
    const tree = new AnderssonTree();

    tree.insert(one);
    tree.insert(two);

    tree.delete(one);
    expect(tree.peek()).toEqual(two);

    tree.delete(two);
    expect(() => tree.peek())
        .toThrow(new Error('Can\'t peek at the empty tree'));
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
})