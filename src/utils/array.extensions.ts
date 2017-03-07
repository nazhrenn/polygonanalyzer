
interface Array<T> {
    random(): T;
    popRandom(): T;
}

Array.prototype.random = function <T>(): T {
    var element: number = Math.floor(Math.random() * this.length);
    return this[element];
};

Array.prototype.popRandom = function <T>(): T {
    var element: number = Math.floor(Math.random() * this.length);

    return this.splice(element, 1)[0];
};
