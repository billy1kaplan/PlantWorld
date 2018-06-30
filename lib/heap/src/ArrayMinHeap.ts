import {Optional} from 'optional';

import {IHeapElement} from './IHeapElement';
import {IMinHeap} from './IMinHeap';

export class ArrayMinHeap<T extends IHeapElement> implements IMinHeap<T> {
  private elements: T[];
  private size: number;
  constructor() {
    this.elements = [];
    this.size = 0;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }

  public insert(element: T): void {
    if (this.size === 0) {
      this.elements[0] = element;
    } else {
      this.sift(element);
    }
    this.size++;
  }

  public peekMin(): Optional<T> {
    if (this.size === 0) {
      return Optional.empty();
    } else {
      return Optional.of(this.elements[0]);
    }
  }

  /**
   * Typically O(Log(n)) complexity.
   * Will degenerate to O(n * Log(n)) when number of duplicate heap
   * elements approaches the size of the heap.
   */
  public deleteMin(): Optional<T> {
    const previousMinElement = this.peekMin();

    while (this.size > 0 && this.presentAndEqual(previousMinElement, this.peekMin())) {
      this.deleteMinElement();
    }

    return previousMinElement;
  }

  private sift(element: T): void {
    this.elements[this.size] = element;
    let index = this.size;

    while (index > 0 && this.lessThanParent(index)) {
      const parentIndex = this.getParent(index);
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  private lessThanParent(index) {
    const element = this.elements[index];
    const parent = this.elements[this.getParent(index)];
    return element.compareTo(parent) < 0;
  }

  private swap(i: number, j: number) {
    const tmp = this.elements[i];
    this.elements[i] = this.elements[j];
    this.elements[j] = tmp;
  }

  private deleteMinElement(): void {
    this.elements[0] = this.elements[this.size - 1];
    this.size--;
    this.siftDown();
  }

  private siftDown(): void {
    let index = 0;
    while (this.greaterThanEitherChild(index)) {
      const leftChild = this.elements[this.getFirstChild(index)];
      const rightChild = this.elements[this.getSecondChild(index)];

      if (leftChild.compareTo(rightChild) < 0) {
        this.swap(index, this.getFirstChild(index));
        index = this.getFirstChild(index);
      } else {
        this.swap(index, this.getSecondChild(index));
        index = this.getSecondChild(index);
      }
    }
  }

  private greaterThanEitherChild(index: number) {
    const firstChildIndex = this.getFirstChild(index);
    const secondChildIndex = this.getSecondChild(index);
    const greaterThanFirstChild = firstChildIndex < this.size &&
      this.elements[index].compareTo(this.elements[firstChildIndex]) > 0;
    const greaterThanSecondChild = firstChildIndex < this.size &&
      this.elements[index].compareTo(this.elements[secondChildIndex]) > 0;
    return greaterThanFirstChild || greaterThanSecondChild;
  }

  private getParent(n: number) {
    return Math.floor((n - 1) / 2);
  }

  private getFirstChild(n: number) {
    return 2 * n + 1;
  }

  private getSecondChild(n: number) {
    return 2 * n + 2;
  }

  private presentAndEqual(val1: Optional<T>, val2: Optional<T>): boolean {
    return (val1.isPresent() && val2.isPresent() && val1.getOrError().equals(val2.getOrError()));
  }
}
