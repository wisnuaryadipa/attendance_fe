import react from 'react';
import Container, {ContainerProps, ContainerTypeMap} from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import AppProps from 'src/types/propsTypes';
import { OverridableComponent } from '@mui/material/OverridableComponent';


const Panel = (props: ContainerProps): JSX.Element => {
    const render = (
        <Container className={`id${props.about}`} component={Paper} sx={{minWidth:'400px'}} {...props}>
            {props.children}
        </Container>
    );

    return render;
    
}

export default Panel;