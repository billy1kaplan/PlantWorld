import {HeapElement} from './HeapElement';

export interface MinHeap<T> {
  deleteMin(): HeapElement<T>;
  peekMin(): HeapElement<T>;
  insert(element: HeapElement<T>): void;
  isEmpty(): boolean;
}