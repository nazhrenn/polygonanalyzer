

interface Array<T> {
    random(): T;
}

Array.prototype.random = function <T>(): T {
    var element: number = Math.floor(Math.random() * this.length);
    return this[element];
};