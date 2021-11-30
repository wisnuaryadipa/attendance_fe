import react, { HTMLAttributes } from 'react';
import Container, {ContainerProps} from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import AppProps from 'src/types/propsTypes';
import styled from 'styled-components';

const PanelFooter = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-top: 1px solid #cecece;

    .text-information {
        color: #9e9e9e;
    }
`

const Panel = (props: HTMLAttributes<HTMLDivElement>): JSX.Element => {
    const render = (
        <PanelFooter {...props}>
            {props.children}
        </PanelFooter>
    );

    return render;
    
}

export default Panel;