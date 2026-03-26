import * as React from 'react';

import {
    IgrDashboardTileModule,
    IgrDataChartDashboardTileModule,
    IgrPieChartDashboardTileModule,
    IgrLinearGaugeDashboardTileModule,
    IgrRadialGaugeDashboardTileModule,
    IgrGeographicMapDashboardTileModule,
    IgrDashboardTile
} from 'igniteui-dashboards';

import { DataGenerator, Sale } from 'src/data/data';

IgrDashboardTileModule.register();
IgrDataChartDashboardTileModule.register();
IgrPieChartDashboardTileModule.register();
IgrLinearGaugeDashboardTileModule.register();
IgrRadialGaugeDashboardTileModule.register();
IgrGeographicMapDashboardTileModule.register();

export default class DashboardTileSample extends React.Component<any, any> {
    
    private _data: Sale[];

    constructor(props: any) {
        super(props);

        this._data = DataGenerator.getSales();
    }

    render() {
        return (
            <div className="container sample">
                <IgrDashboardTile dataSource={this._data} width='100%' height='400px' trendLineTypes={'LinearFit'}>

                </IgrDashboardTile>
            </div>
        );
    }
}