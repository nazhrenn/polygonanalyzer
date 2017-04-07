

export class CircularList<T> extends Array<T>  {
    private index: number = -1;

    private items: T[] = [];

    constructor(...items: T[]) {
        super();

        this.push(...items);
        this.reset();
    }

    get first(): T {
        if (this.items.length > 0)
            return this.items[0];

        return null;
    }

    get last(): T {
        if (this.items.length > 0)
            return this.items[this.items.length - 1];

        return null;
    }

    get current(): T {
        return this.items[this.index];
    }

    get peekNext(): T {
        if (this.index + 1 >= this.items.length) {
            return this.items[0];
        } else {
            return this.items[this.index + 1];
        }
    }

    get peekPrevious(): T {
        if (this.index - 1 < 0) {
            return this.items[this.items.length - 1];
        } else {
            return this.items[this.index - 1];
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
        this.index = (this.items.length > 0) ? 0 : -1;
    }

    next(): T {
        let next: T = this.peekNext;
        this.index = this.index + 1;
        if (this.index >= this.items.length)
            this.index = 0;
        return next;
    }

    previous(): T {
        let prev: T = this.peekPrevious;
        this.index = this.index - 1;
        if (this.index < 0)
            this.index = this.items.length - 1;

        return prev;
    }
}