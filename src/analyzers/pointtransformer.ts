import { CircularList } from './../utils/circularlist';
import { Polygon } from './../data/polygon';
import { Edge } from './../data/edge';
import { Point } from './../data/point';

export class PointTransformer {

    transform(dataSet: Point[]): CircularList<Edge> {
        let edges: CircularList<Edge> = new CircularList<Edge>();
        for (let i = 0; i < dataSet.length; i++) {
            let start: Point = dataSet[i];

            let end: Point;
            if (i == dataSet.length - 1) {
                end = dataSet[0];
            } else {
                end = dataSet[i + 1];
            }

            let edge: Edge = new Edge(start, end);
            edges.push(edge);
        }

        return edges;
    }
}