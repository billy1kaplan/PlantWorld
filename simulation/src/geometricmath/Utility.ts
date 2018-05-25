export function sin(angle: number) {
  return Math.sin(toRadians(angle));
}

export function cos(angle: number) {
  return Math.cos(toRadians(angle));
}

function toRadians(angle: number) {
  return (Math.PI / 180) * angle;
}