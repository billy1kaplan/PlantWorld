import 'jasmine';
import {Heap} from '..';

class Number {
  constructor(public n: number) {}
  equals(other: Number) {
    return this.n == other.n;
  }

  compareTo(other: Number) {
    return this.n - other.n;
  }
}

const one = new Number(1);
const two = new Number(2);
const three = new Number(3);

describe('Heap', () => {
  it('correctly reports when empty', () => {
    const h = new Heap();

    expect(h.isEmpty()).toBe(true);
  });

  it('correctly reports when not empty', () => {
    const h = new Heap();

    h.insert(one);

    expect(h.isEmpty()).toBe(false);
  });

  it('inserts an element', () => {
    const h = new Heap();

    h.insert(one)

    expect(h.peekMin()).toEqual(one);
  });

  it('deletes an element', () => {
    const h = new Heap();

    h.insert(one)
    h.deleteMin();

    expect(h.isEmpty()).toBe(true);
  });

  it('maintains min heap property', () => {
    const h = new Heap();

    h.insert(two)
    h.insert(three)
    h.insert(one)

    expect(h.deleteMin()).toEqual(one);
    expect(h.deleteMin()).toEqual(two);
    expect(h.deleteMin()).toEqual(three);
    expect(() => h.deleteMin())
        .toThrow(new Error('Empty heap has no minimum element!'));
  });

  it('contains no duplicates', () => {
    const h = new Heap();

    h.insert(one)
    h.insert(two)
    h.insert(one)

    expect(h.deleteMin()).toEqual(one);
    expect(h.deleteMin()).toEqual(two);
    expect(() => h.deleteMin())
        .toThrow(new Error('Empty heap has no minimum element!'));
  });
});