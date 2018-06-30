import 'jasmine';
import { Heap } from '..';
import { Optional } from '../../../optional/dist';
import { IHeapElement } from '../IHeapElement';

/**
 * Simple implementation of Heap Element for testing.
 */
class ComparableNumber implements IHeapElement {
  constructor(public n: number) { }
  public equals(other: ComparableNumber) {
    return this.n === other.n;
  }

  public compareTo(other: ComparableNumber) {
    return this.n - other.n;
  }
}

describe('Heap', () => {
  let one;
  let two;
  let three;
  let four;

  beforeAll(() => {
    one = new ComparableNumber(1);
    two = new ComparableNumber(2);
    three = new ComparableNumber(3);
    four = new ComparableNumber(4);
  });

  describe('isEmpty function', () => {
    it('correctly reports when empty', () => {
      const h = new Heap();

      expect(h.isEmpty()).toBe(true);
    });

    it('correctly reports when not empty', () => {
      const h = new Heap();

      h.insert(one);

      expect(h.isEmpty()).toBe(false);
    });
  });

  describe('insert', () => {
    it('inserts an element', () => {
      const h = new Heap();

      h.insert(one);

      expect(h.peekMin().getOrError()).toEqual(one);
    });
  });

  describe('delete', () => {
    it('deletes an element', () => {
      const h = new Heap();

      h.insert(one);
      const element = h.deleteMin();

      expect(element.getOrError()).toBe(one);
      expect(h.isEmpty()).toBe(true);
      h.deleteMin();

      const elementAfterDeleting = h.deleteMin();
      expect(elementAfterDeleting).toEqual(Optional.empty());
      expect(h.isEmpty()).toBe(true);
    });
  });

  describe('functional testing', () => {
    it('deletes an element', () => {
      const h = new Heap();

      h.insert(one);
      h.deleteMin();

      expect(h.isEmpty()).toBe(true);
    });

    it('maintains min heap property', () => {
      const h = new Heap();

      h.insert(two);
      h.insert(three);
      h.insert(one);

      expect(h.deleteMin().getOrError()).toEqual(one);
      expect(h.deleteMin().getOrError()).toEqual(two);
      expect(h.deleteMin().getOrError()).toEqual(three);
      expect(h.deleteMin()).toEqual(Optional.empty());
    });

    it('contains no duplicates', () => {
      const h = new Heap();

      h.insert(one);
      h.insert(two);
      h.insert(one);

      expect(h.deleteMin().getOrError()).toEqual(one);
      expect(h.deleteMin().getOrError()).toEqual(two);
      expect(h.deleteMin()).toEqual(Optional.empty());
    });

    it('Handles four values with duplicates', () => {
      const h = new Heap();

      h.insert(one);
      h.insert(four);
      h.insert(four);
      h.insert(four);
      h.insert(two);
      h.insert(three);
      h.insert(three);
      h.insert(three);

      expect(h.deleteMin().getOrError()).toEqual(one);
      expect(h.deleteMin().getOrError()).toEqual(two);
      expect(h.deleteMin().getOrError()).toEqual(three);
      expect(h.deleteMin().getOrError()).toEqual(four);
    });

    it('Handles four values with duplicates', () => {
      const h = new Heap();

      h.insert(one);
      h.insert(four);
      h.insert(four);
      h.insert(four);
      h.insert(two);
      h.insert(three);
      h.insert(three);
      h.insert(three);

      expect(h.deleteMin().getOrError()).toEqual(one);
      expect(h.deleteMin().getOrError()).toEqual(two);
      expect(h.deleteMin().getOrError()).toEqual(three);
      expect(h.deleteMin().getOrError()).toEqual(four);
    });

    it('Handles multiple inserts and deletions', () => {
      const h = new Heap();

      h.insert(three);
      h.insert(one);
      h.insert(four);
      h.insert(four);
      h.insert(three);

      expect(h.deleteMin().getOrError()).toEqual(one);
      expect(h.deleteMin().getOrError()).toEqual(three);

      h.insert(two);
      h.insert(three);
      h.insert(two);

      expect(h.deleteMin().getOrError()).toEqual(two);
      expect(h.deleteMin().getOrError()).toEqual(three);
      expect(h.deleteMin().getOrError()).toEqual(four);
      expect(h.isEmpty()).toEqual(true);
      expect(h.deleteMin()).toEqual(Optional.empty());
    });
  });
});
