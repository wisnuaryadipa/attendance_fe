import react, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import axios, { AxiosRequestConfig } from 'axios';
import Typography from '@mui/material/Typography';
import NotFoundPage from '@pages/404'
import IEmployee, {IBaseEmployee} from '@interfaces/response/IEmployee'
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
    
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        await setData({...data, [name as keyof typeof data]: event.target.value})
        console.log(data)
    };

    const saveEditData = async (option: AxiosRequestConfig) => {
       
        const response = await putAxios(option)

        console.log(response);
        alert("Input Data Success !");
    }
    
    const doSubmitForm = async (e:any) => {
        console.log(data)
        var dataSend = new URLSearchParams();
        for (const propKey of Object.keys(data)) {
            const key = propKey as keyof IBaseEmployee;
            const ketString = key.toString();
            if(data[key] && ketString !== 'position'){
                dataSend.append(propKey, data[key]!.toString());
            }
        }
        // updateEmployeeById(employeeId!, dataSend);
        // await doRefreshData();
        
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
                            value={data.name}
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
                                value={data.machineId}
                                />
                        </FormControl>

                        <FormControl fullWidth variant='filled' required>
                            <TextField
                                required
                                id="gender"
                                key="gender"
                                label="Gender"
                                onChange={(e)=>{handleChange(e, "gender")} }
                                className="text-input"
                                defaultValue={data.gender}
                                value={data.gender}
                                />
                        </FormControl>
                        
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                                required
                                id="employeeStatus"
                                key="employeeStatus"
                                label="Employee Status"
                                onChange={(e)=>{handleChange(e, "employeeStatus")} }
                                className="text-input"
                                defaultValue={data.employeeStatus}
                                value={data.employeeStatus}
                                />
                        </FormControl>
                        
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                                required
                                id="hireDate"
                                key="hireDate"
                                label="Hire Date"
                                onChange={(e)=>{handleChange(e, "hireDate")} }
                                className="text-input"
                                defaultValue={data.hireDate}
                                value={data.hireDate}
                                />
                        </FormControl>
                        
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                                required
                                id="dateOfBirth"
                                key="dateOfBirth"
                                label="Date of Birth"
                                onChange={(e)=>{handleChange(e, "dateOfBirth")} }
                                className="text-input"
                                defaultValue={data.dateOfBirth}
                                value={data.dateOfBirth}
                                />
                        </FormControl>
                        
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                                required
                                id="address"
                                key="address"
                                label="Address"
                                onChange={(e)=>{handleChange(e, "address")} }
                                className="text-input"
                                defaultValue={data.address}
                                value={data.address}
                                />
                        </FormControl>
                        
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                                required
                                id="contactNumber"
                                key="contactNumber"
                                label="Contact Number"
                                onChange={(e)=>{handleChange(e, "contactNumber")} }
                                className="text-input"
                                defaultValue={data.contactNumber}
                                value={data.contactNumber}
                                />
                        </FormControl>
                        
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                                required
                                id="email"
                                key="email"
                                label="Email"
                                onChange={(e)=>{handleChange(e, "email")} }
                                className="text-input"
                                defaultValue={data.email}
                                value={data.email}
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
                                value={data.description}
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