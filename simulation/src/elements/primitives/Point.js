"use strict";
exports.__esModule = true;
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
        this.x = x;
        this.y = y;
    }
    Point.fromRadiusAngle = function (radius, angle) {
        var x = radius * Math.cos(Point.toRadians(angle));
        var y = radius * Math.sin(Point.toRadians(angle));
        return new Point(x, y);
    };
    Point.toRadians = function (angle) {
        return (2 * Math.PI) / 360 * angle;
    };
    Point.prototype.distanceTo = function (other) {
        return other.distanceToPoint(this);
    };
    Point.prototype.distanceToPoint = function (point) {
        var square = function (n) { return n * n; };
        return Math.sqrt(square(this.x - point.x) + square(this.y - point.y));
    };
    Point.prototype.distanceToLine = function (line) {
        return line.distanceToPoint(this);
    };
    Point.prototype.distanceToLineSegment = function (lineSegment) {
        return lineSegment.distanceToPoint(this);
    };
    Point.prototype.distanceToVerticalLine = function (verticalLine) {
        return this.distanceToPoint(this);
    };
    Point.prototype.getX = function () {
        return this.x;
    };
    Point.prototype.getY = function () {
        return this.y;
    };
    Point.prototype.equals = function (other) {
        return this.getX() == other.getX() && this.getY() == other.getY();
    };
    return Point;
}());
exports.Point = Point;
