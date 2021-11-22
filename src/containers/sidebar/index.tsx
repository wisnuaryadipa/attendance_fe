import {FC} from 'react';
import sidebarStyles from '@containers/sidebar/sidebarStyles';
import styled from 'styled-components';

const Sidebar: FC = styled(() => {
    const sidebar = (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">
                        <ul className="sidebarList">
                            <li className="sidebarListItem">

                            </li>
                        </ul>
                    </h3>
                </div>
            </div>
        </div>
    )
    return sidebar;
})`
    ${sidebarStyles};
`;

export default Sidebar;