import {IDrawingManager} from '../drawing/SimpleDrawingManager';
import {flatMap} from '../geometricmath/Utility';

import {IDoodleGenome} from './DoodleGenome';
import {DoodleLocalSignal} from './DoodleLocalSignal';
import {Drawable, DrawableDoodle, Loggable} from './DoodlePart';
import {PressedDoodle} from './PressedDoodle';

export interface RootPart {
  grow(
      updateRootCharacteristics:
          (rootCharacteristics: DoodleLocalSignal) => DoodleLocalSignal):
      DrawableRoot;
  lightParts(): PressedDoodle[];
}
export type DrawableRoot = RootPart&Drawable&Loggable;

export class DoodleRoot implements DrawableRoot {
  private rootCharacteristics: DoodleLocalSignal;
  private doodleGenome: IDoodleGenome;
  private children: DrawableDoodle[];
  constructor(
      rootCharacteristics: DoodleLocalSignal, doodleGenome: IDoodleGenome,
      children: DrawableDoodle[]) {
    this.rootCharacteristics = rootCharacteristics;
    this.doodleGenome = doodleGenome;
    this.children = children;
  }

  grow(updateRootCharacteristics): DrawableRoot {
    const newChildren =
        this.children.map(c => c.grow(this.rootCharacteristics));
    return new DoodleRoot(
        updateRootCharacteristics(this.rootCharacteristics), this.doodleGenome,
        newChildren);
  }

  draw(drawingManager: IDrawingManager) {
    this.children.forEach(child => child.draw(drawingManager));
  }

  log() {
    console.log(this);
    this.children.forEach(child => child.log());
  }

  lightParts(): PressedDoodle[] {
    return flatMap(this.children, c => c.lightParts());
  }
}