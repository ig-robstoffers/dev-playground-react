interface TimeDataPoint {
    label: string;
    volume: number;
    open: number;
    close: number;
    high: number;
    low: number;
    date: string;
}

export const timeData: TimeDataPoint[] = [
    { label: 'A', volume: 100.26, open: 10, close: 20, high: 25, low: 10, date: '12:00:00' },
    { label: 'B', volume: 200, open: 20, close: 40, high: 45, low: 15, date: '12:10:00' },
    { label: 'C', volume: 400, open: 40, close: 30, high: 40, low: 25, date: '12:20:00' },
    { label: 'D', volume: 300.87, open: 30, close: 50, high: 55, low: 25, date: '12:30:00' },
    { label: 'E', volume: 50.99, open: 50, close: 70, high: 70, low: 45, date: '12:40:00' },
    { label: 'F', volume: 40.20, open: 40, close: 20, high: 50, low: 15, date: '12:50:00' },
    { label: 'G', volume: 200.34, open: 20, close: 10, high: 25, low: 10, date: '13:00:00' }
];

export interface TimeDataPointWithDate {
    label: string;
    volume: number;
    open: number;
    close: number;
    high: number;
    low: number;
    date: Date;
}

export const timeDataSource: TimeDataPointWithDate[] = timeData.map(({ date: timeStr, ...rest }) => {
    const [h = 0, m = 0, s = 0] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(h, m, s, 0);
    return { ...rest, date } as TimeDataPointWithDate;
});