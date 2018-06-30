"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Utility class for representing 'Optional' values.
 */
var Optional = /** @class */ (function () {
    function Optional(value, isPresentValue) {
        this.value = value;
        this.isPresentValue = isPresentValue;
    }
    /**
     * Static factory for Optional.
     * @param value represented as an Optional value by this class
     * @returns an Optional instance encapsulating the provided value.
     */
    Optional.of = function (value) {
        if (Optional.isUndefined(value)) {
            return this.EMPTY;
        }
        else {
            return new Optional(value, true);
        }
    };
    /**
     * Returns an empty optional instance.
     */
    Optional.empty = function () {
        return this.EMPTY;
    };
    Optional.isUndefined = function (val) {
        return val === undefined || val === null;
    };
    /**
     * Returns true if the value encapsulated by the optional
     * meets the criteria specified in Optional::isUndefined.
     * @returns true if value is Optional value is present
     */
    Optional.prototype.isPresent = function () {
        return this.isPresentValue;
    };
    /**
     * Maps Optional<T> to some other Optional<S>.
     * @param f a function mapping from T to some new type S
     * @returns Empty if this Optional is empty or an Optional
     * instance wrapping the mapped value
     */
    Optional.prototype.map = function (f) {
        if (this.isPresentValue) {
            return Optional.of(f(this.value));
        }
        else {
            return Optional.empty();
        }
    };
    /**
     * Binds optional to a new value.
     * @param f a function that maps from T to an Optional<S>
     * @returns Empty if either this Optional or the Optional mapped to
     * by f are Empty. Otherwise, creates a new Optional<S>
     */
    Optional.prototype.flatMap = function (f) {
        if (this.isPresentValue) {
            return f(this.value);
        }
        else {
            return Optional.empty();
        }
    };
    /**
     * Passes the Optional value for consumption if present,
     * otherwise does nothing.
     * @param f function to consume Optional value
     */
    Optional.prototype.ifPresent = function (f) {
        if (this.isPresentValue) {
            f(this.value);
        }
    };
    /**
     * Gets the Optional value if present, Otherwise
     * returns the fallback value.
     * @param fallback default value if the Optional is not present
     * @returns value if present. Otherwise, fallback value.
     */
    Optional.prototype.getOrElse = function (fallback) {
        return this.isPresentValue ? this.value : fallback;
    };
    /**
     * Gets the Optional value if present or raises an error.
     * @returns value if present. Otherwise, error.
     */
    Optional.prototype.getOrError = function () {
        if (!this.isPresentValue) {
            throw new Error('GetOrError: Attempting to access null value from Optional');
        }
        else {
            return this.value;
        }
    };
    Optional.EMPTY = new Optional(undefined, false);
    return Optional;
}());
exports.Optional = Optional;
