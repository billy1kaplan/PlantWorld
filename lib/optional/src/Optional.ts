export class Optional<T> {
  static of <T>(value: T) {
    return new Optional(value);
  }

  static empty(): Optional<any> {
    return new Optional(undefined);
  }

  private constructor(public value: T) {}


  isPresent(): boolean {
    return this.value != undefined;
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
    return this.isPresent ? this.value : fallback;
  }

  ifPresent(f: (value: T) => void): void {
    f(this.value);
  }

  getOrError(): T {
    if (!this.isPresent) {
      throw new Error('Attempting to access null value');
    } else {
      return this.value;
    }
  }
}