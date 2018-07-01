/**
 * Type of objects for insertion into the Heap.
 */
export interface IHeapElement {
  /**
   * Checks equality to another heap element.
   * @param other heap element to compare equality
   * @returns true if this and other heap elements are equal
   */
  equals(other: IHeapElement): boolean;

  /**
   * Compares natural ordering of two IHeapElements.
   * @param other heap element to compare to
   * @returns
   * -1 if this element is less than the other element
   * 0 if this element is equal to the other element
   * 1 if this element is greather than the other element
   */
  compareTo(other: IHeapElement): number;
}
