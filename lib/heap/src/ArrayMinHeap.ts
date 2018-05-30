import {HeapElement} from './HeapElement';
import {MinHeap} from './MinHeap';

export class ArrayMinHeap<T> implements MinHeap<T> {
  private elements: HeapElement<T>[];
  private size: number;
  constructor() {
    this.elements = [];
    this.size = 0;
  }

  private getFirstChild(n: number) {
    return 2 * n + 1;
  }

  private getSecondChild(n: number) {
    return 2 * n + 2;
  }

  private getParent(n: number) {
    return (n - 1) / 2;
  }

  peekMin(): HeapElement<T> {
    if (this.size == 0) {
      throw new Error('Empty heap has no minimum element!');
    }
    return this.elements[0];
  }

  deleteMin(): HeapElement<T> {
    const element = this.peekMin();
    this.elements[0] = this.elements[this.size - 1];
    this.siftDown();
    return element;
  }

  insert(element: HeapElement<T>): void {
    if (this.size == 0) {
      this.elements[0] = element;
      this.size += 1;
    } else {
      this.sift(element)
    }
  }

  isEmpty(): boolean {
    return this.size == 0;
  }

  private sift(element: HeapElement<T>): void {
    this.elements[this.size] = element;
    var index = this.size;

    while (this.elements[this.getParent(index)].getPriority() >
           element.getPriority()) {
      const parentIndex = this.getParent(index);
      this.swap(parentIndex, index);
      index = parentIndex;
    }
    this.size++;
  }

  private swap(i: number, j: number) {
    const tmp = this.elements[i];
    this.elements[i] = this.elements[j];
    this.elements[j] = tmp;
  }

  private siftDown(): void {
    var index = 0;
    while (this.greaterThanEitherParent(index)) {
      const element = this.elements[index];
      if (element > this.elements[this.getFirstChild(index)]) {
        this.swap(index, this.getFirstChild(index));
        index = this.getFirstChild(index);
      } else {
        this.swap(index, this.getSecondChild(index));
        index = this.getSecondChild(index);
      }
    }
  }

  private swapIfGreater(i: number, j: number) {
    if (this.elements[i] > this.elements[j]) {
      this.swap(i, j);
    }
  }

  private greaterThanEitherParent(index: number) {
    const firstChildIndex = this.getFirstChild(index);
    const secondChildIndex = this.getSecondChild(index);
    return (firstChildIndex < this.size &&
            this.elements[index] > this.elements[firstChildIndex]) ||
        (secondChildIndex < this.size &&
         this.elements[index] > this.elements[secondChildIndex]);
  }
}