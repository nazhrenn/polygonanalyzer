
interface Array<T> {
    random(): T;
    popRandom(): T;

    duplicate(): Array<T>;
}

Array.prototype.random = function <T>(): T {
    let element: number = Math.floor(Math.random() * this.length);
    return this[element];
};

Array.prototype.popRandom = function <T>(): T {
    let element: number = Math.floor(Math.random() * this.length);

    return this.splice(element, 1)[0];
};

Array.prototype.duplicate = function <T>(): Array<T> {
    let target: Array<T> = [];

    for (let t of this) {
        target.push(t);
    }

    return target;
}