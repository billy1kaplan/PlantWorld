export class Optional<T> {
  static of<T>(value: T) {
    if (Optional.isUndefined(value)) {
      return this.EMPTY;
    } else {
      return new Optional(value);
    }
  }

  static empty(): Optional<any> {
    return this.EMPTY;
  }

  private static EMPTY = new Optional(undefined);

  private constructor(public value: T) { }

  isPresent(): boolean {
    return !Optional.isUndefined(this.value);
  }

  private static isUndefined(val: any) {
    return val === undefined || val === null;
  }

  map<S>(f: (value: T) => S): Optional<S> {
    if (this.isPresent()) {
      return Optional.of(f(this.value));
    } else {
      return Optional.empty();
    }
  }

  flatMap<S>(f: (value: T) => Optional<S>): Optional<S> {
    if (this.isPresent()) {
      return f(this.value);
    } else {
      return Optional.empty();
    }
  }

  getOrElse(fallback: T): T {
    return this.isPresent() ? this.value : fallback;
  }

  ifPresent(f: (value: T) => void): void {
    if (this.isPresent()) {
      f(this.value);
    }
  }

  getOrError(): T {
    if (!this.isPresent()) {
      throw new Error('Attempting to access null value');
    } else {
      return this.value;
    }
  }
}