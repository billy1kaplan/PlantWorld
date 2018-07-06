export interface IBalanceableNode<T> {
  equals(other: IBalanceableNode<T>): boolean;
  getPriority(): number;
}
