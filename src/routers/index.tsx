import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';
import {Fragment} from 'react';
import SideBar from '@containers/sidebar'
import Container from '@mui/material/Container';
import MainBar from '@containers/mainbar';
import Pages from '@pages/index';
import Layout from '@pages/layout/attendanceMain'
import styled from 'styled-components';

import masterRoutes from './masterRoutes';


const ContainerStyled = styled(Container)`
    flex: 5;
`

const Router = () => {
    const result = (
        <BrowserRouter>
            <Routes>
                <Route caseSensitive={true} path="/" element={<Layout/>}> 
                    <Route path="/" element={<MainBar/>} />
                    { masterRoutes.map((route) => {
                        const RouteComponent = route.pageComponent as React.ComponentType;
                        return (<Route caseSensitive={true} path={'master' + route.path} element={<RouteComponent/>}></Route>)
                    }) }
                </Route>
                <Route path="*" element={<Pages.Page404/>}> </Route>
            </Routes>
        </BrowserRouter>
    )
    return result;
}

export default Router;
