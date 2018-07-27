import {Line} from '../elements/primitives/Line';
import {LineSegment} from '../elements/primitives/LineSegment';
import {Point} from '../elements/primitives/Point';

/**
 * Represents the sun, the life giving force for our doodles.
 */
export class Sun {
  private intensity: number;
  private height: number;

  constructor(intensity: number, height: number) {
    this.intensity = intensity;
    this.height = height;
  }

  /**
   * Determines the energy provided to the given segments.
   * @param lineSegment a segment that can absorb energy
   */
  public energyFunctionFromLineSegment(lineSegment: LineSegment) {
    const mag = lineSegment.magnitude();
    return mag * this.intensity;
  }

  /**
   * Integral of energy across the points. 
   * @param p1 first point
   * @param p2 second point
   */
  public energyFunction(p1: Point, p2: Point) {
    const line = Line.fromTwoPoints(p1, p2);
    const slope = -line.getSlope();
    const intercept = this.height - line.getIntercept();
    const integrate = (x: number) => -1 / (slope * (intercept + slope * x));
    if (slope === 0) {
      return this.intensity *
          Math.abs((p2.getX() - p1.getX()) / (intercept * intercept));
    } else {
      return this.intensity *
          Math.abs(integrate(p2.getX()) - integrate(p1.getX()));
    }
  }
}
