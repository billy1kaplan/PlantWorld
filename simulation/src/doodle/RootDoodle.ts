
import {IDoodleGenome} from './DoodleGenome';
import {DoodleCharacteristics, DoodleLocalSignal} from './DoodleLocalSignal';
import {LocalPoint} from './DoodleLocation';
import {DoodlePart} from './DoodlePart';
import {Visitor} from './Visitor';

export interface RootPart {
  grow(energy: number);
  visit<T>(visitor: Visitor<T>): void;
}

export class DoodleRoot implements RootPart {
  private rootPoint: LocalPoint;
  private rootCharacteristics: DoodleCharacteristics; 
  private age: number;
  private doodleGenome: IDoodleGenome;
  private children: DoodlePart[];
  constructor(rootPoint: LocalPoint,
              rootCharacteristics: DoodleCharacteristics,
              age: number,
              doodleGenome: IDoodleGenome,
              children: DoodlePart[]) {
    this.rootPoint = rootPoint;
    this.rootCharacteristics = rootCharacteristics;
    this.age = age;
    this.doodleGenome = doodleGenome;
    this.children = children;
  }

  grow(energy: number): RootPart {
    const propagateSignal = DoodleLocalSignal.rootSignal(this.rootPoint);
    const newChildren = this.children.map(c => c.grow(propagateSignal));
    return new DoodleRoot(this.rootPoint,
                          this.rootCharacteristics,
                          this.age + 1,
                          this.doodleGenome,
                          newChildren);
  }

  visit<T>(visitor: Visitor<T>) {
    visitor.visitRoot(this);
    this.children.forEach(child => child.visit(visitor));
  }
}