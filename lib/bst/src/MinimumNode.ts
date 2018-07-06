import { IBalanceableNode } from "./IBalanceableNode";

export class MinimumNode implements IBalanceableNode<MinimumNode> {
    public static getInstance(): MinimumNode {
        return this.instance;
    }

    private static instance = new MinimumNode();

    equals(other: MinimumNode): boolean {
        return false;
    }

    getPriority(): number {
        return -Infinity;
    }
}