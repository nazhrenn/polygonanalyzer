import { PolygonDetails } from './polygondetails';

import { Point } from '../display/point';
import { Log } from "../utils/log";
import { DataSet } from "../utils/dataset";
import { PlotGraph } from "../display/plotgraph";

export class PointWindingAnalyzer {
    analyze(samplePointSet: Point[]): PolygonDetails {
        var details: PolygonDetails = new PolygonDetails();

        var isCW: boolean = false;
        var pointCount: number = 0;

        /*  (0,0)(1,0)
         *  (0,1)(1,1)
         */

        var edgeTotal = 0;

        for (var pointData of samplePointSet) {
            var compare: Point;
            if (pointCount == samplePointSet.length - 1) {
                compare = samplePointSet[0];
            } else {
                compare = samplePointSet[pointCount + 1];
            }

            edgeTotal += (compare.x - pointData.x) * (compare.y + pointData.y);

            pointCount++;
        }

        details.edgeTotal = edgeTotal;
        details.isClockwise = edgeTotal > 0;

        return details;
    }
}