
export class DataSet<T> {

    private data: T[] = [];

    public static create<U, T>(dataArray: U[], creator: (d: U) => T): DataSet<T> {
        var dataSet: DataSet<T> = new DataSet<T>();

        for (var data of dataArray) {
            dataSet.data.push(creator(data));
        }

        return dataSet;
    }

    private constructor() {
    }

    get Data(): T[] {
        return this.data;
    }
}