export function sin(angle: number) {
  return Math.sin(toRadians(angle));
}

export function cos(angle: number) {
  return Math.cos(toRadians(angle));
}

function toRadians(angle: number) {
  return (Math.PI / 180) * angle;
}

export function flatMap<T, S>(arr: T[], f: (f: T) => S[]) {
  return arr.map((el) => f(el)).reduce((acc, cur) => [...acc, ...cur], []);
}
