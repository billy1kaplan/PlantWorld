"use strict";
exports.__esModule = true;
var Line_1 = require("../elements/primitives/Line");
var Sun = /** @class */ (function () {
    function Sun(intensity, height) {
        this.intensity = intensity;
        this.height = height;
    }
    Sun.prototype.energyFunctionFromLineSegment = function (lineSegment) {
        return this.energyFunction(lineSegment.p1, lineSegment.p2);
    };
    Sun.prototype.energyFunction = function (p1, p2) {
        var line = Line_1.Line.fromTwoPoints(p1, p2);
        var slope = -line.getSlope();
        var intercept = this.height - line.getIntercept();
        var integrate = function (x) { return -1 / (slope * (intercept + slope * x)); };
        if (slope == 0) {
            return this.intensity *
                Math.abs((p2.getX() - p1.getX()) / (intercept * intercept));
        }
        else {
            return this.intensity *
                Math.abs(integrate(p2.getX()) - integrate(p1.getX()));
        }
    };
    return Sun;
}());
exports.Sun = Sun;
