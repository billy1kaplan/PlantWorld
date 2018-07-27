import { IVisitor } from "./doodlevisitor/IVisitor";

export interface IRootPart {
  grow(energy: number);
  visit<T>(visitor: IVisitor<T>): void;
}
