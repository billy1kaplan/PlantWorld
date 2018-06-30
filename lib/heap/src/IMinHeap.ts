import {Optional} from 'optional';
import {IHeapElement} from './IHeapElement';

/**
 * Min heap data structure operations. Elements must
 * support operations defined in IHeapElement.
 */
export interface IMinHeap<T extends IHeapElement> {
  /**
   * Tests for heap emptiness.
   * @returns true if the min heap is empty
   */
  isEmpty(): boolean;

  /**
   * Inserts an element into the heap.
   * @param element to insert into the heap.
   */
  insert(element: T): void;

  /**
   * Peeks at the minimum element on the heap.
   * @returns Empty optional if the heap is empty,
   * otherwise an Optional of the minimum element
   */
  peekMin(): Optional<T>;

  /**
   * Deletes the minimum element from the heap and
   * returns the removed minimum value.
   * @returns Empty optional if the heap is empty,
   * otherwise an Optional of the minimum element
   */
  deleteMin(): Optional<T>;
}
