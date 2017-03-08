

export class LinkedList<T> implements IterableIterator<T> {
    private iterating: boolean;
    private index: number = -1;
    private counter: number = -1;

    private items: T[] = [];

    constructor(...items: T[]) {
        this.items = items;
        this.reset();
    }

    add(item: T): void {
        this.items.push(item);
    }

    insertAfter(item: T): void {
        this.items.splice(this.index + 1, 0, item);
    }

    insertBefore(item: T): void {
        this.items.splice(this.index, 0, item);
    }

    get FirstItem(): T {
        if (this.items.length > 0)
            return this.items[0];

        return null;
    }

    get LastItem(): T {
        if (this.items.length > 0)
            return this.items[this.items.length - 1];

        return null;
    }

    get CurrentItem(): T {
        return this.items[this.index];
    }

    get NextItem(): T {
        if (this.index + 1 >= this.items.length) {
            return this.items[0];
        } else {
            return this.items[this.index + 1];
        }
    }

    find(predicate: (item: T) => boolean): boolean {
        var value: boolean = false;
        for (var i = 0; i < this.items.length; i++) {
            if (predicate(this.items[i])) {
                this.index = i;
                value = true;
                break;
            }
        }

        return value;
    }

    get PreviousItem(): T {
        if (this.index - 1 < 0) {
            return this.items[this.items.length - 1];
        } else {
            return this.items[this.index - 1];
        }
    }

    reset(): void {
        this.index = (this.items.length > 0) ? 0 : -1;
    }

    moveNext(): T {
        var next: T = this.NextItem;
        this.index = this.index + 1;
        if (this.index >= this.items.length)
            this.index = 0;
        return next;
    }

    movePrevious(): T {
        var prev: T = this.PreviousItem;
        this.index = this.index - 1;
        if (this.index < 0)
            this.index = this.items.length - 1;

        return prev;
    }

    get Items(): T[] {
        return this.items;
    }

    [Symbol.iterator](): IterableIterator<T> {
        this.counter = this.index - 1;
        this.iterating = true;

        if (this.counter == -1) {
            this.counter = this.items.length - 1;
        }

        return this;
    }

    next(value?: any): IteratorResult<T> {
        if (this.index >= this.items.length) {
            this.index = 0;
        }

        if (this.iterating) {
            if (this.index == this.counter) {
                this.iterating = false;
            }
            return {
                done: false,
                value: this.items[this.index++]
            };
        } else {
            return {
                done: true,
                value: null
            };
        }
    }

    return(value?: any): IteratorResult<T> {
        this.index = this.counter + 1;
        this.iterating = false;

        if (this.index >= this.items.length) {
            this.index = 0;
        }

        return {
            done: true,
            value: null
        };
    }

    throw(e?: any): IteratorResult<T> {
        throw new Error(e);
    }
}