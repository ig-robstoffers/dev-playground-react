import * as React from 'react';

import {
    IgrDataGridModule,
    IgrDataGrid,
    IgrTextColumn,
    IgrNumericColumn,
    IgrDataBindingEventArgs,
} from 'igniteui-data-grids';

import { DataGenerator, Sale } from 'src/data/data';
import { IgrDataGridColumn } from 'igniteui-data-grids/igr-data-grid-column';
import { IgrDefinitionBase } from 'igniteui-data-grids/igr-definition-base';

IgrDataGridModule.register();

export default class RevealDataGrid extends React.Component<any, any> {
    
    private _data: Sale[];
    private _grid: IgrDataGrid;

    constructor(props: any) {
        super(props);

        this._data = DataGenerator.getSales(100);
    }

    private onGridRef = (grid: IgrDataGrid) => {
        if (!grid) { return; }

        this._grid = grid;
    }

    render() {
        return (
            <div>
                <IgrDataGrid width='800px' height='400px' ref={this.onGridRef} dataSource={this._data} autoGenerateColumns={false}
                    theme={"RevealLight"}
                    border='rgba(0,0,0,0.15)'
                    cornerRadiusBottomLeft={6}
                    cornerRadiusBottomRight={6}
                    cornerRadiusTopLeft={6}
                    cornerRadiusTopRight={6}
                    useNewerColumnOptionsMenu={true}
                    filterUIType={"FilterRow"}
                    headerHeight={48}
                    rowHeight={48}
                    headerBackground='white'
                    headerSeparatorBackground='transparent'
                    headerRowSeparatorBackground='#2E2E30'
                    rowSeparatorBackground='rgba(0,0,0,0.15)'
                    filterRowDataBound={this.onFilterRowDataBound}>
                    <IgrTextColumn field="ProductName" headerText="Product" dataBound={this.onDataBound}/>
                    <IgrNumericColumn field="Profit" headerText="Revenue" dataBound={this.onDataBound}/>
                    <IgrTextColumn field="Country" dataBound={this.onDataBound}/>
                </IgrDataGrid>
            </div>
        );
    }

    public onFilterRowDataBound = (s: any, e: IgrDataBindingEventArgs) => {
        if (e.cellInfo.columnIdx < this._grid.actualColumns.count - 1) {
            e.cellInfo.borderRightWidth = 1;
            e.cellInfo.border = "#8A8B90";
        } else {
            e.cellInfo.borderRightWidth = 0;
        }
    }

    public onDataBound = (s: IgrDataGridColumn, e: IgrDataBindingEventArgs) => {
        if (e.cellInfo.dataRow % 2 === 0) {
            e.cellInfo.background = '#F6F7FA';
        } else {
            e.cellInfo.background = 'white';
        }

        if (this._grid.actualColumns.indexOf(s) < this._grid.actualColumns.count - 1) {
            e.cellInfo.borderRightWidth = 1;
            e.cellInfo.border = "#8A8B90";
        } else {
            e.cellInfo.borderRightWidth = 0;
        }
    }
}