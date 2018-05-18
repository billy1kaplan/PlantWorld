"use strict";
exports.__esModule = true;
var LineSegment_1 = require("../elements/primitives/LineSegment");
var EnergyBoard = /** @class */ (function () {
    function EnergyBoard(sun) {
        this.sun = sun;
        this.visibleSegments = new VisibleSegments([]);
    }
    EnergyBoard.prototype.insertSegment = function (doodleSegment) {
        this.visibleSegments.insertSegment(doodleSegment);
    };
    EnergyBoard.prototype.distributeEnergy = function () {
        var _this = this;
        this.visibleSegments.getSeg().forEach(function (element) {
            element.collectEnergy(_this.sun);
        });
    };
    return EnergyBoard;
}());
exports.EnergyBoard = EnergyBoard;
var VisibleSegments = /** @class */ (function () {
    function VisibleSegments(doodleSegments) {
        this.doodleSegments = doodleSegments;
    }
    VisibleSegments.prototype.insertSegment = function (doodleSegment) {
        var nowVisible = [];
        this.doodleSegments.unshift(doodleSegment);
        for (var i = 0; i < this.doodleSegments.length; i++) {
            var currentSegment = this.doodleSegments[i];
            var blockedIntervals = [];
            for (var j = 0; j < this.doodleSegments.length; j++) {
                if (i == j) {
                    continue;
                }
                var otherSegment = this.doodleSegments[j];
                currentSegment.overlap(otherSegment)
                    .ifPresent(function (value) { return blockedIntervals.unshift(value); });
            }
            var visible = this.visibleSubsegments(currentSegment.getSegment(), blockedIntervals);
            var segment = currentSegment.update(visible);
        }
    };
    VisibleSegments.prototype.visibleSubsegments = function (lineSegment, blockedIntervals) {
        var start = new LineSegment_1.LineSegment(lineSegment.p1, lineSegment.p1);
        var end = new LineSegment_1.LineSegment(lineSegment.p2, lineSegment.p2);
        var segmentsWithEnd = [start].concat(blockedIntervals, [end]);
        var sortedSegments = segmentsWithEnd.sort(function (a, b) {
            var diff = a.p1.getX() - b.p1.getX();
            if (diff == 0) {
                return a.p2.getX() - b.p2.getX();
            }
            else {
                return diff;
            }
        });
        var visible = [];
        var lastHigh = start.p1;
        for (var i = 0; i < sortedSegments.length; i++) {
            var low = sortedSegments[i].p1;
            if (lastHigh.getX() < low.getX()) {
                visible.unshift(new LineSegment_1.LineSegment(lastHigh, low));
            }
            var newHigh = sortedSegments[i].p2;
            if (newHigh.getX() > lastHigh.getX()) {
                lastHigh = newHigh;
            }
        }
        return visible;
    };
    VisibleSegments.prototype.getSeg = function () {
        return this.doodleSegments;
    };
    return VisibleSegments;
}());
exports.VisibleSegments = VisibleSegments;
