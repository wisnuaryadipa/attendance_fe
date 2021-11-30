import react, { HTMLAttributes } from 'react';
import Container, {ContainerProps} from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import AppProps from 'src/types/propsTypes';
import styled from 'styled-components';

const PanelBody = styled.div`
    padding: 20px 0;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;

    input {
        margin-right: 10px;
    }
    .text-input {
        margin: 8px;
    }
`

const Panel = (props: HTMLAttributes<HTMLDivElement>): JSX.Element => {
    const render = (
        <PanelBody {...props}>
            {props.children}
        </PanelBody>
    );

    return render;
    
}

export default Panel;