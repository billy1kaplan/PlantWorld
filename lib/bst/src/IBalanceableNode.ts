export interface IBalanceableNode {
  equals(other: IBalanceableNode): boolean;
  getPriority(): number;
}
