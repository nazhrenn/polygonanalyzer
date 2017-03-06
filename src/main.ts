import { BoundsAnalyzer } from './analyzers/boundsanalyzer';
import { Bounds } from './analyzers/bounds';

import { PolygonDetails } from './analyzers/polygondetails';
import { PointWindingAnalyzer } from './analyzers/pointwindinganalyzer';
import { Log } from './utils/log';
import graphPoints from "./pointgrapher";

import samplePointSets from './pointdata'

var selectedIndex: number = samplePointSets.length > 0 ? 0 : -1;

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

    var bounds: Bounds = new BoundsAnalyzer().analyze(samplePointSet);
    var details: PolygonDetails = new PointWindingAnalyzer().analyze(samplePointSet);

    var color: string = "red"
    if (details.isClockwise) {
        color = "blue";
    }

    Log.append(`Polygon is <u>${details.isClockwise ? "clockwise" : "counter-clockwise"}</u> with a <u>${details.edgeTotal}</u> edge total.`);

    graphPoints(bounds, samplePointSet, color);
}