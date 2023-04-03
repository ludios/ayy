export declare class AssertionError extends Error {
    constructor(message: string, stackStartFn: Function);
}
export declare function A(value: unknown, extraMessage?: string | Symbol, messageFn?: () => string): void;
export declare namespace A {
    var fn: symbol;
    var eq: <T>(a: T, b: T, extraMessage?: string | Symbol | undefined, messageFn?: (() => string) | undefined) => void;
    var neq: <T>(a: T, b: T, extraMessage?: string | Symbol | undefined, messageFn?: (() => string) | undefined) => void;
    var lt: <T>(a: T, b: T, extraMessage?: string | Symbol | undefined, messageFn?: (() => string) | undefined) => void;
    var lte: <T>(a: T, b: T, extraMessage?: string | Symbol | undefined, messageFn?: (() => string) | undefined) => void;
    var gt: <T>(a: T, b: T, extraMessage?: string | Symbol | undefined, messageFn?: (() => string) | undefined) => void;
    var gte: <T>(a: T, b: T, extraMessage?: string | Symbol | undefined, messageFn?: (() => string) | undefined) => void;
}
