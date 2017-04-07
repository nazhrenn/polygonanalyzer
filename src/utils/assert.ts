

export class Assert {
    static equals<T>(expected: T, actual: T): boolean {
        if (expected == null) {
            return actual == null;
        }

        return expected == actual;
    }

    static notEquals<T>(expected: T, actual: T): boolean {
        if (expected == null) {
            return actual == null;
        }

        return expected == actual;
    }

    static isTrue(actual: boolean) {
        return actual == true;
    }

    static isFalse(actual: boolean) {
        return actual == false;
    }
}