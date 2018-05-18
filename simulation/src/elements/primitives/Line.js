"use strict";
exports.__esModule = true;
var Point_1 = require("./Point");
var VerticalLine_1 = require("./VerticalLine");
var Line = /** @class */ (function () {
    function Line(slope, intercept) {
        this.slope = slope;
        this.intercept = intercept;
    }
    Line.fromTwoPoints = function (p1, p2) {
        var slope = (p2.getY() - p1.getY()) / (p2.getX() - p1.getX());
        return this.fromPointSlope(slope, p1);
    };
    Line.fromPointSlope = function (slope, point) {
        var intercept = -point.getX() * slope + point.getY();
        if (Math.abs(slope) == Infinity) {
            return new VerticalLine_1.VerticalLine(point.getX());
        }
        else {
            return new Line(slope, intercept);
        }
    };
    Line.fromSlopeIntercept = function (slope, intercept) {
        return new Line(slope, intercept);
    };
    Line.prototype.evaluate = function (x) {
        return this.slope * x + this.intercept;
    };
    Line.prototype.evaluate1 = function (x) {
        return this.slope * x + this.intercept;
    };
    Line.prototype.distanceTo = function (other) {
        return other.distanceToLine(this);
    };
    Line.prototype.distanceToPoint = function (point) {
        if (point.distanceToPoint(new Point_1.Point(point.getX(), this.evaluate(point.getX()))) == 0) {
            return 0;
        }
        var xA = point.getX() - 1;
        var xB = point.getX() + 1;
        var pointA = new Point_1.Point(xA, this.evaluate(xA));
        var pointB = new Point_1.Point(xB, this.evaluate(xB));
        var A = pointA.distanceTo(point);
        var B = pointB.distanceTo(point);
        var C = pointA.distanceTo(pointB);
        var square = function (n) { return n * n; };
        return (square(A) + square(C) - square(B)) / (2 * C);
    };
    Line.prototype.distanceToLine = function (line) {
        if (this.slope == line.slope) {
            return this.distanceToPoint(new Point_1.Point(0, line.evaluate(0)));
        }
        else {
            return 0;
        }
    };
    Line.prototype.distanceToLineSegment = function (lineSegment) {
        return lineSegment.distanceToLine(this);
    };
    Line.prototype.distanceToVerticalLine = function (verticalLine) {
        return 0;
    };
    Line.prototype.getSlope = function () {
        return this.slope;
    };
    Line.prototype.getIntercept = function () {
        return this.intercept;
    };
    return Line;
}());
exports.Line = Line;
