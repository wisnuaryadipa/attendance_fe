import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';
import {Fragment} from 'react';
import SideBar from '@containers/sidebar'
import Container from '@mui/material/Container';
import MainBar from '@containers/mainbar';
import Pages from '@pages/index';
import Layout from '@pages/layout/attendanceMain'
import styled from 'styled-components';

import masterRoutes from './masterRoutes';
import attendanceRoutes from './attendanceRoutes';
import exportRoutes from './exportRoutes';
import payrollRoutes from './payrollRoutes';
import importRoutes from './importRoutes';

import PrintPayroll from '@pages/payroll/printPayroll';
import PrintPayrollAll from '@pages/payroll/printPayrollMany';


const ContainerStyled = styled(Container)`
    flex: 5;
`

const Router = () => {
    const result = (
        <BrowserRouter>
            <Routes>
                <Route caseSensitive={true} path="/" element={<Layout/>}> 
                    <Route path="/" element={<MainBar/>} />
                    { masterRoutes.map((route,) => {
                        const RouteComponent = route.pageComponent as React.ComponentType;
                        return (<Route caseSensitive={true} path={'master' + route.path} element={<RouteComponent/>}></Route>)
                    }) }
                    { attendanceRoutes.map((route) => {
                        const RouteComponent = route.pageComponent as React.ComponentType;
                        return (<Route caseSensitive={true} path={'attendance' + route.path} element={<RouteComponent/>}></Route>)
                    }) }
                    { payrollRoutes.map((route) => {
                        const RouteComponent = route.pageComponent as React.ComponentType;
                        return (<Route caseSensitive={true} path={'payroll' + route.path} element={<RouteComponent/>}></Route>)
                    }) }
                    { exportRoutes.map((route) => {
                        const RouteComponent = route.pageComponent as React.ComponentType;
                        return (<Route caseSensitive={true} path={'export' + route.path} element={<RouteComponent/>}></Route>)
                    }) }
                    { importRoutes.map((route) => {
                        const RouteComponent = route.pageComponent as React.ComponentType;
                        return (<Route caseSensitive={true} path={'import' + route.path} element={<RouteComponent/>}></Route>)
                    }) }
                    
                </Route>
                <Route caseSensitive={true} path="/">
                    <Route path={`payroll/printall`} element={<PrintPayrollAll/>}></Route>
                    <Route path={`payroll/:employeeId/print`} element={<PrintPayroll/>}></Route>
                </Route>
                <Route path="*" element={<Pages.Page404/>}> </Route>
            </Routes>
        </BrowserRouter>
    )
    return result;
}

export default Router;
