import { PolygonDetails } from './polygondetails';

import { Point } from '../display/point';
import { Log } from "../utils/log";
import { DataSet } from "../utils/dataset";
import { PlotGraph } from "../display/plotgraph";

export class PointWindingAnalyzer {
    analyze(samplePointSet: number[][]): PolygonDetails {
        var details: PolygonDetails = new PolygonDetails();

        var isCW: boolean = false;
        var pointCount: number = 0;

        /*  (0,0)(1,0)
         *  (0,1)(1,1)
         */

        var edgeTotal = 0;

        for (var pointData of samplePointSet) {
            var compare: number[];
            if (pointCount == samplePointSet.length - 1) {
                compare = samplePointSet[0];
            } else {
                compare = samplePointSet[pointCount + 1];
            }

            edgeTotal += (compare[0] - pointData[0]) * (compare[1] + pointData[1]);

            pointCount++;
        }

        details.edgeTotal = edgeTotal;
        details.isClockwise = edgeTotal > 0;

        return details;
    }
}