/**
 * Contains the walkable directions from the BST node.
 */
export class TreeDirection {
    public static LEFT = new TreeDirection(() => TreeDirection.RIGHT);
    public static RIGHT = new TreeDirection(() => TreeDirection.LEFT);

    private flipFunction: () => TreeDirection;

    private constructor(flipFunction: () => TreeDirection) {
        this.flipFunction = flipFunction;
    }

    public flip(): TreeDirection {
        return this.flipFunction();
    }
}
