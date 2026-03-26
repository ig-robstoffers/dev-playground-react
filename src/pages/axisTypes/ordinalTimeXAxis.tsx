import * as React from 'react';

import {
    IgrLegend,
    IgrDataChartCoreModule,
    IgrDataChartCategoryCoreModule,
    IgrDataChartCategoryModule,
    IgrDataChartInteractivityModule,
    IgrDataChartAnnotationModule,
    IgrDataChart,
    IgrLineSeries,
    IgrColumnSeries,
    IgrCategoryXAxis,
    IgrOrdinalTimeXAxis,
    IgrNumericYAxis,
    IgrCrosshairLayer,
} from 'igniteui-charts';

import { timeDataSource } from '../../data/TimeData';

const mods: any[] = [
    IgrDataChartCoreModule,
    IgrDataChartCategoryCoreModule,
    IgrDataChartCategoryModule,
    IgrDataChartInteractivityModule,
    IgrDataChartAnnotationModule
];
mods.forEach((m) => m.register());

export default class OrdinalTimeXAxisSample extends React.Component<any, any> {
    private dataChart: IgrDataChart;
    private dataChartRef(r: IgrDataChart) {
        this.dataChart = r;
        this.setState({
            target: r
        });
    }

    constructor(props: any) {
        super(props);

        this.dataChartRef = this.dataChartRef.bind(this);

        this.state = {
            target: null,
        };
    }

    public render(): JSX.Element {
        return (
        <div className="container sample">

            <div className="legend-title">
                Renewable Electricity Generated
            </div>

            <div className="container fill">
                <IgrDataChart ref={this.dataChartRef} width="800px" height="500px">
                    <IgrOrdinalTimeXAxis name="xAxis" dataSource={timeDataSource} isInverted={true} dateTimeMemberPath={"date"} />
                    <IgrNumericYAxis name="yAxis" minimumValue={0} maximumValue={400} interval={100}/>
                    <IgrColumnSeries name="europe"
                        xAxisName="xAxis"
                        yAxisName="yAxis"
                        valueMemberPath="volume"
                        dataSource={timeDataSource}/>
                    <IgrCrosshairLayer name="crosshair" isAxisAnnotationEnabled={true}/>
                </IgrDataChart>
            </div>
        </div>
        );
    }
}