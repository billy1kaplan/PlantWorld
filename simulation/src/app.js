"use strict";
exports.__esModule = true;
var DoodleSegment_1 = require("./doodle/DoodleSegment");
var canvas;
var ctx;
var drawPlant = function (root) {
    if (root instanceof DoodleSegment_1.DoodleSegment) {
        var line = root.getLine();
        var p1 = line.getP1();
        var p2 = line.getP2();
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.moveTo(p1.x, p1.y);
        ctx.lineWidth = 5;
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }
};
function simulationLoop() {
    requestAnimationFrame(simulationLoop);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 1280, 720);
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.moveTo(10, 10);
    ctx.lineWidth = 5;
    ctx.lineTo(400, 400);
    ctx.stroke();
}
window.onload = function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    simulationLoop();
};
