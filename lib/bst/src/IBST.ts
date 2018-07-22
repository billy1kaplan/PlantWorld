import {Optional} from 'Optional';
import { IBalanceableNode } from './IBalanceableNode';

/**
 * Binary search tree data structure.
 */
export interface IBST<T extends IBalanceableNode> {
  /**
   * Returns true if the tree contains 0 elements.
   */
  isEmpty(): boolean;

  /**
   * Returns the current size of the tree.
   */
  size(): number;

  /**
   * Inserts a node into the BST
   * @param node a balancable BST node
   */
  insert(node: T): void;

  findMax(): Optional<T>;

  /**
   * Returns maximum elements of the tree with the given adjustments.
   * Empty if the tree has no maximum (i.e. is empty).
   * @param nodeAdjuster adjusts the node for comparison.
   */
  findMaxWithVariableKey(nodeAdjuster: (node: T) => T): T[];

  /**
   * Returns true if the tree contains the given node.
   * @param node a balancable BST node
   * @param nodeAdjuster nodeAdjuster
   */
  contains(node: T, nodeAdjuster: (node: T) => T): boolean;

  /**
   * Deletes a given node, if present, from the BST.
   * @param node a balancable BST node
   */
  delete(node: T): void;
  
  /**
   * Deletes a given node, if present, from the BST.
   * @param node a balancable BST node
   * @param nodeAdjuster adjusts the nodes for deletion
   */
  delete(node: T, nodeAdjuster: (node: T) => T): void;

  /**
   * Returns a list of predecessor nodes at given adjustment.
   * @param node a balanacable BST node
   */
  predecessor(node: T): Optional<T>;

  /**
   * Returns a list of successor nodes at given adjustment.
   * @param node a balanacable BST node
   */
  successor(node: T): Optional<T>;


  /**
   * Swaps the position of two nodes in the tree
   * if they have equivalent priority.
   * @param node1 the first equivalent node.
   * @param node2 the second equivalent node.
   */
  swapPositions(node1: T, node2: T): void;
}
