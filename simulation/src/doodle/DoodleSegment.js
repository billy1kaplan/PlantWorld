"use strict";
exports.__esModule = true;
var DoodleSegment = /** @class */ (function () {
    function DoodleSegment(nextPart, lineSegment, visible) {
        this.nextPart = nextPart;
        this.lineSegment = lineSegment;
        this.visible = visible;
    }
    DoodleSegment.of = function (nextPart, lineSegment) {
        return new DoodleSegment(nextPart, lineSegment, []);
    };
    DoodleSegment.prototype.children = function () {
        return [this.nextPart];
    };
    DoodleSegment.prototype.update = function (visible) {
        this.visible = visible;
    };
    DoodleSegment.prototype.intersect = function (other) {
        return this.lineSegment.intersection(other.lineSegment);
    };
    DoodleSegment.prototype.overlap = function (other) {
        return this.lineSegment.overlap(other.lineSegment);
    };
    DoodleSegment.prototype.collectEnergy = function (sun) {
        var energy = this.visible.map(function (a) { return sun.energyFunctionFromLineSegment(a); })
            .reduce(function (a, b) { return a + b; }, 0);
        console.log(energy);
    };
    DoodleSegment.prototype.getSegment = function () {
        return this.lineSegment;
    };
    DoodleSegment.prototype.grow = function () {
        return this.nextPart.grow();
    };
    DoodleSegment.prototype.print = function () {
        console.log(this);
        this.nextPart.print();
    };
    DoodleSegment.prototype.getLine = function () {
        return this.lineSegment;
    };
    return DoodleSegment;
}());
exports.DoodleSegment = DoodleSegment;
