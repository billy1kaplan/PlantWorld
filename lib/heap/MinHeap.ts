import {HeapElement} from './HeapElement';

export interface MinHeap<T> {
  getMin(): HeapElement<T>;
  insert(element: HeapElement<T>): void;
}