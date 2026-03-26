import * as React from 'react';

import {
    IgrDataGridModule,
    IgrDataGrid,
    IgrDateTimeColumn,
    EditModeType,
    IgrFormatCellEventArgs,
    IgrDataBindingEventArgs,
    IgrNumericColumn,
    TextCellDecoration,
    IgrMultiColumnComboBox,
    IgrMultiColumnComboBoxModule,
    IgrGridConditionalStyle,
    IgrGridConditionalStyleProperty,
    GridConditionalStylePropertyStylingType,
    IgrTextColumn,
    IgrImageColumn,
    IgrGridCellValueChangingEventArgs,
    IgrHyperlinkColumn,
    IgrGridHyperlinkNavigationRequestedEventArgs,
    IgrComboBoxColumn,
    IgrTemplateColumn,
    IgrTemplateCellUpdatingEventArgs
} from 'igniteui-data-grids';

import {
    DataSourceSchemaPropertyType,
    SvgIconRegistry,
    //IgrGenericVirtualDataSource,
    //IgrGenericVirtualDataSourceModule,
    //IgrPageRequestedEventArgs
} from 'igniteui-core';

import { DataGenerator, Sale } from 'src/data/data';
import { FakeDataSchemaField, FakeDataService } from 'src/data/FakeDataService';
import { DataGridSharedData } from 'src/data/DataGridSharedData';

//IgrGenericVirtualDataSourceModule.register();
IgrDataGridModule.register();
IgrMultiColumnComboBoxModule.register();

export default class DataGrid extends React.Component<any, any> {
    
    private _data: Sale[];
    private _employeeData: any[];
    //private _dataSource: IgrGenericVirtualDataSource;
    private _service: FakeDataService;
    private _currentSchema: FakeDataSchemaField[];

    constructor(props: any) {
        super(props);

        this._data = DataGenerator.getSales(100);

        //this._dataSource = new IgrGenericVirtualDataSource();
        //this._dataSource.pageRequested = this.onPageRequested.bind(this);

        this._service = new FakeDataService();

        SvgIconRegistry.instance.addSvgPathString("mycol", "rename", this.getToolbarRenameIcon());
        SvgIconRegistry.instance.addSvgPathString("reveal", "cfuptriangle", "M 20 10 L 5 30 L 35 30 Z");

        // this.columnRef = React.useCallback(this.onNumericColumn, []);

        this._employeeData = DataGridSharedData.getEmployees();
        // (this._sharedData as any).__dataIntents = {
        //     "URL": ["type:hyperlink;path:LastName"]
        // };

        this.state = {
            comboData: DataGridSharedData.getSales(5),
            focusedElement: null
        };
    }

    componentDidMount() {
        window.addEventListener('focus', this.handleDocumentFocus, true);
    }

    componentWillUnmount() {
        window.removeEventListener('focus', this.handleDocumentFocus, true);
    }

    handleDocumentFocus = (event: FocusEvent) => {
        const target = event.target as HTMLElement;
        if (!target) {
            this.setState({ focusedElement: null });
            return;
        }
        let desc = target.tagName;
        // if (desc && desc !== "INPUT") {
        //     debugger;
        // }
        if (target instanceof HTMLInputElement && target.type) {
            desc += ` (${target.type})`;
        }
        if (target.id) {
            desc += ` [id=${target.id}]`;
        }
        if (target.className) {
            desc += ` [class=${target.className}]`;
        }
        this.setState({ focusedElement: desc });
    }

    public getToolbarRenameIcon(): string {
        return "<svg width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">" +
            "<path d=\"M16.4998 3.54286V20.5158V3.54286Z\" stroke-linecap=\"round\" stroke-miterlimit=\"0\"/>" +
            "<path d=\"M13.9998 3.52107H18.9998\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>" +
            "<path d=\"M13.9998 20.5028H18.9998\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>" +
            "<path d=\"M5.80347 11.7358C6.05945 11.1679 6.6703 10.7893 7.36843 10.7893C8.33998 10.7893 9.06138 11.4203 9.06138 12.3668V15.2062\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>" +
            "<path d=\"M10.9878 8.89627V15.2062\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>" +
            "<path d=\"M5.5708 14.1283C5.5708 14.8014 6.15839 15.2063 6.87978 15.2063C8.06077 15.2063 9.06142 14.7015 9.06142 13.2344V12.9557C8.62509 12.9557 7.79898 12.9768 7.05431 13.0504C6.33874 13.124 5.5708 13.4027 5.5708 14.1283Z\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>" +
            "<path d=\"M12.8145 15.2062C13.8266 15.2062 14.6471 14.2175 14.6471 12.9978C14.6471 11.778 13.8266 10.7893 12.8145 10.7893C11.8024 10.7893 10.9819 11.778 10.9819 12.9978C10.9819 14.2175 11.8024 15.2062 12.8145 15.2062Z\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>" +
            "<path d=\"M13.3451 6.48873H3.41626V17.5399H13.3451M18.2988 6.48873H20.5125V17.5399H18.2647\" stroke-linejoin=\"round\"/>" +
            "</svg>";
    }

