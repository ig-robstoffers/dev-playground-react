import * as React from 'react';

import "./axisrangebufferinfinity.css";

import {
    IgrDataChartCoreModule,
    IgrDataChartCategoryCoreModule,
    IgrDataChartCategoryModule,
    IgrDataChartInteractivityModule,
    IgrDataChartVerticalCategoryModule,
    IgrDataChartAnnotationModule,
    IgrDataChartVisualDataModule,
    IgrDataChart,
    IgrColumnSeries,
    IgrCategoryXAxis,
    IgrNumericYAxis,
    IgrCalloutLayer
} from 'igniteui-charts';

import { HighestGrossingMovies } from '../../../src/data/HighestGrossingMovies';


// IgrLegendModule.register();
// IgrCategoryChartModule.register();
// IgrCategoryChartToolbarModule.register();
IgrDataChartVisualDataModule.register();
IgrDataChartCoreModule.register();
IgrDataChartCategoryCoreModule.register();
IgrDataChartCategoryModule.register();
IgrDataChartInteractivityModule.register();
IgrDataChartVerticalCategoryModule.register();
IgrDataChartAnnotationModule.register();

export default class AxisRangeBufferInfinity extends React.Component<any, any> {
    private chart: IgrDataChart
    private chartRef(r: IgrDataChart) {
        this.chart = r;
    }

    private _highestGrossingMovies: HighestGrossingMovies = null;
    public get highestGrossingMovies(): HighestGrossingMovies {
        if (this._highestGrossingMovies == null)
        {
            this._highestGrossingMovies = new HighestGrossingMovies();
        }
        return this._highestGrossingMovies;
    }

    constructor(props: any) {
        super(props);

        this.state = {
            isHidden: false
        };

        this.chartRef = this.chartRef.bind(this);
    }

    render() {

        var style = { "display": "block" };
        if (this.state.isHidden) {
            style.display = "none";
        }

        return (
            <div className="container sample">
                <div className="legend-title">
                    Highest Grossing Movie Franchises
                </div>

                <div style={style} className="rangebufferbug">
                    <IgrDataChart ref={this.chartRef} width="500px" height="500px">
                        <IgrCategoryXAxis 
                            name="xAxis"
                            label="franchise"
                            dataSource={this.highestGrossingMovies}
                            labelExtent={150}>
                        </IgrCategoryXAxis>
                        <IgrNumericYAxis 
                            name="yAxis"
                            title="Billions of U.S. Dollars"
                            autoRangeBufferMode="Series">
                        </IgrNumericYAxis>
                        <IgrColumnSeries
                            name="ColumnSeries1"
                            xAxisName="xAxis"
                            yAxisName="yAxis"
                            title="Total Revenue of Franchise"
                            valueMemberPath="totalRevenue"
                            dataSource={this.highestGrossingMovies}
                            markerType="Hidden">
                        </IgrColumnSeries>
                        <IgrCalloutLayer name="CalloutLayer1" isAutoCalloutBehaviorEnabled={true} calloutExpandsAxisBufferEnabled={true}/>
                    </IgrDataChart>
                </div>
                <button onClick={this.onclick}>Click</button>
            </div>
        );
    }

    onclick = () => {

        this.setState({ isHidden: !this.state.isHidden });
    }
}