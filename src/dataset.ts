
import { Point } from "./point";

export class DataSet {

    private points: Point[] = [];

    constructor(pointData: number[][]) {
        for (var data of pointData) {
            this.points.push(new Point(data[0], data[1]));
        }
    }
    get Points(): Point[] {
        return this.points;
    }
}