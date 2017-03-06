import { Edge } from './edge';


export class Polygon {
    edges: Edge[] = [];

    addEdge(edge: Edge)
    {
        this.edges.push(edge);
    }
}