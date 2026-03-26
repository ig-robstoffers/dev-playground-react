import * as React from 'react';

import './simple.css';

import {
    IgrCategoryChartModule,
    IgrCategoryChartToolbarModule,
    IgrLegendModule,
    IgrCategoryChart,
    IgrLegend,
    IgrDataChartCoreModule,
    IgrDataChartCategoryCoreModule,
    IgrDataChartCategoryModule,
    IgrDataChartInteractivityModule,
    IgrDataChartVerticalCategoryModule,
    IgrDataChartAnnotationModule,
    IgrDataChartToolbarModule,
    IgrDataChartVisualDataModule,
    IgrDataChart,
    IgrBarSeries,
    IgrColumnSeries,
    IgrCategoryYAxis,
    IgrCategoryXAxis,
    IgrNumericXAxis,
    IgrCalloutLayer,
    IgrFinalValueLayer,
    IgrValueLayer,
    IgrCrosshairLayer,
    IgrDomainChartSeriesPointerEventArgs,
    IgrNumericYAxis,
    IgrTrendLineLayer,
    IgrNumericAngleAxis,
    IgrNumericRadiusAxis,
    IgrLineSeries,
    IgrRadialLineSeries,
    IgrPolarLineSeries,
    IgrPolarScatterSeries,
    IgrAxisMouseEventArgs,
    IgrDataAnnotationSliceLayer,
    IgrAxisAnnotation
} from 'igniteui-charts';

import {
    IgrToolbarModule,
    IgrToolbar,
    IgrToolActionLabel,
    IgrToolActionIconMenu,
    IgrToolActionIconButton,
    IgrToolActionButton,
    IgrToolActionSubPanel,
    IgrToolActionCombo,
    IgrToolActionGroupHeader,
    IgrToolActionSeparator,
    IgrToolActionRadioGroup,
    IgrToolActionRadio
} from 'igniteui-layouts';

import { IgrCheckboxListModule } from 'igniteui-data-grids';

import { CountryRenewableElectricityItem, CountryRenewableElectricity } from '../data/CountryRenewableElectricity';
import { IgrAssigningCategoryStyleEventArgs } from '../ig/igniteui-charts/igr-assigning-category-style-event-args';

const JSON5 = require('json5')


const mods: any[] = [
    IgrLegendModule,
    IgrToolbarModule,
    IgrCategoryChartModule,
    IgrCategoryChartToolbarModule,
    IgrCheckboxListModule,
    IgrDataChartCoreModule,
    IgrDataChartCategoryCoreModule,
    IgrDataChartCategoryModule,
    IgrDataChartAnnotationModule
];
mods.forEach((m) => m.register());

export default class Simple extends React.Component<any, any> {
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
    private chart: IgrCategoryChart
    private chartRef(r: IgrCategoryChart) {
        this.chart = r;
        this.setState({});
    }
    private dataChart: IgrDataChart;
    private dataChartRef(r: IgrDataChart) {
        this.dataChart = r;

        if (this.dataChart) {
            // window.setInterval(() => {
            //     let sliceLayer = null;
            //     for (let i = 0; i < this.dataChart.actualSeries.length; i++) {
            //         if (this.dataChart.actualSeries[i].name === "anno") {
            //             sliceLayer = this.dataChart.actualSeries[i];
            //             break;
            //         }
            //     }

            //     for (let i = this.dataChart.actualAxes.length - 1; i >= 0; i--) {
            //         if (this.dataChart.actualAxes[i].isCompanionAxis) {
            //             sliceLayer.targetAxis = this.dataChart.actualAxes[i];
            //             break;
            //         }
            //     }
            // }, 2000);
        }
        this.setState({});
    }

    private catChartRef = (r: any) => {
        if (r) {
            let anno = new IgrAxisAnnotation();
            anno.value = 30;
            anno.text = "30";
            anno.background = "limegreen";
            anno.isBadgeEnabled = true;
            anno.badgeBackground = "white";

            r.annotations.add(anno);
        }
    }

