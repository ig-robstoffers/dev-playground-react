import * as React from 'react';

// data chart's elements for category series:
import { IgrNumericYAxis, IgrValueLayer, IgrValueOverlay, ValueLayerValueMode } from 'igniteui-charts';
import { IgrNumericXAxis } from 'igniteui-charts';
import { IgrTimeXAxis } from 'igniteui-charts';
import { IgrScatterSeries } from 'igniteui-charts';
import { IgrCategoryXAxis } from 'igniteui-charts';
import { IgrCategoryYAxis } from 'igniteui-charts';
import { IgrColumnSeries } from 'igniteui-charts';
// data chart's modules:
import { IgrDataChart } from 'igniteui-charts';
import { IgrDataChartCoreModule } from 'igniteui-charts';
import { IgrDataChartCategoryModule } from 'igniteui-charts';
import { IgrDataChartScatterCoreModule } from 'igniteui-charts';
import { IgrDataChartScatterModule } from 'igniteui-charts';
import { IgrDataChartInteractivityModule } from 'igniteui-charts';
import { IgrTimeXAxisModule } from 'igniteui-charts';
import { SampleCategoryData } from '../data/SampleCategoryData';
import { SampleFinancialData } from '../data/SampleFinancialData';
import { SampleScatterData } from '../data/SampleScatterData';
import { IgrBarSeries } from 'igniteui-charts';
import { IgrFinancialPriceSeries } from 'igniteui-charts';

IgrDataChartCoreModule.register();
IgrDataChartCategoryModule.register();
IgrDataChartScatterCoreModule.register();
IgrDataChartScatterModule.register();
IgrTimeXAxisModule.register();
IgrDataChartInteractivityModule.register();

export default class DataChartAxisTypes extends React.Component<any, any> {
    public categoryData: any[];
    public financialData: any[];
    public scatterData: any[];

    public chart: IgrDataChart;

    public numericXAxis: IgrNumericXAxis;
    public numericYAxis: IgrNumericYAxis;

    public categoryXAxis: IgrCategoryXAxis;
    public categoryYAxis: IgrCategoryYAxis;

    public timeXAxis: IgrTimeXAxis;

    public columnSeries1: IgrColumnSeries;
    public columnSeries2: IgrColumnSeries;

    public barSeries1: IgrBarSeries;
    public barSeries2: IgrBarSeries;

    public scatterSeries1: IgrScatterSeries;
    public scatterSeries2: IgrScatterSeries;

    public financialSeries: IgrFinancialPriceSeries;

    public valueLayer: IgrValueLayer;

    constructor(props: any) {
        super(props);

        this.onAxisTypeChange = this.onAxisTypeChange.bind(this);

        this.onChartRef = this.onChartRef.bind(this);

        this.initData();

        this.initAxes();
        this.initCategorySeries();
        this.initScatterSeries();
        this.initFinancialSeries();
    }

    public render(): JSX.Element {
        return (
            <div className="container sample">
                <div className="container">
                    <div className="options horizontal">
                        <label className="options-label">Axis Type:</label>
                        <select onChange={this.onAxisTypeChange} style={{width: "17rem"}}>
                            <option>CategoryXAxis with Column Series</option>
                            <option>CategoryYAxis with Bar Series</option>
                            <option>NumericXAxis with Scatter Series</option>
                            <option>TimeXAxis with Financial Series</option>
                        </select>
                    </div>
                    <IgrDataChart
                        ref={this.onChartRef}
                        width="100%"
                        height="calc(100% - 35px)"
                        isHorizontalZoomEnabled={true}
                        isVerticalZoomEnabled={true} 
                        axisLabelMouseOver={this.OnMouseOver}/>
                </div>
            </div>
        );
    }

    public OnMouseOver = (s: IgrDataChart, e: any) => {
        console.log("Mouse over axis label: " + e.label);
    }

    public initCategorySeries() {
        this.columnSeries1 = new IgrColumnSeries({ name: "colSeries1" });
        this.columnSeries1.dataSource = this.categoryData;
        this.columnSeries1.xAxis = this.categoryXAxis;
        this.columnSeries1.yAxis = this.numericYAxis;
        this.columnSeries1.xAxisName = "categoryXAxis";
        this.columnSeries1.yAxisName = "numericYAxis";
        this.columnSeries1.valueMemberPath = "USA";

        this.columnSeries2 = new IgrColumnSeries({ name: "colSeries2" });
        this.columnSeries2.dataSource = this.categoryData;
        this.columnSeries2.xAxis = this.categoryXAxis;
        this.columnSeries2.yAxis = this.numericYAxis;
        this.columnSeries2.xAxisName = "categoryXAxis";
        this.columnSeries2.yAxisName = "numericYAxis";
        this.columnSeries2.valueMemberPath = "RUS";

        this.barSeries1 = new IgrBarSeries({ name: "barSeries1" });
        this.barSeries1.dataSource = this.categoryData;
        this.barSeries1.xAxis = this.numericXAxis;
        this.barSeries1.yAxis = this.categoryYAxis;
        this.barSeries1.xAxisName = "numericXAxis";
        this.barSeries1.yAxisName = "categoryYAxis";
        this.barSeries1.valueMemberPath = "USA";

        this.barSeries2 = new IgrBarSeries({ name: "barSeries2" });
        this.barSeries2.dataSource = this.categoryData;
        this.barSeries2.xAxis = this.numericXAxis;
        this.barSeries2.yAxis = this.categoryYAxis;
        this.barSeries2.xAxisName = "numericXAxis";
        this.barSeries2.yAxisName = "categoryYAxis";
        this.barSeries2.valueMemberPath = "RUS";
    }

