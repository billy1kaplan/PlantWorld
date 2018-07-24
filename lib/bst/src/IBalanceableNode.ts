/**
 * Nodes that can be inserted within the BST.
 */
export interface IBalanceableNode {
  /**
   * Returns true if the two nodes are equivalent.
   * @param another balancable node to compare to.
   */
  equals(other: IBalanceableNode): boolean;

  /**
   * Return < 0 if this node is less than the node being compared to
   * Return 0 if this node is equal to the node being compared to
   * Return > 0 if this node is more than the node being compared to
   */
  compareTo(other: IBalanceableNode): number;
}
