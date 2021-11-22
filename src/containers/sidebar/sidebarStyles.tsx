import {css} from 'styled-components';

const sidebarStyles = css`
    .sidebar{
        flex: 1;
        height: calc(100vh - 50px);
        background-color: rgb(251, 251, 255);
        position: sticky;
        top: 50px;

    }

    .sidebarWrapper{
        padding: 20px;
        color: #555;
    }

    .sidebarMenu{
        margin-bottom: 10px;
    }
`;

export default sidebarStyles;