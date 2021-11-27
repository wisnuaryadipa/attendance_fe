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

const Sidebar: FC = styled((props) => (
    <div className="sidebar" {...props}>
        <SidebarWrapper className="sidebarWrapper">
            <ListMenu data={DataSidebarMenu}></ListMenu>
        </SidebarWrapper>
    </div>
))`${sidebarStyles}`;

export default Sidebar;