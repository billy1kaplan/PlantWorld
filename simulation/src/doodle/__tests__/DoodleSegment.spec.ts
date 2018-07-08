import 'mocha';

/*
describe('Visible segments test', () => {
  it('Should construct the segment of appropriate visibility', () => {
    const lineSegment = new LineSegment(new Point(0, 0), new Point(1, 1));
    const expected = new DoodleSegment(lineSegment, [lineSegment]);
    const actual = new DoodleSegment(lineSegment, []).visibleSubsegments([]);
    assertEqualsJson(expected, actual);
  });

  it('Should construct the segment of appropriate visibility', () => {
    const lineSegment = new LineSegment(new Point(0, 0), new Point(1, 0));
    const blocker = new LineSegment(new Point(0.5, 0), new Point(1, 0));
    const expectedVisible = new LineSegment(new Point(0, 0), new Point(0.5, 0));
    const expected = new DoodleSegment(lineSegment, [expectedVisible]);
    const actual =
        new DoodleSegment(lineSegment, []).visibleSubsegments([blocker]);
    assertEqualsJson(expected, actual);
  });

  it('Should construct the segment of appropriate visibility', () => {
    const lineSegment = new LineSegment(new Point(0, 0), new Point(1, 0));
    const blockers = [
      new LineSegment(new Point(0, 0), new Point(0.25, 0)),
      new LineSegment(new Point(0.5, 0), new Point(0.75, 0))
    ];
    const expectedVisible = [
      new LineSegment(new Point(0.75, 0), new Point(1, 0)),
      new LineSegment(new Point(0.25, 0), new Point(0.5, 0)),
    ];
    const expected = new DoodleSegment(lineSegment, expectedVisible);
    const actual =
        new DoodleSegment(lineSegment, []).visibleSubsegments(blockers);
    assertEqualsJson(expected, actual);
  });
});

const assertEqualsJson = (actual: any, expected: any) => {
  expect(JSON.stringify(expected)).to.equal(JSON.stringify(actual));
}
*/
