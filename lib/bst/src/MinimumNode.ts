import {IBalanceableNode} from './IBalanceableNode';

export class MinimumNode implements IBalanceableNode {
    public static getInstance(): MinimumNode {
        return this.instance;
    }

    private static instance = new MinimumNode();

    public equals(other: MinimumNode): boolean {
        return false;
    }

    public getPriority(): number {
        return NaN;
    }
}
