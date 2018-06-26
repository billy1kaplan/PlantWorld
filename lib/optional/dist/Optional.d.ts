export declare class Optional<T> {
    value: T;
    static of<T>(value: T): Optional<any>;
    static empty(): Optional<any>;
    private static EMPTY;
    private constructor();
    isPresent(): boolean;
    private static isUndefined(val);
    map<S>(f: (value: T) => S): Optional<S>;
    flatMap<S>(f: (value: T) => Optional<S>): Optional<S>;
    getOrElse(fallback: T): T;
    ifPresent(f: (value: T) => void): void;
    getOrError(): T;
}
