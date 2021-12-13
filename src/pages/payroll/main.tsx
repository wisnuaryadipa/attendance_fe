import react from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Panel, PanelHeader, PanelBody} from '@components/panel';
import FormInput from './formInput';

const Payroll = () => {
    return (
        <Panel>
            <PanelHeader>
                <Box>
                    <Typography variant='h5'>Form Print Payroll</Typography>
                    
                </Box>
            </PanelHeader>
            <PanelBody>
                <FormInput></FormInput>
            </PanelBody>
        </Panel>
    )
}

export default Payroll;