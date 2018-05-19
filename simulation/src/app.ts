import {DoodlePart} from './doodle/DoodlePart';
import {DoodleSegment, IDoodleSegment} from './doodle/DoodleSegment';

var canvas: HTMLCanvasElement;
var ctx: CanvasRenderingContext2D;

const drawPlant = (root: DoodlePart): void => {
  const lines = root.segments()

  lines.forEach(lineSeg => {
    const line = lineSeg.getLine();

    const p1 = line.getP1();
    const p2 = line.getP2();

    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.moveTo(p1.x, p1.y);
    ctx.lineWidth = 5;
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  });

  root.children().forEach(c => drawPlant(c));
};

function simulationLoop() {
  requestAnimationFrame(simulationLoop);

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 1280, 720);

  ctx.beginPath();
  ctx.strokeStyle = 'white';
  ctx.moveTo(10, 10);
  ctx.lineWidth = 5;
  ctx.lineTo(200, 700);
  ctx.stroke();
}


window.onload = () => {
  canvas = <HTMLCanvasElement>document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  simulationLoop();
}