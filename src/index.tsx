import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Link } from "react-router-dom";

import Home from './pages/home';

import Simple from './pages/simple';
import DataGrid from './pages/datagrid';
import PopupTesting from './pages/popup_testing';
import DataPie from './pages/piechart';
import FunnelChart from './pages/funnelchart';
import DashboardTileSample from './pages/dashboardtile';

import Portals from './pages/portals';

import AxisRangeBufferInfinity from './pages/bugs/axisrangebufferinfinity';
import DataChartAxisTypes from './pages/axistypes';
import UserAnnotations from './pages/userannotations';

import OrdinalTimeXAxisSample from './pages/axisTypes/ordinalTimeXAxis';
import SchemaHintsExample from './pages/misc/schemaHints';
import RevealDataGrid from './pages/revealgrid';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    
    <HashRouter>
        <div className="app_main">
            <div className="app_nav">
                <ul className="app_nav_list">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/simple">Simple Sample</Link></li>
                    <li><Link to="/piechart">Data Pie Chart</Link></li>
                    <li><Link to="/datagrid">Data Grid Sample</Link></li>
                    <li><Link to="/popuptesting">Popup Testing</Link></li>
                    <li><Link to="/portals">Portals!</Link></li>
                    <li><Link to="/funnelchart">Funnel Chart</Link></li>
                    <li><Link to="/dashboardtile">Dashboard Tile</Link></li>
                    <li><Link to="/axistypes">Data Chart Axis Types</Link></li>
                    <li><Link to="/userannotations">User Annotations</Link></li>
                    <li><Link to="/ordinaltimexaxis">Ordinal Time X Axis</Link></li>
                    <li><Link to="/revealgrid">Reveal Data Grid</Link></li>
                </ul>
                <h4 className="app_nav_header">Misc</h4>
                <ul className="app_nav_list">
                    <li><Link to="/schemahints">Schema Hints Example</Link></li>
                </ul>
                <h4 className="app_nav_header">Bugs</h4>
                <ul className="app_nav_list">
                    <li><Link to="/axisrangebufferinfinity">AxisRangeBuffer Infinity Bug</Link></li>
                </ul>
            </div>
            <div className="app_content">
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/simple" element={<Simple />}/>
                    <Route path="/datagrid" element={<DataGrid />}/>
                    <Route path="/popuptesting" element={<PopupTesting />}/>
                    <Route path="/piechart" element={<DataPie />}/>
                    <Route path="/portals" element={<Portals/>}/>
                    <Route path="/funnelchart" element={<FunnelChart/>}/>
                    <Route path="/dashboardtile" element={<DashboardTileSample/>}/>
                    <Route path="/revealgrid" element={<RevealDataGrid/>}/>
                    <Route path="/axistypes" element={<DataChartAxisTypes/>}/>
                    <Route path="/axisrangebufferinfinity" element={<AxisRangeBufferInfinity/>}/>
                    <Route path="/userannotations" element={<UserAnnotations/>}/>
                    <Route path="/ordinaltimexaxis" element={<OrdinalTimeXAxisSample/>}/>
                    <Route path="/schemahints" element={<SchemaHintsExample/>}/>

                </Routes>
            </div>
        </div>
    </HashRouter>
    
);