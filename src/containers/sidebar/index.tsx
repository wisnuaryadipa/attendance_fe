import {FC} from 'react';
import sidebarStyles from '@containers/sidebar/sidebarStyles';
import {LineStyle, Timeline, TrendingUp } from '@material-ui/icons';
import styled from 'styled-components';
import DataSidebarMenu from './sidebar-menu.json';
import ListMenu from '@components/listMenu';

const SidebarWrapper = styled.div`
    padding: 20px;
    color: #555;
`;

const SidebarMenu = styled.div`
    margin-bottom: 10px;
`

const SidebarTitle = styled.h3`
    font-size: 13px;
    color: #a3a3a3;
`

const SidebarList = styled.ul`
    list-style: none;
    padding: 5px;
`

const SidebarListItem = styled.li`
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    border-radius: 10px;

    :hover  {
       background-color: rgb(240, 240, 255)
    }
`

const LineStyleEnhc = styled(LineStyle)`
    
`

const Sidebar: FC = styled((props) => (
    <div className="sidebar" {...props}>
        <SidebarWrapper className="sidebarWrapper">
            <ListMenu data={DataSidebarMenu}></ListMenu>
        </SidebarWrapper>
    </div>
))`${sidebarStyles}`;

export default Sidebar;