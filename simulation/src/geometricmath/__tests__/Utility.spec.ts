import 'mocha';

import {expect} from 'chai';
import {sin} from '../Utility';

describe('Visible segments test', () => {
  const delta = 1E-15;
  it('Correctly compute negative angles', () => {
    const res = sin(-180);
    expect(res, 'Distance from point exceeded').to.be.closeTo(0, delta);
  });

  it('Correctly compute negative angles', () => {
    const res = sin(-30);
    expect(res, 'Distance from point exceeded').to.be.closeTo(-0.5, delta);
  });
});