    public initAxes() {
        this.categoryXAxis = new IgrCategoryXAxis({ name: "categoryXAxis" });
        this.categoryXAxis.title = "Category X Axis";
        this.categoryXAxis.dataSource = this.categoryData;
        this.categoryXAxis.label = "Year";

        this.categoryYAxis = new IgrCategoryYAxis({ name: "categoryYAxis" });
        this.categoryYAxis.title = "Category Y Axis";
        this.categoryYAxis.dataSource = this.categoryData;
        this.categoryYAxis.label = "Year";

        this.numericXAxis = new IgrNumericXAxis({ name: "numericXAxis" });
        this.numericXAxis.title = "Numeric X Axis";

        this.numericYAxis = new IgrNumericYAxis({ name: "numericYAxis" });
        this.numericYAxis.title = "Numeric Y Axis";

        this.timeXAxis = new IgrTimeXAxis({name: "timeXAxis"});
        this.timeXAxis.title = "Time X Axis";
        this.timeXAxis.dataSource = this.financialData;
        this.timeXAxis.dateTimeMemberPath = "Time";
        this.timeXAxis.label = "Date";

        this.numericYAxis.labelAngle = 45;
    }

    public initFinancialSeries(){
        this.financialSeries = new IgrFinancialPriceSeries({name: "financialSeries"});
        this.financialSeries.dataSource = this.financialData;
        this.financialSeries.xAxis = this.timeXAxis;
        this.financialSeries.yAxis = this.numericYAxis;
        this.financialSeries.xAxisName = "timeXAxis";
        this.financialSeries.yAxisName = "numericYAxis";
        this.financialSeries.highMemberPath="High"
        this.financialSeries.lowMemberPath="Low"
        this.financialSeries.closeMemberPath="Close"
        this.financialSeries.openMemberPath="Open"
        this.financialSeries.volumeMemberPath="Volume"

        this.valueLayer = new IgrValueLayer({name: "valueLayer"});
        this.valueLayer.valueMode = ValueLayerValueMode.Average;
        this.valueLayer.isAxisAnnotationEnabled = true;
    }

    public initScatterSeries(){
        this.scatterSeries1 = new IgrScatterSeries({name: "scatterSeries"});
        this.scatterSeries1.dataSource = this.scatterData;
        this.scatterSeries1.xAxis = this.numericXAxis;
        this.scatterSeries1.yAxis = this.numericYAxis;
        this.scatterSeries1.xAxisName = "numericXAxis";
        this.scatterSeries1.yAxisName = "numericYAxis";
        this.scatterSeries1.xMemberPath = "Index";
        this.scatterSeries1.yMemberPath = "SinValue";

        this.scatterSeries2 = new IgrScatterSeries({name: "scatterSeries2"});
        this.scatterSeries2.dataSource = this.scatterData;
        this.scatterSeries2.xAxis = this.numericXAxis;
        this.scatterSeries2.yAxis = this.numericYAxis;
        this.scatterSeries2.xAxisName = "numericXAxis";
        this.scatterSeries2.yAxisName = "numericYAxis";
        this.scatterSeries2.xMemberPath = "Index";
        this.scatterSeries2.yMemberPath = "CosValue";
    }

    public initData() {
        this.categoryData = SampleCategoryData.create();
        this.scatterData = SampleScatterData.createWaveData();
        this.financialData = SampleFinancialData.create();
    }

    public onAxisTypeChange = (e: any) => {
        this.chart.axes.clear();
        this.chart.series.clear();

        const value: string = e.target.value;

        if(value.includes("Column")){
            this.chart.axes.add(this.categoryXAxis);
            this.chart.axes.add(this.numericYAxis);

            this.chart.series.add(this.columnSeries1);
            this.chart.series.add(this.columnSeries2);
        }
        else if(value.includes("Bar")){
            this.chart.axes.add(this.categoryYAxis);
            this.chart.axes.add(this.numericXAxis);

            this.chart.series.add(this.barSeries1);
            this.chart.series.add(this.barSeries2);
        }
        else if(value.includes("Scatter")){
            this.chart.axes.add(this.numericXAxis);
            this.chart.axes.add(this.numericYAxis);

            this.chart.series.add(this.scatterSeries1);
            this.chart.series.add(this.scatterSeries2);
        }
        else{
            this.chart.axes.add(this.timeXAxis);
            this.chart.axes.add(this.numericYAxis);

            this.chart.series.add(this.financialSeries);
            this.chart.series.add(this.valueLayer);
        }
    }

    public onChartRef(chart: IgrDataChart) {
        if (!chart) { return; }

        this.chart = chart;

        this.chart.axes.add(this.categoryXAxis);
        this.chart.axes.add(this.numericYAxis);

        this.chart.series.add(this.columnSeries1);
        this.chart.series.add(this.columnSeries2);
    }
}