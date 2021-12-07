import react, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import axios, { AxiosRequestConfig } from 'axios';
import Typography from '@mui/material/Typography';
import NotFoundPage from '@pages/404'
import IPosition from '@interfaces/response/IPosition'
import IResponse from '@interfaces/response/IResponse'
import { useParams, useNavigate } from 'react-router-dom';
import { putAxios, getAxios } from '@services/axios';
import {Panel, PanelBody, PanelFooter, PanelHeader} from '@components/panel';

const PositionEdit = () => {



    const [isPositionIdExist, setIsPositionIdExist] = useState(true);
    const [isRendered, setIsRendered] = useState(false);
    const [data, setData] = useState({} as Partial<IPosition>);
    const {positionId} = useParams();

    useEffect(() => {
        const checkExisting = async () => {
            await doRefreshData();
            if (!data){ setIsPositionIdExist(false) }
            setIsRendered(true);
        }
        checkExisting();
    },[])

    const doRefreshData = async () => {
        const response = await fetchPositionById(positionId!);
        setData(response.data.data);
    }

  
    const fetchPositionById = async (id: string) => {
        const axiosOption: AxiosRequestConfig = {
          url: `http://localhost:3001/api/master/position/${id}`,
        }
        const response = await getAxios<IResponse<IPosition>>(axiosOption);
        return response;
    }

    const updatePositionById = async (id: string, data: URLSearchParams) => {
        const axiosOption: any = {
            url: `http://localhost:3001/api/master/position/edit/${id}`,
            method: "PUT",
            data: data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
        await saveEditData(axiosOption);
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
            var dataSend = new URLSearchParams();
            dataSend.append('name', data.name);
    
            updatePositionById(positionId!, dataSend);
            await doRefreshData();
        } else {
            alert("Please fill all required input form !");
        }
    }

    if (!isPositionIdExist){ return (<NotFoundPage/>)}

    const result = (
        <Panel>
            <PanelHeader>
                <Typography className="titleForm" variant='h5'>Edit Position Form</Typography>
                <div className="actionForm"></div>
            </PanelHeader>
            <PanelBody>
                <Grid container>  
                    <Grid item lg={6} sm={12}>
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                            required
                            id="name"
                            key="name"
                            label="Position Name"
                            onChange={(e)=>{handleChange(e, "name")} }
                            className="text-input"
                            defaultValue={data.name}
                            />
                        </FormControl>
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                            required
                            id="basicSalary"
                            key="basicSalary"
                            label="Basic Salary"
                            onChange={(e)=>{handleChange(e, "basicSalary")} }
                            className="text-input"
                            defaultValue={data.basicSalary}
                            />
                        </FormControl>
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                            required
                            id="wagePerHour"
                            key="wagePerHour"
                            label="Wage Per Hour"
                            onChange={(e)=>{handleChange(e, "wagePerHour")} }
                            className="text-input"
                            defaultValue={data.wagePerHour}
                            />
                        </FormControl>
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                            required
                            id="overtimeWagePerHour"
                            key="overtimeWagePerHour"
                            label="Overtime Wage Per Hour"
                            onChange={(e)=>{handleChange(e, "overtimeWagePerHour")} }
                            className="text-input"
                            defaultValue={data.overtimeWagePerHour}
                            />
                        </FormControl>
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                            required
                            id="defaultWorkingHour"
                            key="defaultWorkingHour"
                            label="Default Working Hour"
                            onChange={(e)=>{handleChange(e, "defaultWorkingHour")} }
                            className="text-input"
                            defaultValue={data.defaultWorkingHour}
                            />
                        </FormControl>
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                            required
                            id="description"
                            key="description"
                            label="Description"
                            onChange={(e)=>{handleChange(e, "description")} }
                            className="text-input"
                            defaultValue={data.description}
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


    return isRendered ? result : <div></div>
}

export default PositionEdit