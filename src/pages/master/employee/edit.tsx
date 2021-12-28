import react, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
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
import Select from '@components/Select/Select';
import genderData from '@src/static/gender';
import {activeStatus} from '@src/static/common';
import { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import IPosition from 'src/interfaces/response/IPosition';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const ResultComponent = () => {

    const [isEmployeeIdExist, setIsEmployeeIdExist] = useState(true);
    const [isRendered, setIsRendered] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({} as Partial<IEmployee>);
    const [positions, setPositions] = useState([] as Partial<IPosition[]>);
    const {employeeId} = useParams();

    useEffect(() => {
        const checkExisting = async () => {
            await doRefreshData();
            await fetchPosition();
            if (!data){ setIsEmployeeIdExist(false) }
            setIsRendered(true);
        }
        checkExisting();
    },[])

    const fetchPosition = async () => {
        const axiosOption: AxiosRequestConfig = {
            url: `${process.env.REACT_APP_URL_API}/api/master/position/get-all`,
        }
        const response = await getAxios<IResponse<IPosition[]>>(axiosOption);
        setPositions(response.data.data)
        return response;
    }

    const doRefreshData = async () => {
        const response = await fetchEmployeeById(employeeId!);
        
        setData({...response.data.data});
    }

    const fetchEmployeeById = async (id: string) => {
        const axiosOption: AxiosRequestConfig = {
          url: `${process.env.REACT_APP_URL_API}/api/master/employee/${id}`,
        }
        const response = await getAxios<IResponse<IEmployee>>(axiosOption);
        return response;
    }

    const updateEmployeeById = async (id: string, data: URLSearchParams) => {
        const axiosOption: any = {
            url: `${process.env.REACT_APP_URL_API}/api/master/employee/edit/${id}`,
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

    const handleChangeSelect = async (e: SelectChangeEvent<unknown>, name: string) => {
        await setData({...data, [name as keyof typeof data]: e.target.value})
        console.log(data)
    }

    const saveEditData = async (option: AxiosRequestConfig) => {
        const response = await putAxios(option)
        console.log(response);
    }
    
    const doSubmitForm = async (e:any) => {
        setLoading(true);
        var dataSend = new URLSearchParams();
        for (const propKey of Object.keys(data)) {
            const key = propKey as keyof IBaseEmployee;
            const ketString = key.toString();
            if(data[key] !== null && ketString !== 'position'){
                dataSend.append(propKey, data[key]!.toString());
            }
        }

        await updateEmployeeById(employeeId!, dataSend);
        setLoading(false);
        
    }

    if (!isEmployeeIdExist){ return (<NotFoundPage/>)}

    const result = (
        <Panel>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <PanelHeader>
                <Typography className="titleForm" variant='h5'>Edit Employee Form</Typography>
                <div className="actionForm"></div>
            </PanelHeader>
            <PanelBody>
                <Grid container spacing={2}>  
                    <Grid item lg={6} sm={8}>
                        <TextField fullWidth
                            required
                            id="name"
                            key="employeeName"
                            label="Employee Name"
                            onChange={(e)=>{handleChange(e, "name")} }
                            className="text-input"
                            defaultValue={data.name}
                            value={data.name}
                            />
                   </Grid>
                   <Grid item lg={3} sm={4}>         

                        <TextField 
                            fullWidth
                            required
                            id="machine-id"
                            key="machineId"
                            label="Machine Id"
                            onChange={(e)=>{handleChange(e, "machineId")} }
                            className="text-input"
                            defaultValue={data.machineId}
                            value={data.machineId}
                            />
                    </Grid>
                    <Grid item lg={3} sm={4}>        

                        <Select
                            required
                            id="gender"
                            key="gender"
                            label="Gender"
                            onChange={(e)=>{handleChangeSelect(e, "gender")} }
                            className="text-input"
                            defaultValue={data.gender}
                            value={data.gender}
                            dataList={genderData}
                            /> 
                    </Grid>
                    <Grid item lg={3} sm={4}>   
                        
                        <TextField 
                            fullWidth
                            required
                            id="hireDate"
                            key="hireDate"
                            label="Hire Date"
                            onChange={(e)=>{handleChange(e, "hireDate")} }
                            className="text-input"
                            defaultValue={data.hireDate}
                            value={data.hireDate}
                            helperText="Format dd/mm/yyyy"
                            />
                    </Grid>
                    <Grid item lg={3} sm={4}>   
                        
                        <TextField 
                            fullWidth
                            required
                            id="dateOfBirth"
                            key="dateOfBirth"
                            label="Date of Birth"
                            onChange={(e)=>{handleChange(e, "dateOfBirth")} }
                            className="text-input"
                            defaultValue={data.dateOfBirth}
                            value={data.dateOfBirth}
                            helperText="Format dd/mm/yyyy"
                            />
                    </Grid>
                    <Grid item lg={6} sm={6}>        
                        <Select
                            required
                            id="position"
                            key="position"
                            label="Position"
                            onChange={(e)=>{handleChangeSelect(e, "positionId")} }
                            className="text-input"
                            defaultValue={data.positionId}
                            value={data.positionId}
                            dataList={positions}
                            /> 
                    </Grid>
                    {/* <Grid lg={6} sm={0}/> */}
                    <Grid item lg={6} sm={6}>   
                        <TextField 
                            fullWidth
                            required
                            id="contactNumber"
                            key="contactNumber"
                            label="Contact Number"
                            onChange={(e)=>{handleChange(e, "contactNumber")} }
                            className="text-input"
                            defaultValue={data.contactNumber}
                            value={data.contactNumber}
                            />
                    </Grid>
                    <Grid item lg={6} sm={6}>   
                        
                        <TextField 
                            fullWidth
                            required
                            id="email"
                            key="email"
                            label="Email"
                            onChange={(e)=>{handleChange(e, "email")} }
                            className="text-input"
                            defaultValue={data.email}
                            value={data.email}
                            />
                    </Grid>
                    <Grid item lg={6} sm={12}>   
                        
                        <TextField 
                            fullWidth
                            required
                            multiline
                            rows={4}
                            id="address"
                            key="address"
                            label="Address"
                            onChange={(e)=>{handleChange(e, "address")} }
                            className="text-input"
                            defaultValue={data.address}
                            value={data.address}
                            />
                    </Grid>
                    <Grid item lg={6} sm={12}>   
                        
                        <TextField 
                            fullWidth
                            required
                            multiline
                            rows={4}
                            id="description"
                            key="description"
                            label="Description"
                            onChange={(e)=>{handleChange(e, "description")} }
                            className="text-input"
                            defaultValue={data.description}
                            value={data.description}
                            />
                    </Grid>
                    <Grid item lg={6} sm={12}>   
                        <Select
                            required
                            id="employeeStatus"
                            key="employeeStatus"
                            label="Employee Status"
                            onChange={(e)=>{handleChangeSelect(e, "employeeStatus")} }
                            className="text-input"
                            defaultValue={data.employeeStatus}
                            value={data.employeeStatus}
                            dataList={activeStatus}
                            /> 
                    </Grid>
                    <Grid item lg={6} sm={12}>   
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Checkbox  
                            checked={data.activeFlatSalary}
                            sx={{height: '42px'}}  
                            onChange={(e)=>{setData({...data, activeFlatSalary: !data.activeFlatSalary});}} />
                            <TextField
                                fullWidth
                                required
                                disabled={!data.activeFlatSalary}
                                id="flatSalary"
                                key="flatSalary"
                                label="Flat Salary"
                                onChange={(e)=>{handleChange(e, "flatSalary")} }
                                className="text-input"
                                value={data.flatSalary}
                                /> 
                        </div>
                        
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