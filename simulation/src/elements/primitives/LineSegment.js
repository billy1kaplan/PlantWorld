"use strict";
exports.__esModule = true;
var Optional_1 = require("Optional");
var Line_1 = require("./Line");
var Point_1 = require("./Point");
var LineSegment = /** @class */ (function () {
    function LineSegment(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        if (!this.isFlipOrder(p1, p2)) {
            this.p1 = p1;
            this.p2 = p2;
        }
        else {
            this.p1 = p2;
            this.p2 = p1;
        }
    }
    LineSegment.prototype.draw = function (drawingManager) {
        drawingManager.drawLine(this.p1, this.p2);
    };
    LineSegment.prototype.erase = function (drawingManager) {
        drawingManager.eraseLine(this.p1, this.p2);
    };
    LineSegment.prototype.getDistance = function (origin) {
        var slope = this.getSlope();
        var perpendicularSlope = this.perpendicularSlope();
        if (slope == Infinity) {
            return this.horizontalLineSelect(origin);
        }
        else if (Math.abs(perpendicularSlope) == Infinity) {
            return this.verticalLineSelect(origin);
        }
        else {
            return this.ProjectToLine(origin);
        }
    };
    LineSegment.prototype.getSlope = function () {
        var deltaY = (this.p2.getY() - this.p1.getY());
        var deltaX = (this.p2.getX() - this.p1.getX());
        return deltaY / deltaX;
    };
    LineSegment.prototype.perpendicularSlope = function () {
        var slope = this.getSlope();
        return -1 / slope;
    };
    LineSegment.prototype.verticalLineSelect = function (origin) {
        if (origin.getX() > this.p1.getX() && origin.getX() < this.p2.getX()) {
            return origin.distanceTo(new Point_1.Point(origin.getX(), this.p1.getY()));
        }
        else {
            return this.minDistance(origin);
        }
    };
    LineSegment.prototype.horizontalLineSelect = function (origin) {
        if ((origin.getY() > this.p1.getY() && origin.getY() < this.p2.getY()) ||
            (origin.getY() > this.p2.getY() && origin.getY() < this.p1.getY())) {
            return origin.distanceTo(new Point_1.Point(this.p1.getX(), origin.getY()));
        }
        else {
            return this.minDistance(origin);
        }
    };
    LineSegment.prototype.ProjectToLine = function (point) {
        var slope = this.getSlope();
        var perpendicularSlope = this.perpendicularSlope();
        var b1 = -this.p1.getX() * slope + this.p1.getY();
        var b2 = -point.getX() * perpendicularSlope + point.getY();
        var newX = (b2 - b1) / (slope - perpendicularSlope);
        var newY = point.getY() + perpendicularSlope * (newX - point.getX());
        var minDistanceFromEnds = this.minDistance(point);
        var distanceFromLine = point.distanceTo(new Point_1.Point(newX, newY));
        if (newX > this.p1.getX() && newX < this.p2.getX()) {
            return distanceFromLine;
        }
        else {
            return minDistanceFromEnds;
        }
    };
    LineSegment.prototype.isFlipOrder = function (p1, p2) {
        return (p2.getX() < p1.getX());
    };
    LineSegment.prototype.minDistance = function (point) {
        var p1Distance = this.p1.distanceTo(point);
        var p2Distance = this.p2.distanceTo(point);
        if (p1Distance < p2Distance) {
            return p1Distance;
        }
        else {
            return p2Distance;
        }
    };
    LineSegment.prototype.distanceTo = function (other) {
        return other.distanceToLineSegment(this);
    };
    LineSegment.prototype.distanceToPoint = function (point) {
        throw new Error('Method not implemented.');
    };
    LineSegment.prototype.distanceToLine = function (line) {
        throw new Error('Method not implemented.');
    };
    LineSegment.prototype.distanceToLineSegment = function (lineSegment) {
        return 0;
    };
    LineSegment.prototype.distanceToVerticalLine = function (verticalLine) {
        return 0;
    };
    LineSegment.prototype.intersection = function (lineSegment) {
        return Optional_1.Optional.of(new Point_1.Point(1, 1));
    };
    LineSegment.prototype.atPoint = function (x) {
        if (!(this.p1.getX() <= x && this.p2.getX() >= x)) {
            return Optional_1.Optional.empty();
        }
        var lineForm = Line_1.Line.fromTwoPoints(this.p1, this.p2);
        return Optional_1.Optional.of(lineForm.evaluate(x));
    };
    LineSegment.prototype.overlap = function (other) {
        if ((this.p2.getX() < other.p1.getX()) ||
            (this.p1.getX() > other.p1.getX())) {
            return Optional_1.Optional.empty();
        }
        var intersection = this.intersection(other);
        if (intersection.isPresent()) {
            var overlapFromAnchor = this.overlapFromAnchor(new LineSegment(other.p1, intersection.getOrError()));
            if (overlapFromAnchor.isPresent()) {
                return overlapFromAnchor;
            }
            else {
                return this.overlapFromAnchor(new LineSegment(intersection.getOrError(), other.p2));
            }
            ;
        }
        else {
            return this.overlapFromAnchor(other);
        }
    };
    LineSegment.prototype.equals = function (other) {
        return this.p1.equals(other.p1) && this.p2.equals(other.p2);
    };
    LineSegment.prototype.overlapFromAnchor = function (other) {
        // key points
        var key1 = other.atPoint(this.p1.getX());
        var key2 = other.atPoint(this.p2.getX());
        var key3 = this.atPoint(other.p1.getX());
        var key4 = this.atPoint(other.p2.getX());
        var first;
        if (key1.isPresent() && key1.getOrError() > this.p1.getY()) {
            first = this.p1.getX();
        }
        else if (key3.isPresent && other.p2.getY() > key3.getOrError()) {
            first = other.p1.getX();
        }
        var firstOpt = Optional_1.Optional.of(first);
        var second;
        if (firstOpt.isPresent()) {
            if (key2.isPresent && key2.getOrError() > this.p2.getY()) {
                second = this.p2.getX();
            }
            else if (key4.isPresent && other.p2.getY() > key3.getOrError()) {
                second = other.p2.getX();
            }
        }
        var p1 = new Point_1.Point(first, this.atPoint(first).getOrError());
        var p2 = new Point_1.Point(second, this.atPoint(second).getOrError());
        return firstOpt.map(function (f) { return Optional_1.Optional.of(new LineSegment(p1, p2)); })
            .getOrElse(Optional_1.Optional.empty());
    };
    LineSegment.prototype.getP1 = function () {
        return this.p1;
    };
    LineSegment.prototype.getP2 = function () {
        return this.p2;
    };
    return LineSegment;
}());
exports.LineSegment = LineSegment;
