"use strict";
exports.__esModule = true;
var SpokePart = /** @class */ (function () {
    function SpokePart(genome, doodleSegments) {
        this.genome = genome;
        this.doodleSegments = doodleSegments;
    }
    SpokePart.prototype.grow = function () {
        var newSegments = this.doodleSegments.map(function (segment) { return segment.grow(); });
        return new SpokePart(this.genome, newSegments);
    };
    SpokePart.prototype.children = function () {
        return this.doodleSegments;
    };
    SpokePart.prototype.print = function () {
        console.log(this);
        this.doodleSegments.forEach(function (e) { return e.print(); });
    };
    return SpokePart;
}());
exports.SpokePart = SpokePart;
