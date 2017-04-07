
export class DataSet<T> {

    private data: T[] = [];

    public static create<U, T>(dataArray: U[], creator: (d: U) => T): DataSet<T> {
        let dataSet: DataSet<T> = new DataSet<T>();

        for (let data of dataArray) {
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