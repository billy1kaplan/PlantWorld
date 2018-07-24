/**
 * Stores a pair of elements.
 */
export class Pair<A, B> {
  /**
   * Gets an instance of pair.
   * @param fst the first object of the pair
   * @param snd the second object of the pair
   */
  constructor(public fst: A, public snd: B) {}
}