    render() {
        return (
            <div className="container sample" onMouseDown={this.onMouseDown}>
                {/* <IgrDataGrid dataSource={this._data} width='100%' height='400px' columnOptionsIconBehavior={"AlwaysVisible"}>
                    <IgrDateTimeColumn field="OrderDate" />
                    <IgrNumericColumn ref={this.onNumericColumn} field="ProductPrice"/>
                </IgrDataGrid> */}
                <input type="text" id="topInput"></input>

                <IgrDataGrid width='800px' height='400px' dataSource={this._employeeData} autoGenerateColumns={true} useNewerColumnOptionsMenu={true}>
                    
                </IgrDataGrid>

                <div style={{marginTop: '16px'}}>
                    <strong>Currently Focused Element:</strong>
                    <div>{this.state.focusedElement ? this.state.focusedElement.id ? this.state.focusedElement.id : this.state.focusedElement : 'None'}</div>
                </div>

                {/* <IgrMultiColumnComboBox width="600px" dataSource={this._data} defaultColumnWidth="200" fields={["ProductPrice", "OrderDate"]}>
                </IgrMultiColumnComboBox> */}

                <input type="text" id="bottomInput"></input>
            </div>
        );
    }

    private onCellUpdating = (s: IgrDataGrid, e: IgrTemplateCellUpdatingEventArgs) => {
        let t = e.content;
        //t.innerText = "hello world";
    }

    private onHyperlinkClick = (s: IgrDataGrid, e: IgrGridHyperlinkNavigationRequestedEventArgs) => {
       //window.open(e.navigateUri, "_blank");
    }

    private onCellValueChanging = (s: IgrDataGrid, e: IgrGridCellValueChangingEventArgs) => {
        if (e.column.field == "Sales") {
            const rowItem = e.cellInfo.rowItem;
            const newItem = rowItem;
            newItem.Salary = 999999;
            newItem.Sales = e.newValue;

            let index = this._sharedData.indexOf(rowItem);
            s.notifySetItem(index, rowItem, newItem);
        }
    }

    private onNumericColumn = (column: IgrNumericColumn) => {
        if (!column) { return; }

        let cs = new IgrGridConditionalStyle({});
        cs.styleKey = "band1";
        cs.conditionString = "Salary gt 500";

        let prop1 = new IgrGridConditionalStyleProperty({});
        prop1.stylingType = GridConditionalStylePropertyStylingType.DirectSet;
        prop1.propertyName = "Background";
        prop1.brushValue = "#8aca7a";

        cs.properties.add(prop1);
        column.conditionalStyles.add(cs);
    }

    private onTextColumn = (column: IgrTextColumn) => {
        if (!column) { return; }

        let cs = new IgrGridConditionalStyle({});
        cs.styleKey = "band1";
        cs.conditionString = "City eq 'Warsaw'";

        let prop1 = new IgrGridConditionalStyleProperty({});
        prop1.stylingType = GridConditionalStylePropertyStylingType.DirectSet;
        prop1.propertyName = "Background";
        prop1.brushValue = "#8aca7a";

        cs.properties.add(prop1);
        column.conditionalStyles.add(cs);
    }

    private columnRef;

    private onDataBound = (sender: any, args: IgrDataBindingEventArgs) => {
        //args.cellInfo.textDecoration = TextCellDecoration.Strikethrough;
    }

    private onMouseDown = (e: React.MouseEvent) => {
        //console.log("mouse down");
    }

    private onFormatCell = (sender: any, args: IgrFormatCellEventArgs) => {
        //args.text = "hello world";
    }

    // private onPageRequested(sender: any, args: IgrPageRequestedEventArgs) {
    //     if (args.isSchemaRequest) {
    //         // schema request
    //         this._service.getSchema().then(schema => {
    //             this._currentSchema = schema;
    //             this._service.getCount().then(count => {
    //                 this._dataSource.fillPageStart(args.dataSourceId, args.requestId);
    //                 this._dataSource.fillCount(count);
    //                 for (let i = 0; i < schema.length; i++) {
    //                     switch (schema[i].type) {
    //                         case 'integer':
    //                             this._dataSource.addSchemaProperty(schema[i].name, DataSourceSchemaPropertyType.IntValue);
    //                             break;
    //                         case 'string':
    //                             this._dataSource.addSchemaProperty(schema[i].name, DataSourceSchemaPropertyType.StringValue);
    //                             break;
    //                         case 'date':
    //                             this._dataSource.addSchemaProperty(schema[i].name, DataSourceSchemaPropertyType.DateTimeValue);
    //                             break;
    //                     }
    //                 }
    //                 this._dataSource.fillPageEnd();
    //             });
    //         });
    //     } else {
    //         // data request
    //         this._service.getData(args.pageIndex * 20, 20).then(data => {
    //             this._dataSource.fillPageStart(args.dataSourceId, args.requestId);
    //             for (let i = 0; i < this._currentSchema.length; i++) {
    //                 let columnValues = [];
    //                 for (let j = 0; j < data.length; j++) {
    //                     let value = data[j][this._currentSchema[i].name];
    //                     columnValues.push(value);
    //                 }
    //                 switch (this._currentSchema[i].type) {
    //                     case 'integer':
    //                         this._dataSource.fillColumnInt(this._currentSchema[i].name, columnValues);
    //                         break;
    //                     case 'string':
    //                         this._dataSource.fillColumnString(this._currentSchema[i].name, columnValues);
    //                         break;
    //                     case 'date':
    //                         this._dataSource.fillColumnDate(this._currentSchema[i].name, columnValues);
    //                         break;
    //                 }
    //             }
    //             this._dataSource.fillPageEnd();
    //         });
    //     }
    // }
}