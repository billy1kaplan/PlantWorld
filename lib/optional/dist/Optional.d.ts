/**
 * Utility class for representing 'Optional' values.
 */
export declare class Optional<T> {
    /**
     * Static factory for Optional.
     * @param value represented as an Optional value by this class
     * @returns an Optional instance encapsulating the provided value.
     */
    static of<T>(value: T): Optional<any>;
    /**
     * Returns an empty optional instance.
     */
    static empty(): Optional<any>;
    private static EMPTY;
    private static isUndefined(val);
    private value;
    private isPresentValue;
    private constructor();
    /**
     * Returns true if the value encapsulated by the optional
     * meets the criteria specified in Optional::isUndefined.
     * @returns true if value is Optional value is present
     */
    isPresent(): boolean;
    /**
     * Maps Optional<T> to some other Optional<S>.
     * @param f a function mapping from T to some new type S
     * @returns Empty if this Optional is empty or an Optional
     * instance wrapping the mapped value
     */
    map<S>(f: (value: T) => S): Optional<S>;
    /**
     * Binds optional to a new value.
     * @param f a function that maps from T to an Optional<S>
     * @returns Empty if either this Optional or the Optional mapped to
     * by f are Empty. Otherwise, creates a new Optional<S>
     */
    flatMap<S>(f: (value: T) => Optional<S>): Optional<S>;
    /**
     * Passes the Optional value for consumption if present,
     * otherwise does nothing.
     * @param f function to consume Optional value
     */
    ifPresent(f: (value: T) => void): void;
    /**
     * Gets the Optional value if present, Otherwise
     * returns the fallback value.
     * @param fallback default value if the Optional is not present
     * @returns value if present. Otherwise, fallback value.
     */
    getOrElse(fallback: T): T;
    /**
     * Gets the Optional value if present or raises an error.
     * @returns value if present. Otherwise, error.
     */
    getOrError(): T;
}
