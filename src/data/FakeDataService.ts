export interface FakeDataItem {
    id: number;
    name: string;
    createdAt: Date;
}

export interface FakeDataSchemaField {
    name: string;
    type: 'integer' | 'string' | 'date';
}

export class FakeDataService {
    private data: FakeDataItem[] = [];

    constructor(count: number = 100) {
        this.generateData(count);
    }

    private generateData(count: number) {
        for (let i = 1; i <= count; i++) {
            this.data.push({
                id: i,
                name: `Item ${i}`,
                createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)),
            });
        }
    }

    private simulateDelay<T>(result: T, delay: number = 500): Promise<T> {
        return new Promise(resolve => setTimeout(() => resolve(result), delay));
    }

    public getData(skip: number = 0, take: number = 10): Promise<FakeDataItem[]> {
        const items = this.data.slice(skip, skip + take);
        return this.simulateDelay(items);
    }

    public getCount(): Promise<number> {
        return this.simulateDelay(this.data.length);
    }

    public getSchema(): Promise<FakeDataSchemaField[]> {
        return this.simulateDelay([
            { name: 'id', type: 'integer' },
            { name: 'name', type: 'string' },
            { name: 'createdAt', type: 'date' },
        ]);
    }
}