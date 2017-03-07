import { Point } from './data/point';
import { DataSet } from './utils/dataset';
import { PointAnalyzer } from './analyzers/pointanalyzer';
import { EdgeAnalyzer } from './analyzers/edgeanalyzer';
import { BoundsAnalyzer } from './analyzers/boundsanalyzer';
import { Bounds } from './data/bounds';

import { PolygonDetails } from './data/polygondetails';
import { PointWindingAnalyzer } from './analyzers/pointwindinganalyzer';
import { Log } from './utils/log';
import graphPoints from "./grapher/pointgrapher";
import graphPolygon from "./grapher/polygongrapher";

import samplePointSets from './pointdata'
import { Polygon } from "./data/polygon";
import { PolygonSplitterAnalyzer } from "./analyzers/polygonsplitteranalyzer";

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
    var polygons: Polygon[] = new PolygonSplitterAnalyzer().analyze(polygon);


    if (polygons != null && polygons.length > 1) {
        var colors: string[] = ["red", "blue", "green", "black", "magenta"];

        for (var p of polygons) {
            Log.append(`Polygon: ${p}.`);
        }

        graphPolygon(bounds, colors, ...polygons);
    } else {
        var color: string = "red"
        if (polygonDetails.isClockwise) {
            color = "blue";
        }

        Log.append(`Polygon is <u>${polygonDetails.isClockwise ? "clockwise" : "counter-clockwise"}</u> with a <u>${polygonDetails.edgeTotal}</u> edge total.`);

        graphPolygon(bounds, [color], polygon);
    }
    //graphPoints(bounds, dataSet.Data, color);
}