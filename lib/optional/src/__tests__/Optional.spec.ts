import 'jasmine';
import { Optional } from '../Optional';

describe('Optional', () => {
    describe('Optional Initialization', () => {
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
    });

    describe('Optional map function', () => {
        it('Performs map operation when value is present', () => {
            const optional = Optional.of(1);
            expect(optional.map((x) => x + 1)).toEqual(Optional.of(2));
        });

        it('Returns empty when not present', () => {
            const optional = Optional.empty();
            expect(optional.map((x) => x + 1)).toEqual(Optional.empty());
        });
    });

    describe('Optional flatmap function', () => {
        it('Performs flatmap operation when present', () => {
            const optional = Optional.of(1);
            expect(optional.map((x) => x + 1)).toEqual(Optional.of(2));
        });

        it('Empty if flatmap function returns empty', () => {
            const optional = Optional.of(1);
            const result = optional.flatMap((x) => Optional.empty());
            expect(result).toBe(Optional.empty());
        });
    });

    describe('Optional fallback get', () => {
        it('Performs fallback when not available', () => {
            const optional = Optional.empty();
            expect(optional.getOrElse(2)).toBe(2);
        });
    });

    describe('ifPresent function', () => {
        let spy;
        beforeEach(() => {
            const f = (val) => undefined;
            spy = jasmine.createSpy('No Op Consumer', f);
        });

        it('Calls method when present', () => {
            const optional = Optional.of(1);
            optional.ifPresent(spy);
            expect(spy).toHaveBeenCalled();
        });

        it('Does not call consumer when not present', () => {
            const optional = Optional.empty();
            optional.ifPresent(spy);
            expect(spy).toHaveBeenCalledTimes(0);
        });
    });

    describe('Optional getOrError', () => {
        it('Raises an error when attempting to access an empty value', () => {
            const optional = Optional.empty();
            expect(optional.getOrError).toThrow();
        });
    });
});
