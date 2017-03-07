

interface Math {
    randomInt(max: number, min?: number): number;
}

Math.randomInt = function (max: number, min: number = 0): number {
    return Math.floor(Math.random() * max) + min;
}