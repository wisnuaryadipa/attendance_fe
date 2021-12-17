import react, {useRef} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Panel, PanelHeader, PanelBody, PanelFooter} from '@components/panel';
import FormInput from './formInput';

const Payroll = () => {

    const refInputData = useRef({} as any);

    const updateInputData = (val:any) => {
        refInputData.current = val;
    }

    const doSubmitData = () => {
        console.log(refInputData);
    }


    return (
        <Panel>
            <PanelHeader>
                <Box>
                    <Typography variant='h5'>Form Print Payroll</Typography>
                    
                </Box>
            </PanelHeader>
            <PanelBody>
                <FormInput inputData={updateInputData} ></FormInput>
            </PanelBody>
            <PanelFooter>
                <Button onClick={doSubmitData} >Submit</Button>
            </PanelFooter>
        </Panel>
    )
}

export default Payroll;