    constructor(props: any) {
        super(props);

        this.legendRef = this.legendRef.bind(this);
        this.toolbarRef = this.toolbarRef.bind(this);
        this.chartRef = this.chartRef.bind(this);
        this.dataChartRef = this.dataChartRef.bind(this);

        window.onresize = () => {
            if (this.dataChart) {
                this.dataChart.notifyContainerResized();
            }
        };

        this.state = {
            rotation: 0,
            isVisible: false,
            annos: [
                // { label: "A really long annotation of exemplary excellence.", value: 1.5 },
                // { label: "Not so long of an annotation.", value: 4 },
                {
                    label: "",
                    value: 4.5,
                 }
            ],
            angle: 0
        };

        document.fonts.onloadingdone = (e) => {
            this.setState({ isVisible: true });
        }
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
                        <IgrToolbar
                            ref={this.toolbarRef}
                            target={this.dataChart}
                            orientation="Horizontal">
                                {/* <IgrToolActionIconMenu key="mnu">
                                    <IgrToolActionRadioGroup key="grp1" title="Radio Group Example">
                                        <IgrToolActionGroupHeader key="hdr" title="Choose an option:"/>
                                        <IgrToolActionRadio key="rd1" title="Option 1"/>
                                        <IgrToolActionRadio key="rd2" title="Option 2"/>
                                        <IgrToolActionRadio key="rd3" title="Option 3"/>
                                    </IgrToolActionRadioGroup>
                                </IgrToolActionIconMenu> */}
                        </IgrToolbar>
                    </div>
                </div>
                <div className="aboveContentRightContainer">
                    <div>
                        <IgrLegend
                            ref={this.legendRef}
                            orientation="Horizontal">
                        </IgrLegend>
                    </div>
                </div>
            </div>

            <div className="container fill">
                {this.state.isVisible && <div style={{ position: "relative" }}>
                    {/* <IgrCategoryChart
                        ref={this.chartRef} width="100%" height="500px"
                        chartType="Line"
                        dataSource={this.countryRenewableElectricity}
                        legend={this.legend}
                        >
                    </IgrCategoryChart> */}
                    
                    <IgrDataChart ref={this.dataChartRef} width="500px" height="500px"  axisLabelMouseClick={this.onLabelMouseClick} axisPanelMouseClick={this.onPanelMouseClick}>
                        <IgrCategoryXAxis ref={this.catChartRef} name="xAxis" dataSource={this.countryRenewableElectricity} label={"year"} interval={1} labelAngle={this.state.angle}/>
                        <IgrNumericYAxis name="yAxis"/>
                        <IgrColumnSeries name="europe" xAxisName="xAxis" yAxisName="yAxis"
                            valueMemberPath="europe" dataSource={this.countryRenewableElectricity}/>

                        {/* <IgrNumericAngleAxis name="angleAxis"></IgrNumericAngleAxis>
                        <IgrNumericRadiusAxis ref={this.catChartRef} name="radiusAxis" crossingAxisName="angleAxis" crossingValue={this.state.angle} labelAngle={45}></IgrNumericRadiusAxis>
                        <IgrPolarLineSeries name="series1" angleAxisName="angleAxis" radiusAxisName="radiusAxis"
                            radiusMemberPath="europe" angleMemberPath="year"
                            dataSource={this.countryRenewableElectricity}/> */}
                    </IgrDataChart>

                    {/* <canvas ref={this.canvasRef} style={{ position: "absolute", top: "0", left: "0", width: "500px", height: "500px"}} width={500} height={500}>

                    </canvas>

                    <input type="range" min="0" max="360" value={this.state.angle} onChange={this.onchange}></input>

                    <button onClick={this.onClick}>Add Bounds</button> */}
                </div>}
            </div>
        </div>
        );
    }

    onLabelMouseClick = (s: any, e: IgrAxisMouseEventArgs) => {
        console.log(e);
    }

    onPanelMouseClick = (s: any, e: any) => {
        console.log(e);
    }

    _ctx: CanvasRenderingContext2D | null = null;
    private canvasRef = (r: any) => {
        if (r) {
            this._ctx = r.getContext('2d');
        }
    }

    private onClick = (e: any) => {
        let d = this.dataChart.exportSerializedVisualData();
        let vd = JSON5.parse(d);
        
        let topLeft = vd.axes[1].labels[1].anchors[0];
        let topRight = vd.axes[1].labels[1].anchors[1];
        let botRight = vd.axes[1].labels[1].anchors[2];
        let botLeft = vd.axes[1].labels[1].anchors[3];

        if (this._ctx) {
            this._ctx.clearRect(0, 0, 500, 500);
            this._ctx.strokeStyle = "red";
            this._ctx.lineWidth = 2;
            this._ctx.beginPath();
            this._ctx.moveTo(topLeft.x, topLeft.y);
            this._ctx.lineTo(topRight.x, topRight.y);
            this._ctx.lineTo(botRight.x, botRight.y);
            this._ctx.lineTo(botLeft.x, botLeft.y);
            this._ctx.closePath();
            this._ctx.stroke();
        }
    }

    private onchange = (e: any) => {
        this.setState({ angle: e.target.value });
    }

    private _countryRenewableElectricity: CountryRenewableElectricity | null = null;
    public get countryRenewableElectricity(): CountryRenewableElectricity {
        if (this._countryRenewableElectricity == null)
        {
            this._countryRenewableElectricity = new CountryRenewableElectricity();
        }
        return this._countryRenewableElectricity;
    }
}