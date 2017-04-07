import { Polygon } from './../data/polygon';
import { LinkedList } from './../utils/linkedlist';
import { Edge } from './../data/edge';
import { Point } from './../data/point';

export class PointTransformer {

    transform(dataSet: Point[]): LinkedList<Edge> {
        let edges: LinkedList<Edge> = new LinkedList<Edge>();
        for (let i = 0; i < dataSet.length; i++) {
            let start: Point = dataSet[i];

            let end: Point;
            if (i == dataSet.length - 1) {
                end = dataSet[0];
            } else {
                end = dataSet[i + 1];
            }

            let edge: Edge = new Edge(start, end);
            edges.add(edge);
        }

        return edges;
    }
}