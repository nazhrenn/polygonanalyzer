

export class LinkedList<T> {
    private index: number = -1;
    private items: T[] = [];

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

    get PreviousItem(): T {
        if (this.index - 1 < 0) {
            return this.items[this.items.length - 1];
        } else {
            return this.items[this.index - 1];
        }
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
}