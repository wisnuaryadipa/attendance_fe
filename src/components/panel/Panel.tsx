import react from 'react';
import Container, {ContainerProps} from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import AppProps from 'src/types/propsTypes';


const Panel = (props: ContainerProps): JSX.Element => {
    const render = (
        <Container component={Paper} sx={{minWidth:'400px'}} {...props}>
            {props.children}
        </Container>
    );

    return render;
    
}

export default Panel;