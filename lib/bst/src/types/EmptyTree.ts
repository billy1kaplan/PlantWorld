export class EmptyTree {
  public static getInstance(): EmptyTree {
    return this.emptyTree;
  }

  private static emptyTree: EmptyTree = new EmptyTree();

  public kind: 'empty';

  private constructor() {
    this.kind = 'empty';
  }

  public walkLeft(): EmptyTree {
    return this;
  }

  public walkRight(): EmptyTree {
    return this;
  }

  public getLevel() {
    return 0;
  }
}
