import { Outlet } from "react-router";
import {Container} from "@mui/material";
import styled from 'styled-components';
import SideBar from '@containers/sidebar'



const ContainerStyled = styled(Container)`
    margin-top: 50px;
    flex: 5;
`

const attendanceLayout = () => {

    return (
        <>
            <SideBar/>
            <ContainerStyled maxWidth={false}>
                <Outlet/>
            </ContainerStyled>
        </>
    )
}

export default attendanceLayout;