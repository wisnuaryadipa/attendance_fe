import react, { HTMLAttributes } from 'react';
import Container, {ContainerProps} from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import AppProps from 'src/types/propsTypes';
import styled from 'styled-components';

const PanelBody = styled.div`
    padding: 20px 15px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
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