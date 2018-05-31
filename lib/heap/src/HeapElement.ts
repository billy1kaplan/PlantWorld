export interface HeapElement {
  compareTo(other: HeapElement): number;
  equals(other: HeapElement): boolean;
}