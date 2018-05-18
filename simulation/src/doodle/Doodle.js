"use strict";
exports.__esModule = true;
var Doodle = /** @class */ (function () {
    function Doodle(initialEnergy) {
        this.energyLevel = initialEnergy;
        this.components = [];
    }
    Doodle.prototype.act = function (energyBoard) {
        energyBoard.insertSegment(this.createSegment());
    };
    Doodle.prototype.createSegment = function () {
        console.log(this.energyLevel);
        var a = this.energyLevel * Math.random();
        var b = this.energyLevel * Math.random();
        return null; // DoodleSegment.of(
        // this, new LineSegment(new Point(0.5, 0.5), new Point(a,
        // b)));
    };
    Doodle.prototype.collectEnergy = function (energy) {
        this.energyLevel += energy;
    };
    return Doodle;
}());
exports.Doodle = Doodle;
