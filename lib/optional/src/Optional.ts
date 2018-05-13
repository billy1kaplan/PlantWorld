export class Optional<T> {
  static of <T>(value: T) {
    return new Optional(value);
  }

  static empty() {
    return new Optional(undefined);
  }

  private constructor(public value: T) {}


  isPresent() {
    return this.value != undefined;
  }

  map<S>(f: (value: T) => S) {
    if (this.isPresent()) {
      return Optional.of(f(this.value));
    } else {
      return Optional.empty();
    }
  }

  getOrElse(fallback: T) {
    return this.isPresent ? this.value : fallback;
  }

  ifPresent(f: (value: T) => void) {
    f(this.value);
  }

  getOrError() {
    if (!this.isPresent) {
      throw new Error('Attempting to access null value');
    }
    return this.value;
  }
}