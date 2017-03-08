
interface Array<T> {
    random(): T;
    popRandom(): T;

    duplicate(): Array<T>;
}

Array.prototype.random = function <T>(): T {
    var element: number = Math.floor(Math.random() * this.length);
    return this[element];
};

Array.prototype.popRandom = function <T>(): T {
    var element: number = Math.floor(Math.random() * this.length);

    return this.splice(element, 1)[0];
};

Array.prototype.duplicate = function <T>(): Array<T> {
    var target: Array<T> = [];

    for (var t of this) {
        target.push(t);
    }

    return target;
}