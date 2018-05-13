"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Optional = /** @class */ (function () {
    function Optional(value) {
        this.value = value;
    }
    Optional.of = function (value) {
        return new Optional(value);
    };
    Optional.empty = function () {
        return new Optional(undefined);
    };
    Optional.prototype.isPresent = function () {
        return this.value != undefined;
    };
    Optional.prototype.map = function (f) {
        if (this.isPresent()) {
            return Optional.of(f(this.value));
        }
        else {
            return Optional.empty();
        }
    };
    Optional.prototype.getOrElse = function (fallback) {
        return this.isPresent ? this.value : fallback;
    };
    Optional.prototype.ifPresent = function (f) {
        f(this.value);
    };
    Optional.prototype.getOrError = function () {
        if (!this.isPresent) {
            throw new Error('Attempting to access null value');
        }
        return this.value;
    };
    return Optional;
}());
exports.Optional = Optional;
