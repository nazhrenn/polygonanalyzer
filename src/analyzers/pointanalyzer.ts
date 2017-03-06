import { PolygonDetails } from './polygondetails';

import { Point } from '../display/point';
import { Log } from "../utils/log";
import { DataSet } from "../utils/dataset";
import { PlotGraph } from "../display/plotgraph";

export class PointAnalyzer {
    analyze(samplePointSet: number[][]): PolygonDetails {
        var details: PolygonDetails = new PolygonDetails();

        var isCW: boolean = false;
        var topIndex: number = -1;
        var top: number = 0;
        var bottom: number = 0;
        var left: number = 0;
        var right: number = 0;

        var pointCount: number = 0;

        /*  (0,0)(1,0)
         *  (0,1)(1,1)
         */

        var edgeTotal = 0;

        for (var pointData of samplePointSet) {
            if (pointCount == 0) {
                left = pointData[0];
                right = pointData[0];
                top = pointData[1];
                bottom = pointData[1];
                topIndex = pointCount;
            } else {
                if (pointData[0] < left) {
                    left = pointData[0];
                }
                if (pointData[0] > right) {
                    right = pointData[0];
                }
                if (pointData[1] < top) {
                    top = pointData[1];
                    topIndex = pointCount;
                }
                if (pointData[1] > bottom) {
                    bottom = pointData[1];
                }
            }

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
        details.top = top;
        details.bottom = bottom;
        details.left = left;
        details.right = right;

        return details;
    }
}