
import { IDoodleGenome } from './DoodleGenome';
import { DoodleLocalSignal } from './DoodleLocalSignal';
import { DoodlePart } from './DoodlePart';
import { Visitor } from './Visitor';

export interface RootPart {
  grow(energy: number);
  visit<T>(visitor: Visitor<T>): void;
}

export class DoodleRoot implements RootPart {
  private rootCharacteristics: DoodleLocalSignal;
  private doodleGenome: IDoodleGenome;
  private children: DoodlePart[];
  constructor(rootCharacteristics: DoodleLocalSignal,
    doodleGenome: IDoodleGenome,
    children: DoodlePart[]) {
    this.rootCharacteristics = rootCharacteristics;
    this.doodleGenome = doodleGenome;
    this.children = children;
  }

  grow(energy: number): RootPart {
    const updatedRoot = this.rootCharacteristics.feed(energy);
    const newChildren =
      this.children.map(c => c.grow(this.rootCharacteristics));
    return new DoodleRoot(
      this.rootCharacteristics, this.doodleGenome,
      newChildren);
  }

  visit<T>(visitor: Visitor<T>) {
    visitor.visitRoot(this);
    this.children.forEach(child => child.visit(visitor));
  }
}