import react, { useState } from 'react';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import axios, {AxiosRequestConfig} from 'axios';
import Typography from '@mui/material/Typography';
import IEmployee from 'src/interfaces/response/IEmployee';
import {postAxios} from '@services/axios';


const HeadFormContainerStyled = styled.div`
    display: flex;
    padding: 15px;
    border-bottom: 1px solid #cecece;
`;



const BodyFormContainerStyled = styled.div`
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

const FooterFormContainerStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-top: 1px solid #cecece;

    .text-information {
        color: #9e9e9e;
    }
`

const ResultComponent = (props: any) => {

    const [data, setData] = useState({} as Partial<IEmployee>);
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: String) => {
        setData({...data, [name as keyof typeof data]: event.target.value})
    };

    const saveData = async (option: AxiosRequestConfig) => {
        const response = await postAxios(option)
        console.log(response);
        alert("Input Data Success !");
    }
    
    const doSubmitForm = async (e:any)  => {
        if(data.name && data.machineId) {
            const url = "http://localhost:3001/api/master/employee/add";
            const bodyFormData = new URLSearchParams();
            bodyFormData.append('name', data.name);
            bodyFormData.append('machineId', data.machineId);
            const axiosOption: AxiosRequestConfig = {
                url: url,
                data: bodyFormData,
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }
            console.log(data)
            await saveData(axiosOption);
        } else {
            alert("Please fill all required input form !");
        }
    }

    return (
        <Container component={Paper} sx={{minWidth:'400px'}}>
            <HeadFormContainerStyled>
                <Typography 
                className="titleForm" 
                variant='h5'>
                    Create New Employee
                </Typography>
                <div className="actionForm"></div>
            </HeadFormContainerStyled>
            <BodyFormContainerStyled>
                    <Grid container>  
                        <Grid item lg={6} sm={12}>
                            <FormControl fullWidth variant='filled' required>
                                <TextField
                                required
                                id="name"
                                key="name"
                                label="Employee Name"
                                onChange={(e)=>{handleChange(e, "name")} }
                                className="text-input"
                                defaultValue={data.name}
                                />
                            </FormControl>

                            <FormControl fullWidth variant='filled' required>
                                <TextField
                                required
                                id="machine-id"
                                key="machineId"
                                label="Machine Id"
                                onChange={(e)=>{handleChange(e, "machineId")} }
                                className="text-input"
                                defaultValue={data.machineId}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                
            </BodyFormContainerStyled>
            <FooterFormContainerStyled>
                <div className="text-information">Please fill out the form above. </div>
                <div className="actionForm">
                    <Button 
                    onClick={doSubmitForm}
                    variant="contained" 
                    style={{marginLeft: 15}}
                    color="success">
                    SUBMIT
                    </Button>
                </div>
            </FooterFormContainerStyled>
        </Container>
    )

}

export default ResultComponent