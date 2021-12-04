import react, { HTMLAttributes } from 'react';
import Container, {ContainerProps} from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import AppProps from 'src/types/propsTypes';
import styled from 'styled-components';

const PanelHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid #cecece;
`

const Panel = (props: HTMLAttributes<HTMLDivElement>): JSX.Element => {
    const render = (
        <PanelHeader {...props}>
            {props.children}
        </PanelHeader>
    );

    return render;
    
}

export default Panel;