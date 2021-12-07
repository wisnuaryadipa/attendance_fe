import react, { ChangeEvent, useEffect, useState } from 'react';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import axios, { AxiosRequestConfig } from 'axios';
import Typography from '@mui/material/Typography';
import NotFoundPage from '@pages/404';
import { useParams, useNavigate } from 'react-router-dom';
import { putAxios, getAxios } from '@services/axios';
import IDivision from '@interfaces/response/IDivision';
import IResponse from '@interfaces/response/IResponse';
import {Panel, PanelBody, PanelHeader, PanelFooter} from '@components/panel';

const ResultComponent = (props: any): JSX.Element => {

    const [isDivisionIdExist, setIsDivisionIdExist] = useState(true);
    const [isRendered, setIsRendered] = useState(false);
    const [data, setData] = useState({} as Partial<IDivision>);
    const {divisionId} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const checkExisting = async () => {
            const response = await fetchDivisionById(divisionId!);
            setData(response);
            if (!response.data.data){ 
                setIsDivisionIdExist(false) 
            } else {
                setData(response.data.data)
            }
            setIsRendered(true);
        }
        checkExisting();
    },[])

    const fetchDivisionById = async (id: string) => {
        const axiosOption: AxiosRequestConfig = {
          url: `http://localhost:3001/api/master/division/${id}`,
        }
        const response = await getAxios<IResponse<IDivision>>(axiosOption);
        return response;
    }
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: String) => {
        setData({...data, [name as keyof typeof data]: event.target.value})
        console.log(data[name as keyof typeof data])
    };

    const saveEditData = async (option: AxiosRequestConfig) => {
        const response = await putAxios(option)
        console.log(response);
        alert("Input Data Success !");
    }
    
    const doSubmitForm = async (e:any) => {
        if(data.name) {
            var url = `http://localhost:3001/api/master/division/edit/${divisionId}`;
            var bodyFormData = new URLSearchParams();
            bodyFormData.append('name', data.name);
    
            const option: any = {
                url: url,
                method: "PUT",
                data: bodyFormData,
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }
            await saveEditData(option);
        } else {
            alert("Please fill all required input form !");
        }
    }

    const result = (
        <Panel>
            <PanelHeader> 
                <Typography className="titleForm" variant='h5'>Edit Division Form</Typography>
                <div className="actionForm"></div>
            </PanelHeader>
            <PanelBody>
                <Grid container>  
                    <Grid item lg={6} sm={12}>
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                            required
                            id="name"
                            key="divisionName"
                            label="Division Name"
                            onChange={(e) => {handleChange(e, 'name')} }
                            className="text-input"
                            defaultValue={data.name}
                            />
                            
                        </FormControl>
                    </Grid>
                </Grid>
            </PanelBody>
            <PanelFooter>
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
            </PanelFooter>
        </Panel>
    )

    if (!isDivisionIdExist){ return (<NotFoundPage/>)}
    return isRendered ? result : <div></div>
}

export default ResultComponent