export interface HeapElement<T> {
  getPriority(): number;
  getElement(): T;
}