"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Optional = /** @class */ (function () {
    function Optional(value) {
        this.value = value;
    }
    Optional.of = function (value) {
        if (Optional.isUndefined(value)) {
            return this.EMPTY;
        }
        else {
            return new Optional(value);
        }
    };
    Optional.empty = function () {
        return this.EMPTY;
    };
    Optional.prototype.isPresent = function () {
        return !Optional.isUndefined(this.value);
    };
    Optional.isUndefined = function (val) {
        return val === undefined || val === null;
    };
    Optional.prototype.map = function (f) {
        if (this.isPresent()) {
            return Optional.of(f(this.value));
        }
        else {
            return Optional.empty();
        }
    };
    Optional.prototype.flatMap = function (f) {
        if (this.isPresent()) {
            return f(this.value);
        }
        else {
            return Optional.empty();
        }
    };
    Optional.prototype.getOrElse = function (fallback) {
        return this.isPresent() ? this.value : fallback;
    };
    Optional.prototype.ifPresent = function (f) {
        if (this.isPresent) {
            f(this.value);
        }
    };
    Optional.prototype.getOrError = function () {
        if (!this.isPresent) {
            throw new Error('Attempting to access null value');
        }
        else {
            return this.value;
        }
    };
    Optional.EMPTY = new Optional(undefined);
    return Optional;
}());
exports.Optional = Optional;
