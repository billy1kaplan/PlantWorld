import { DoodleCharacteristics } from './DoodleCharacteristics';
import { DoodleLocalSignal } from './DoodleLocalSignal';
import { IVisitor } from './doodlevisitor/IVisitor';
import { IDoodleGenome } from './genomes/DoodleGenome';
import { IDoodlePart } from './IDoodlePart';
import { ILocalPoint } from './location/ILocalPoint';
import { IRootPart } from './IRootPart';

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
    const propagateSignal =
      DoodleLocalSignal.rootSignal(this.rootPoint).feed(energy);
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
