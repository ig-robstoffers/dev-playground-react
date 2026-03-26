import * as React from 'react';

import { LocalDataSource } from 'igniteui-core';

import {
    IgrCategoryChartModule,
    IgrLegendModule,
    IgrCategoryChart,
} from 'igniteui-charts';

import { CountryRenewableElectricityItem, CountryRenewableElectricity } from '../../data/CountryRenewableElectricity';


const mods: any[] = [
    IgrLegendModule,
    IgrCategoryChartModule,
];
mods.forEach((m) => m.register());

export default class SchemaHintsExample extends React.Component<any, any> {

    private chart: IgrCategoryChart
    private chartRef(r: IgrCategoryChart) {
        this.chart = r;
    }

    constructor(props: any) {
        super(props);
    
        this.chartRef = this.chartRef.bind(this);

        var ds = new LocalDataSource();
        ds.dataSource = this.countryRenewableElectricity;
        ds.schemaHints = "label:StringValue,year:DoubleValue,europe:DoubleValue,china:DoubleValue,america:DoubleValue";

        this.state = {
            dataSource: ds
        };
    }

    public render(): JSX.Element {
        return (
        <div className="container sample">
            <IgrCategoryChart
                ref={this.chartRef} width="500px" height="500px"
                chartType="Line"
                dataSource={this.state.dataSource}
                >
            </IgrCategoryChart>
        </div>
        );
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