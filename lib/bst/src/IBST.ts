import { Optional } from 'Optional';
import { IBalanceableNode } from './IBalanceableNode';

/**
 * Binary search tree data structure.
 */
export interface IBST<T extends IBalanceableNode> {
  /**
   * Returns true if the tree is size 0.
   */
  isEmpty(): boolean;

  /**
   * Returns the current size of the tree.
   */
  size(): number;

  /**
   * Inserts a node into the BST
   * @param node a balancable BST node
   * @param nodeAdjuster an ajustment function to replace how nodes are viewed in the tree
   */
  insert(node: T, nodeAdjuster: (node: T) => T): void;

  findMax(): Optional<T>;

  /**
   * Returns true if the tree contains the given node.
   * @param node a balancable BST node
   * @param nodeAdjuster an ajustment function to replace how nodes are viewed in the tree
   */
  contains(node: T, nodeAdjuster: (node: T) => T): boolean;

  /**
   * Deletes a given node, if present, from the BST.
   * @param node a balancable BST node
   * @param nodeAdjuster an ajustment function to replace how nodes are viewed in the tree
   */
  delete(node: T, nodeAdjuster: (node: T) => T): void;

  /**
   * Returns a list of predecessor nodes.
   * @param node a balanacable BST node
   * @param nodeAdjuster an ajustment function to replace how nodes are viewed in the tree
   */
  predecessor(node: T, nodeAdjuster: (node: T) => T): Optional<T>;

  /**
   * Returns a list of successor nodes.
   * @param node a balanacable BST node
   * @param nodeAdjuster an ajustment function to replace how nodes are viewed in the tree
   */
  successor(node: T, nodeAdjuster: (node: T) => T): Optional<T>;

  /**
   * Swaps the position of two nodes in the tree
   * if they have equivalent priority.
   * @param node1 the first equivalent node.
   * @param node2 the second equivalent node.
   * @param nodeAdjuster an ajustment function to replace how nodes are viewed in the tree
   */
  swapPositions(node1: T, node2: T, nodeAdjuster: (node: T) => T): void;
}
