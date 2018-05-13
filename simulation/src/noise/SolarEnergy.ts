class Energy {
  centerX: number;
  centerY: number;
  intensity: number;
  constructor(centerX: number, centerY: number) {
    this.intensity = 100;
    this.centerX = centerX;
    this.centerY = centerY;
  }

  getEnergy(x: number, y: number) {
    const dist =
        Math.max(0.01, this.distance(this.centerX, x, this.centerY, y));

    return 1 / (dist * dist);
  }

  distance(x1, x2, y1, y2) {
    return Math.sqrt(this.square(x2 - x1) + this.square(y2 - y1));
  }

  square(x) {
    return x * x;
  }
}