import { Point } from './display/point';
import { DataSet } from './utils/dataset';
import { PointAnalyzer } from './analyzers/pointanalyzer';
import { EdgeDetails } from './analyzers/edgedetails';
import { EdgeAnalyzer } from './analyzers/edgeanalyzer';
import { BoundsAnalyzer } from './analyzers/boundsanalyzer';
import { Bounds } from './analyzers/bounds';

import { PolygonDetails } from './analyzers/polygondetails';
import { PointWindingAnalyzer } from './analyzers/pointwindinganalyzer';
import { Log } from './utils/log';
import graphPoints from "./pointgrapher";
import graphPolygon from "./polygongrapher";

import samplePointSets from './pointdata'
import { Polygon } from "./display/polygon";

var selectedIndex: number = samplePointSets.length > 0 ? samplePointSets.length - 1 : -1;

var previousButton: HTMLInputElement = <HTMLInputElement>document.getElementById("previous");
var nextButton: HTMLInputElement = <HTMLInputElement>document.getElementById("next");
var reverseCheckbox: HTMLInputElement = <HTMLInputElement>document.getElementById("reverse");

previousButton.onclick = (ev: MouseEvent): any => {
    selectedIndex--;

    if (selectedIndex < 0)
        selectedIndex = samplePointSets.length - 1;

    if (selectedIndex >= 0 && selectedIndex < samplePointSets.length) {
        analyze(samplePointSets[selectedIndex], reverseCheckbox.checked);
    }
};

nextButton.onclick = (ev: MouseEvent): any => {
    selectedIndex++;

    if (selectedIndex == samplePointSets.length)
        selectedIndex = 0;

    if (selectedIndex >= 0 && selectedIndex < samplePointSets.length) {
        analyze(samplePointSets[selectedIndex], reverseCheckbox.checked);
    }
};

reverseCheckbox.onchange = (ev: Event): any => {
    if (selectedIndex >= 0 && selectedIndex < samplePointSets.length) {
        analyze(samplePointSets[selectedIndex], reverseCheckbox.checked);
    }
};


if (selectedIndex >= 0 && selectedIndex < samplePointSets.length) {
    analyze(samplePointSets[selectedIndex], reverseCheckbox.checked);
}

function analyze(samplePointSet: number[][], reverse: boolean) {

    Log.clear();

    if (reverse) {
        var reversedPointSet: number[][] = [];
        for (var i = samplePointSet.length - 1; i >= 0; i--) {
            reversedPointSet.push(samplePointSet[i]);
        }

        samplePointSet = reversedPointSet;
    }

    var dataSet: DataSet<Point> = new PointAnalyzer().analyze(samplePointSet);

    var bounds: Bounds = new BoundsAnalyzer().analyze(dataSet.Data);
    var polygonDetails: PolygonDetails = new PointWindingAnalyzer().analyze(dataSet.Data);
    var polygon: Polygon = new EdgeAnalyzer().analyze(dataSet.Data);

    var color: string = "red"
    if (polygonDetails.isClockwise) {
        color = "blue";
    }

    Log.append(`Polygon is <u>${polygonDetails.isClockwise ? "clockwise" : "counter-clockwise"}</u> with a <u>${polygonDetails.edgeTotal}</u> edge total.`);

    graphPolygon(bounds, polygon, color);
    //graphPoints(bounds, dataSet.Data, color);
}