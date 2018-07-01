export interface IBalancableNode {
  equals(other: IBalancableNode): boolean;
  getPriority(): number;
}
