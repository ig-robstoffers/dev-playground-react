import * as React from 'react';

import {
    IgrPieChartModule,
    IgrPieChart,
    IgrDataPieChartModule,
    IgrDataPieChart,
    IgrItemLegendModule,
    IgrItemLegend,
    IgrDomainChartSeriesPointerEventArgs,
    IgrRadialPieSeries
} from 'igniteui-charts';

import { HighestGrossingMovies } from 'src/data/HighestGrossingMovies';

IgrItemLegendModule.register();
IgrPieChartModule.register();
IgrDataPieChartModule.register();

export default class DataPie extends React.Component<any, any> {
    private legend: IgrItemLegend
    private legendRef(r: IgrItemLegend) {
        this.legend = r;
        this.setState({});
    }
    private chart: IgrDataPieChart
    private chartRef(r: IgrDataPieChart) {
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

        this.state = {
            data: [
                { label: "item 1", value: 1 },
                { label: "item 2", value: 0.2 },
                { label: "item 3", value: 3 },
                { label: "item 4", value: 4 },
                { label: "item 5", value: 2 },
                
            ]
        }
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

                <div id="piecont" className="container fill" onMouseDown={this.onMouseDown}>
                    {/* <IgrPieChart 
                        dataSource={this.state.data}
                        valueMemberPath='value'
                        labelMemberPath='label'
                        innerExtent={0.4}>

                    </IgrPieChart> */}
                    <IgrDataPieChart ref={this.chartRef}
                        legend={this.legend}
                        dataSource={this.state.data}
                        toolTipType={"None"}
                        legendEmptyValuesMode={"AlwaysVisible"}
                        sliceLabelContentMode={"Label"}
                        calloutsStrokeThickness={0}
                        calloutsBackground='transparent'
                        outlines={[]}
                        radiusX={0}
                        radiusY={0}
                        selectionMode={"FadeOthers"}
                        startAngle={270}
                        valueMemberPath='value'
                        labelMemberPath='label'
                        seriesPointerMove={this.onSeriesMove}
                        othersCategoryThreshold={0}
                        angleAxisInverted={false}
                        >

                    </IgrDataPieChart>
                </div>

                <div id="hoverbox">

                </div>
            </div>
        );
    }

    onMouseDown = (e) =>
    {

    }

    onSeriesClick = (s, e: IgrDomainChartSeriesPointerEventArgs) => {
        // console.log(e.plotAreaPosition);
        // console.log(e.chartPosition);
        // let rect = e.series.getSeriesValueBoundingBox(e.series.toWorldPosition(e.plotAreaPosition));
        // console.log(rect);

        // let piecont = document.getElementById("piecont");
        // rect.top = rect.top + piecont.offsetTop;
        // rect.left = rect.left + piecont.offsetLeft;

        // let box = document.getElementById("hoverbox");
        // box.style.backgroundColor = "red";
        // box.style.position = "absolute";
        // box.style.left = rect.left + "px";
        // box.style.top = rect.top + "px";
        // box.style.width = rect.width + "px";
        // box.style.height = rect.height + "px"
        //var others = this.chart.getOthersContext();
        //console.log(others);
        //let pieSeries: IgrRadialPieSeries = e.series as IgrRadialPieSeries;
        //pieSeries.angleAxis.getItemValue(this.chart.getOthersContext(), "Label");
    };

    onSeriesMove = (s, e: IgrDomainChartSeriesPointerEventArgs) => {
        var index = e.series.getItemIndex(e.worldPosition);
        console.log(index);
    }
}