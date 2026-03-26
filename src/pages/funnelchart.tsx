import * as React from 'react';

import {
    IgrFunnelChartModule,
    IgrFunnelChart,
    IgrItemLegendModule,
    IgrItemLegend,
} from 'igniteui-charts';

import { HighestGrossingMovies } from 'src/data/HighestGrossingMovies';

IgrItemLegendModule.register();
IgrFunnelChartModule.register();

export default class FunnelChart extends React.Component<any, any> {
    private legend: IgrItemLegend
    private legendRef(r: IgrItemLegend) {
        this.legend = r;
        this.setState({});
    }
    private chart: IgrFunnelChart
    private chartRef(r: IgrFunnelChart) {
        this.chart = r;
        this.setState({});
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

        this.legendRef = this.legendRef.bind(this);
        this.chartRef = this.chartRef.bind(this);
    }

    render() {
        return (
            <div className="container sample">

                <div className="legend-title">
                    Highest Grossing Movie Franchises
                </div>

                <div className="legend">
                    <IgrItemLegend
                        ref={this.legendRef}
                        orientation="Horizontal">
                    </IgrItemLegend>
                </div>

                <div id="piecont" className="container fill">
                    {/* <IgrPieChart ref={this.chartRef}
                        dataSource={this.highestGrossingMovies}
                        valueMemberPath='totalRevenue'
                        labelMemberPath='franchise'>

                    </IgrPieChart> */}
                    <IgrFunnelChart ref={this.chartRef}
                        legend={this.legend}
                        dataSource={this.highestGrossingMovies}
                        valueMemberPath='totalRevenue'
                        innerLabelMemberPath='franchise'
                        allowSliceSelection='true'
                        selectedItemsChanged={this.onSelectedItemsChanged}
                        >

                    </IgrFunnelChart>
                </div>

                <div id="hoverbox">

                </div>
            </div>
        );
    }

    private onSelectedItemsChanged = (s, e) => {
        
    }
}