import react, { useState } from 'react';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {NavLink} from 'react-router-dom';
import Button from '@mui/material/Button';
import { TextFieldsOutlined } from '@material-ui/icons';




const HeadFormContainer = (props:any) => {
    return (
        <div className={`headFormContainer ${props.className}`} {...props}>
            <div className="titleForm">Create New Employee</div>
            <div className="actionForm"></div>
        </div>
    )
}

const HeadFormContainerStyled = styled(HeadFormContainer)`
    display: flex;
    padding: 15px;
    border-bottom: 1px solid #cecece;
`;


const BodyFormContainer = (props: any) => {
    return (
        <div className={`bodyFormContainer`} {...props}>
            
        </div>
        
    )
}


const BodyFormContainerStyled = styled(BodyFormContainer)`
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

const FooterFormContainer = (props:any) => {
    return(
        <div className={`footerFormContainer ${props.className}`} {...props}>
        </div>
    )
}

const FooterFormContainerStyled = styled(FooterFormContainer)`
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-top: 1px solid #cecece;

    .text-information {
        color: #9e9e9e;
    }
`

const ResultComponent = (props: any) => {

    const [data, setData] = useState({employeeName: "", machineId: ""});

    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: String) => {
        setData({...data, [name as keyof typeof data]: event.target.value})
        console.log(data[name as keyof typeof data])
    };

    const doSubmitForm = (e:any) => {
        // alert(data.employeeName + "|||" + data.machineId);
    }

    return (
        <Container component={Paper} sx={{minWidth:'400px'}}>
            <HeadFormContainerStyled/>
            <BodyFormContainerStyled>
                <div>
                    <TextField
                    key="employeeName"
                    className="text-input"
                    id="employee-name"
                    required
                    label="Employee Name"
                    onChange={(e)=>{handleChange(e, "employeeName")} }
                    defaultValue={data.employeeName}
                    />
                </div>
                <div>
                    <TextField
                    key="machineId"
                    className="text-input"
                    id="machine-id"
                    required
                    label="Machine Id"
                    onChange={(e)=>{handleChange(e, "machineId")} }
                    defaultValue={data.machineId}
                    />
                </div>
            </BodyFormContainerStyled>
            <FooterFormContainerStyled>
                
                <div className="text-information">Please fill out the form above. </div>
                <div className="actionForm">
                    <Button 
                    onClick={doSubmitForm}
                    variant="contained" 
                    style={{marginLeft: 15}}
                    color="success">
                    Add Employee
                    </Button>
                </div>
            </FooterFormContainerStyled>
        </Container>
    )

}

export default ResultComponent