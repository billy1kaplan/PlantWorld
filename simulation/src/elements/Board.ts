class Board {
  width: number;
  height: number;
  board: number[];
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    // This should? be a separate class
    this.board = [];
  }

  place(x, y) {
    this.board[this.internalPosition(x, y)] = 1;
  }

  remove(x, y) {
    this.board[this.internalPosition(x, y)] = 0;
  }

  isBlocked(x, y) {
    return this.board[this.internalPosition(x, y)] == 1;
  }

  hasPath(x1, y1, x2, y2): boolean {
    const m = (y2 - y1) / (x2 - x1);
    const deltaX = x2 - x1;

    for (var i = 0; i < deltaX; i++) {
      if (this.isBlocked(x1 + i, y1 + i * m)) {
        return false;
      }
    }
    return true;
  }

  internalPosition(x, y) {
    return x + y * this.height;
  }

  inBounds(x, y): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }
}