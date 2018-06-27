import 'jasmine';
import {Optional} from '../Optional';

describe('Optional', () => {
  it('Creates an empty optional when passed null', () => {
      const optional = Optional.of(null);
      expect(optional.isPresent()).toBe(false);
  });

  it('Creates an empty optional when passed undefined', () => {
      const optional = Optional.of(undefined);
      expect(optional.isPresent()).toBe(false);
  });

  it('Creates an optional with a value when passed a valid input', () => {
      const optional = Optional.of(1);
      expect(optional.isPresent()).toBe(true);
  });

  it('Performs map operation when present', () => {
      const optional = Optional.of(1);
      assertEqualsJson(optional.map(x => x + 1), Optional.of(2));
  });

  it('Returns empty when not present', () => {
      const optional = Optional.empty();
      assertEqualsJson(optional.map(x => x + 1), Optional.empty());
  });

  it('Performs flatmap operation when present', () => {
      const optional: Optional<number> = Optional.of(1);
      assertEqualsJson(optional.flatMap(x => Optional.of(x + 1)), Optional.of(2));
  });

  it('Performs fallback when not available', () => {
      const optional = Optional.empty();
      expect(optional.getOrElse(2)).toBe(2);
  });

  const assertEqualsJson = (actual: any, expected: any) => {
    expect(JSON.stringify(expected)).toBe(JSON.stringify(actual));
  }
});