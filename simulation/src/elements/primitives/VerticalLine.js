"use strict";
exports.__esModule = true;
var VerticalLine = /** @class */ (function () {
    function VerticalLine(x) {
        this.x = x;
    }
    VerticalLine.prototype.distanceTo = function (other) {
        return other.distanceToVerticalLine(this);
    };
    VerticalLine.prototype.distanceToPoint = function (point) {
        return Math.abs(this.x - point.getX());
    };
    VerticalLine.prototype.distanceToLineSegment = function (lineSegment) {
        return lineSegment.distanceToVerticalLine(this);
    };
    VerticalLine.prototype.distanceToLine = function (line) {
        return line.distanceToVerticalLine(this);
    };
    VerticalLine.prototype.distanceToVerticalLine = function (verticalLine) {
        return Math.abs(this.x - verticalLine.getX());
    };
    VerticalLine.prototype.getX = function () {
        return this.x;
    };
    VerticalLine.prototype.evaluate = function (x) {
        throw new Error('Method not implemented.');
    };
    VerticalLine.prototype.getSlope = function () {
        throw new Error('Method not implemented.');
    };
    VerticalLine.prototype.getIntercept = function () {
        throw new Error('Method not implemented.');
    };
    return VerticalLine;
}());
exports.VerticalLine = VerticalLine;
