import * as React from 'react';

import {
    IgrLegend,
    IgrDataChartCoreModule,
    IgrDataChartCategoryCoreModule,
    IgrDataChartCategoryModule,
    IgrDataChartInteractivityModule,
    IgrDataChartAnnotationModule,
    IgrDataChart,
    IgrColumnSeries,
    IgrLineSeries,
    IgrCategoryXAxis,
    IgrNumericYAxis,
    IgrDataChartToolbarModule,
    IgrUserAnnotationInformationEventArgs,
    IgrUserAnnotationToolTipContentUpdatingEventArgs
} from 'igniteui-charts';

import {
    IgrToolbarModule,
    IgrToolbar,
} from 'igniteui-layouts';

import { IgrCheckboxListModule } from 'igniteui-data-grids';

import { CountryRenewableElectricityItem, CountryRenewableElectricity } from '../data/CountryRenewableElectricity';


const mods: any[] = [
    IgrToolbarModule,
    IgrDataChartCoreModule,
    IgrDataChartCategoryCoreModule,
    IgrDataChartCategoryModule,
    IgrDataChartInteractivityModule,
    IgrDataChartAnnotationModule,
    IgrDataChartToolbarModule
];
mods.forEach((m) => m.register());

export default class UserAnnotations extends React.Component<any, any> {
    private legend: IgrLegend
    private legendRef(r: IgrLegend) {
        this.legend = r;
        this.setState({});
    }
    private toolbar: IgrToolbar
    private toolbarRef(r: IgrToolbar) {
        this.toolbar = r;
        this.setState({});
    }
    private dataChart: IgrDataChart;
    private dataChartRef(r: IgrDataChart) {
        this.dataChart = r;
        this.setState({
            target: r
        });
    }

    constructor(props: any) {
        super(props);

        this.legendRef = this.legendRef.bind(this);
        this.toolbarRef = this.toolbarRef.bind(this);
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

            <div className="aboveContentSplit">
                <div className="aboveContentLeftContainer">
                    <div>
                        <IgrToolbar ref={this.toolbarRef} target={this.state.target}/>
                    </div>
                </div>
            </div>

            <div className="container fill">
                <IgrDataChart ref={this.dataChartRef} width="100%" height="500px" userAnnotationInformationRequested={this.onUserAnnotationInfoRequested}
                    userAnnotationToolTipContentUpdating={this.onUserAnnotationToolTipContentUpdating}>
                    <IgrCategoryXAxis name="xAxis" dataSource={this.countryRenewableElectricity} label={"year"}/>
                    <IgrNumericYAxis name="yAxis"/>
                    <IgrColumnSeries name="europe"
                        xAxisName="xAxis"
                        yAxisName="yAxis"
                        valueMemberPath="europe"
                        dataSource={this.countryRenewableElectricity}/>
                </IgrDataChart>
            </div>

            <button onClick={this.onClick}>Click Me!</button>
        </div>
        );
    }

    private onClick = (e: any) => {
        this.toolbar.toggleSubmenu("AnalyzeMenu");
    }

    private _countryRenewableElectricity: CountryRenewableElectricity = null;
    public get countryRenewableElectricity(): CountryRenewableElectricity {
        if (this._countryRenewableElectricity == null)
        {
            this._countryRenewableElectricity = new CountryRenewableElectricity();
        }
        return this._countryRenewableElectricity;
    }

    private onUserAnnotationInfoRequested = (s: IgrDataChart, e: IgrUserAnnotationInformationEventArgs) => {

        var annoInfo = e.annotationInfo;
        setTimeout(() => {
            annoInfo.label = "Hello world!";
            annoInfo.badgeImageUri = "https://th.bing.com/th/id/ODF.Y77AUHJ37M167GfxiS3cyg?w=32&h=32&qlt=91&pcl=fffffa&o=6&cb=12&pid=1.2";
            this.dataChart.finishAnnotationFlow(annoInfo);
        }, 2000);
    }

    private onUserAnnotationToolTipContentUpdating = (s: IgrDataChart, args: IgrUserAnnotationToolTipContentUpdatingEventArgs) => {
        var container = args.i.content as HTMLDivElement;
        var template = this.createDataChartTooltip(args.annotationInfo);

        container.textContent = '';
        container.append(template);

        container.parentElement!.parentElement!.style.borderWidth = "0px";

        console.log(args.annotationInfo);

        // setTimeout(function() {
        //     debugger;
        // }, 3000);
    }

    public createDataChartTooltip(context: any): any {
        if (!context) return null;

        var tooltip = document.createElement("div");

        var title = document.createElement("div");
        title.innerHTML = "User content with a link to <a href='http://www.google.com' target='_blank'>Google</a>";
        title.className = "tooltipTitle";
        tooltip.appendChild(title);

        var secondLine = document.createElement("div");
        secondLine.innerHTML = "Second div with a button <button type='button'>Click Me!</button>";
        tooltip.appendChild(secondLine);

        return tooltip;
    }
}