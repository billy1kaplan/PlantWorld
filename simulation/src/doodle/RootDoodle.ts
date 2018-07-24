import { DoodleCharacteristics } from './DoodleCharacteristics';
import { IDoodleGenome } from './DoodleGenome';
import { DoodleLocalSignal } from './DoodleLocalSignal';
import { ILocalPoint } from './DoodleLocation';
import { IDoodlePart } from './IDoodlePart';
import { IVisitor } from './Visitor';

export interface IRootPart {
  grow(energy: number);
  visit<T>(visitor: IVisitor<T>): void;
}

export class DoodleRoot implements IRootPart {
  private rootPoint: ILocalPoint;
  private rootCharacteristics: DoodleCharacteristics;
  private age: number;
  private doodleGenome: IDoodleGenome;
  private children: IDoodlePart[];
  constructor(rootPoint: ILocalPoint,
              rootCharacteristics: DoodleCharacteristics,
              age: number,
              doodleGenome: IDoodleGenome,
              children: IDoodlePart[]) {
    this.rootPoint = rootPoint;
    this.rootCharacteristics = rootCharacteristics;
    this.age = age;
    this.doodleGenome = doodleGenome;
    this.children = children;
  }

  public grow(energy: number): IRootPart {
    const propagateSignal = DoodleLocalSignal.rootSignal(this.rootPoint);
    const newChildren = this.children.map((child) => child.grow(propagateSignal));
    return new DoodleRoot(this.rootPoint,
                          this.rootCharacteristics,
                          this.age + 1,
                          this.doodleGenome,
                          newChildren);
  }

  public visit<T>(visitor: IVisitor<T>) {
    visitor.visitRoot(this);
    this.children.forEach((child) => child.visit(visitor));
  }
}
