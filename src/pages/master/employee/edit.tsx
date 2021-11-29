import react, { useEffect, useState } from 'react';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import axios, { AxiosRequestConfig } from 'axios';
import Typography from '@mui/material/Typography';
import NotFoundPage from '@pages/404'
import IEmployee from '@interfaces/response/IEmployee'
import { useParams, useNavigate } from 'react-router-dom';
import { postAxios, getAxios } from '@services/axios';


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

    const [isEmployeeIdExist, setIsEmployeeIdExist] = useState(true);
    const [isRendered, setIsRendered] = useState(false);
    const [data, setData] = useState({} as Partial<IEmployee>);
    const {employeeId} = useParams();
    const navigate = useNavigate();
    const axiosOption: AxiosRequestConfig = {
      url: `http://localhost:3001/api/master/employee/${employeeId}`,
    }

    useEffect(() => {
        const checkExisting = async () => {
            const response = await getAxios(axiosOption);
            setData(response);
            if (!response.data.data){ 
                setIsEmployeeIdExist(false) 
            } else {
                setData(response.data.data)
            }
            setIsRendered(true);
        }
        checkExisting();
    },[])


    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: String) => {
        setData({...data, [name as keyof typeof data]: event.target.value})
        console.log(data[name as keyof typeof data])
    };
    
    const doSubmitForm = async (e:any) => {
        // var bodyFormData = new URLSearchParams();
        // bodyFormData.append('name', data.employeeName);
        // bodyFormData.append('machineId', data.machineId);

        // const option: any = {
        //     method: "POST",
        //     headers: { "Content-Type": "application/x-www-form-urlencoded" }
        // }

        // await axios.post('http://localhost:3001/api/master/employee/add', bodyFormData, option )
        // .then((response) => {
        //     console.log(response);
        //     alert("Input Data Success !");
        // })
        // .catch((err) => {
        //     console.log(err);
        //     alert("FAILED TO INPUT DATA !");
        // })
    }

    if (!isEmployeeIdExist){ return (<NotFoundPage/>)}

    const result = (
        <Container component={Paper} sx={{minWidth:'400px'}}>
            <HeadFormContainerStyled> 
                <Typography className="titleForm" variant='h5'>Edit Employee Form</Typography>
                <div className="actionForm"></div>
            </HeadFormContainerStyled>
            <BodyFormContainerStyled>
                <Grid container>  
                    <Grid item lg={6} sm={12}>
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                            required
                            id="name"
                            key="employeeName"
                            label="Employee Name"
                            onChange={(e)=>{handleChange(e, "employeeName")} }
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


    return isRendered ? result : <div></div>
}

export default ResultComponent