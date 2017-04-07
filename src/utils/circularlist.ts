

export class CircularList<T> extends Array<T>  {
    private index: number = -1;

    constructor(...items: T[]) {
        super();

        this.push(...items);
    }

    get first(): T {
        if (this.length > 0)
            return this[0];

        return null;
    }

    get last(): T {
        if (this.length > 0)
            return this[this.length - 1];

        return null;
    }

    get current(): T {
        return this[this.index];
    }

    get peekNext(): T {
        if (this.index + 1 >= this.length) {
            return this[0];
        } else {
            return this[this.index + 1];
        }
    }

    get peekPrevious(): T {
        if (this.index - 1 < 0) {
            return this[this.length - 1];
        } else {
            return this[this.index - 1];
        }
    }

    setCurrentItem(item: T) {
        let index: number = this.indexOf(item);
        if (index >= 0) {
            this.setCurrentIndex(index);
        }
    }

    setCurrentIndex(index: number) {
        this.index = index;
    }

    reset(): void {
        this.index = (this.length > 0) ? 0 : -1;
    }

    next(): T {
        let next: T = this.peekNext;
        this.index = this.index + 1;
        if (this.index >= this.length)
            this.index = 0;
        return next;
    }

    previous(): T {
        let prev: T = this.peekPrevious;
        this.index = this.index - 1;
        if (this.index < 0)
            this.index = this.length - 1;

        return prev;
    }
}