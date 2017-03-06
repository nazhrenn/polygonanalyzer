import { Bounds } from './bounds';
import { Analyzer } from './analyzer';

export class BoundsAnalyzer {
    analyze(samplePointSet: number[][]): Bounds {
        var details: Bounds = new Bounds();

        var top: number = 0;
        var bottom: number = 0;
        var left: number = 0;
        var right: number = 0;

        var pointCount: number = 0;

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

            pointCount++;
        }

        details.top = top;
        details.bottom = bottom;
        details.left = left;
        details.right = right;
        
        return details;
    }
}