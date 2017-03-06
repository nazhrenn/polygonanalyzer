
import { Point } from './display/point';
import { Log } from "./utils/log";
import { DataSet } from "./utils/dataset";
import { PlotGraph } from "./display/plotgraph";

export default function graphPoints(samplePointSet: number[][], reverse: boolean) {

    if (samplePointSet.length < 3) {
        throw new Error("Not enough points to draw a polygon");
    }

    if (reverse) {
        var reversedPointSet: number[][] = [];
        for (var i = samplePointSet.length - 1; i >= 0; i--) {
            reversedPointSet.push(samplePointSet[i]);
        }

        samplePointSet = reversedPointSet;
    }

    Log.clear();

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

    isCW = edgeTotal > 0;

    let graph: Graph = new Graph(top - 0.05, left - 0.05, bottom + 0.05, right + 0.05);

    //Log.append(`Graph is ${graph.Width} wide and ${graph.Height} tall.`);
    //Log.append(`Setting aspect ratio to ${graph.Height / graph.Width}.`);
    //Log.append(`Horizontal scale should be ${graph.DisplayWidth / graph.Width}.`);
    //Log.append(`Vertical scale should be ${graph.DisplayHeight / graph.Height}.`);
    Log.append(`Polygon is ${isCW ? "Clockwise" : "Counter-clockwise"} winding.`);
    Log.append(`Edge total: ${edgeTotal}.`);
    Log.append(`Reverse direction: ${reverse}`);
    let dataSet: DataSet = new DataSet(samplePointSet);

    if (isCW) {
        graph.setColor("blue");
    } else {
        graph.setColor("red");
    }

    graph.polygon(dataSet.Points, true);
}