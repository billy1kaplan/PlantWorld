/**
 * Utility class for representing 'Optional' values.
 */
export class Optional<T> {
  /**
   * Static factory for Optional.
   * @param value represented as an Optional value by this class
   * @returns an Optional instance encapsulating the provided value.
   */
  public static of<T>(value: T) {
    if (Optional.isUndefined(value)) {
      return this.EMPTY;
    } else {
      return new Optional(value, true);
    }
  }

  /**
   * Returns an empty optional instance.
   */
  public static empty(): Optional<any> {
    return this.EMPTY;
  }

  private static EMPTY = new Optional(undefined, false);

  private static isUndefined(val: any) {
    return val === undefined || val === null;
  }

  private value: T;
  private isPresentValue: boolean;

  private constructor(value: T, isPresentValue: boolean) {
    this.value = value;
    this.isPresentValue = isPresentValue;
   }

   /**
    * Returns true if the value encapsulated by the optional
    * meets the criteria specified in Optional::isUndefined.
    * @returns true if value is Optional value is present
    */
  public isPresent(): boolean {
    return this.isPresentValue;
  }

  /**
   * Maps Optional<T> to some other Optional<S>.
   * @param f a function mapping from T to some new type S
   * @returns Empty if this Optional is empty or an Optional
   * instance wrapping the mapped value
   */
  public map<S>(f: (value: T) => S): Optional<S> {
    if (this.isPresentValue) {
      return Optional.of(f(this.value));
    } else {
      return Optional.empty();
    }
  }

  /**
   * Binds optional to a new value.
   * @param f a function that maps from T to an Optional<S>
   * @returns Empty if either this Optional or the Optional mapped to
   * by f are Empty. Otherwise, creates a new Optional<S>
   */
  public flatMap<S>(f: (value: T) => Optional<S>): Optional<S> {
    if (this.isPresentValue) {
      return f(this.value);
    } else {
      return Optional.empty();
    }
  }

  /**
   * Passes the Optional value for consumption if present,
   * otherwise does nothing.
   * @param f function to consume Optional value
   */
  public ifPresent(f: (value: T) => void): void {
    if (this.isPresentValue) {
      f(this.value);
    }
  }

  /**
   * Gets the Optional value if present, Otherwise
   * returns the fallback value.
   * @param fallback default value if the Optional is not present
   * @returns value if present. Otherwise, fallback value.
   */
  public getOrElse(fallback: T): T {
    return this.isPresentValue ? this.value : fallback;
  }

  /**
   * Gets the Optional value if present or raises an error.
   * @returns value if present. Otherwise, error.
   */
  public getOrError(): T {
    if (!this.isPresentValue) {
      throw new Error('GetOrError: Attempting to access null value from Optional');
    } else {
      return this.value;
    }
  }
}
