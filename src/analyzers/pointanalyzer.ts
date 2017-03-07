import { DataSet } from './../utils/dataset';
import { Point } from './../data/point';

export class PointAnalyzer {
    analyze(samplePointSet: number[][]): DataSet<Point> {
        return DataSet.create(samplePointSet, (d) => new Point(d[0], d[1]));
    }
}