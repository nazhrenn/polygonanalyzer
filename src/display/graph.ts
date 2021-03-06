
import { Point } from "../data/point";

export class Graph {
    static canvasElement: HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    static context: CanvasRenderingContext2D = Graph.canvasElement.getContext('2d');;

    protected color: string;

    protected top: number;
    protected left: number;
    protected bottom: number;
    protected right: number;

    constructor(top: number, left: number, bottom: number, right: number) {
        this.top = top;
        this.left = left;
        this.bottom = bottom;
        this.right = right;

        this.clear();
    }

    public setColor(color: string): void {
        this.color = color;
        this.context.fillStyle = color;
        this.context.strokeStyle = color;
    }

    public clear(): void {
        this.setColor("black");
        this.context.clearRect(0, 0, this.DisplayWidth, this.DisplayHeight);
    }

    public get Top(): number {
        return this.top;
    }

    public get Left(): number {
        return this.left;
    }

    public get Width(): number {
        return (this.right - this.left);
    }

    public get Height(): number {
        return (this.bottom - this.top);
    }

    public get DisplayWidth(): number {
        return Graph.canvasElement.width;
    }

    public get DisplayHeight(): number {
        return Graph.canvasElement.height;
    }

    public get VerticalScale(): number {
        return this.DisplayHeight / this.Height;
    }

    public get HorizontalScale(): number {
        return this.DisplayWidth / this.Width;
    }

    public get AspectRatio(): number {
        return this.Height / this.Width;
    }

    protected get context(): CanvasRenderingContext2D {
        return Graph.context;
    }

    protected transpose(point: Point): Point {
        let p: Point = new Point(point.x, point.y)
        p.translate(this.left, this.top);
        p.scale(this.HorizontalScale, this.VerticalScale);
        return p;
    }
}