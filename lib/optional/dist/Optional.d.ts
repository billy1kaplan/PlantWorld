export declare class Optional<T> {
    value: T;
    static of<T>(value: T): Optional<T>;
    static empty(): Optional<any>;
    private constructor();
    isPresent(): boolean;
    map<S>(f: (value: T) => S): Optional<any>;
    getOrElse(fallback: T): T;
    ifPresent(f: (value: T) => void): void;
    getOrError(): T;
}
