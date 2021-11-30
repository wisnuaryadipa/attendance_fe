import react, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import axios, { AxiosRequestConfig } from 'axios';
import Typography from '@mui/material/Typography';
import NotFoundPage from '@pages/404'
import IEmployee from '@interfaces/response/IEmployee'
import IResponse from '@interfaces/response/IResponse'
import { useParams, useNavigate } from 'react-router-dom';
import { putAxios, getAxios } from '@services/axios';
import {Panel, PanelBody, PanelFooter, PanelHeader} from '@components/panel';

const ResultComponent = () => {

    const [isEmployeeIdExist, setIsEmployeeIdExist] = useState(true);
    const [isRendered, setIsRendered] = useState(false);
    const [data, setData] = useState({} as Partial<IEmployee>);
    const {employeeId} = useParams();

    useEffect(() => {
        const checkExisting = async () => {
            await doRefreshData();
            if (!data){ setIsEmployeeIdExist(false) }
            setIsRendered(true);
        }
        checkExisting();
    },[])

    const doRefreshData = async () => {
        const response = await fetchEmployeeById(employeeId!);
        setData(response.data.data);
    }

  
    const fetchEmployeeById = async (id: string) => {
        const axiosOption: AxiosRequestConfig = {
          url: `http://localhost:3001/api/master/employee/${id}`,
        }
        const response = await getAxios<IResponse<IEmployee>>(axiosOption);
        return response;
    }

    const updateEmployeeById = async (id: string, data: URLSearchParams) => {
        const axiosOption: any = {
            url: `http://localhost:3001/api/master/employee/edit/${id}`,
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
        if(data.name && data.machineId) {
            var dataSend = new URLSearchParams();
            dataSend.append('name', data.name);
            dataSend.append('machineId', data.machineId);
    
            updateEmployeeById(employeeId!, dataSend);
            await doRefreshData();
        } else {
            alert("Please fill all required input form !");
        }
    }

    if (!isEmployeeIdExist){ return (<NotFoundPage/>)}

    const result = (
        <Panel>
            <PanelHeader>
                <Typography className="titleForm" variant='h5'>Edit Employee Form</Typography>
                <div className="actionForm"></div>
            </PanelHeader>
            <PanelBody>
                <Grid container>  
                    <Grid item lg={6} sm={12}>
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                            required
                            id="name"
                            key="employeeName"
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

export default ResultComponent