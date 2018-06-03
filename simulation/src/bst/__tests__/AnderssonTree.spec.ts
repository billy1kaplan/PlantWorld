import 'jasmine';
import {AnderssonTree} from '../AnderssonTree';
import {BalancableNode} from '../BST';

class SimpleNode implements BalancableNode {
  n: number;

  constructor(n: number) {
    this.n = n;
  }

  getPriority() {
    return this.n;
  }

  equals(other: BalancableNode): boolean {
    return false;
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
})