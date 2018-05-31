import {HeapElement} from './HeapElement';

export interface MinHeap<T extends HeapElement> {
  deleteMin(): T;
  peekMin(): T;
  insert(element: T): void;
  isEmpty(): boolean;
}