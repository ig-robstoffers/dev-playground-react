import * as React from 'react';

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
    IgrToolActionSeparator
} from 'igniteui-layouts';

IgrToolbarModule.register();

export default class PopupTesting extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <IgrToolbar orientation="Horizontal" >
                    <IgrToolActionIconMenu key="menu">
                        <IgrToolActionGroupHeader key="header" title='Hello World'/>
                        <IgrToolActionLabel key="label1" title='Button 1'/>
                        <IgrToolActionLabel key="label2" title='Button 2'/>
                        <IgrToolActionLabel key="label3" title='Button 3'/>
                    </IgrToolActionIconMenu>
                </IgrToolbar>
                <IgrToolbar orientation="Vertical" >
                    <IgrToolActionIconMenu key="menu2">
                        <IgrToolActionGroupHeader key="header2" title='Hello World'/>
                        <IgrToolActionLabel key="label4" title='Button 1'/>
                        <IgrToolActionLabel key="label5" title='Button 2'/>
                        <IgrToolActionLabel key="label6" title='Button 3'/>
                    </IgrToolActionIconMenu>
                </IgrToolbar>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IgrToolbar orientation="Vertical" >
                        <IgrToolActionIconMenu key="menu2">
                            <IgrToolActionGroupHeader key="header2" title='Hello World'/>
                            <IgrToolActionLabel key="label4" title='Button 1'/>
                            <IgrToolActionLabel key="label5" title='Button 2'/>
                            <IgrToolActionLabel key="label6" title='Button 3'/>
                        </IgrToolActionIconMenu>
                    </IgrToolbar>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IgrToolbar orientation="Horizontal" >
                        <IgrToolActionIconMenu key="menu2">
                            <IgrToolActionGroupHeader key="header2" title='Hello World'/>
                            <IgrToolActionLabel key="label4" title='Button 1'/>
                            <IgrToolActionLabel key="label5" title='Button 2'/>
                            <IgrToolActionLabel key="label6" title='Button 3'/>
                        </IgrToolActionIconMenu>
                    </IgrToolbar>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', flexGrow: 1 }}>
                    <IgrToolbar orientation="Horizontal" >
                        <IgrToolActionIconMenu key="menu2">
                            <IgrToolActionGroupHeader key="header2" title='Hello World'/>
                            <IgrToolActionLabel key="label4" title='Button 1'/>
                            <IgrToolActionLabel key="label5" title='Button 2'/>
                            <IgrToolActionLabel key="label6" title='Button 3'/>
                        </IgrToolActionIconMenu>
                    </IgrToolbar>
                </div>
            </div>
        );
    }
}