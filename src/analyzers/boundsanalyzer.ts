import { Point } from './../data/point';
import { Bounds } from './../data/bounds';

export class BoundsAnalyzer {
    analyze(samplePointSet: Point[]): Bounds {
        var details: Bounds = new Bounds();

        var top: number = 0;
        var bottom: number = 0;
        var left: number = 0;
        var right: number = 0;

        var pointCount: number = 0;

        for (var pointData of samplePointSet) {
            if (pointCount == 0) {
                left = pointData.x;
                right = pointData.x;
                top = pointData.y;
                bottom = pointData.y;
            } else {
                if (pointData.x < left) {
                    left = pointData.x;
                }
                if (pointData.x > right) {
                    right = pointData.x;
                }
                if (pointData.y < top) {
                    top = pointData.y;
                }
                if (pointData.y > bottom) {
                    bottom = pointData.y;
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