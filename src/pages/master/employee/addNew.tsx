import react, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import axios, {AxiosRequestConfig} from 'axios';
import Typography from '@mui/material/Typography';
import IEmployee, { IBaseEmployee } from 'src/interfaces/response/IEmployee';
import {getAxios, postAxios} from '@services/axios';
import {Panel, PanelBody, PanelHeader, PanelFooter} from '@components/panel';
import Select from '@components/Select/Select';
import IPosition from '@src/interfaces/response/IPosition';
import IResponse from '@src/interfaces/response/IResponse';
import genderData from '@src/static/gender';
import { activeStatus } from '@src/static/common';
import { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';


const ResultComponent = (props: any) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({} as Partial<IEmployee>);
    const [positions, setPositions] = useState([] as Partial<IPosition[]>);

    useEffect(() => {
        const checkExisting = async () => {
            await fetchPosition();
            setLoading(false);
        }
        checkExisting();
    },[])

    const fetchPosition = async () => {
        const axiosOption: AxiosRequestConfig = {
            url: `http://localhost:3001/api/master/position/get-all`,
        }
        const response = await getAxios<IResponse<IPosition[]>>(axiosOption);
        setPositions(response.data.data)
        return response;
    }
    
    const addEmployee = async (data: URLSearchParams) => {
        const url = "http://localhost:3001/api/master/employee/add";
        const axiosOption: AxiosRequestConfig = {
            url: url,
            data: data,
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
        await saveData(axiosOption);
    }
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: String) => {
        setData({...data, [name as keyof typeof data]: event.target.value})
    };

    const handleChangeSelect = async (e: SelectChangeEvent<unknown>, name: string) => {
        await setData({...data, [name as keyof typeof data]: e.target.value})
        console.log(data)
    }

    const saveData = async (option: AxiosRequestConfig) => {
        const response = await postAxios(option)
        console.log(response);
    }
    
    const doSubmitForm = async ()  => {
        setLoading(true)
        const dataSend = new URLSearchParams();
        for (const propKey of Object.keys(data)) {
            const key = propKey as keyof IBaseEmployee;
            const keyString = key.toString();
            if(data[key] !== null && keyString !== 'position' && data[key] !== ""){
                dataSend.append(propKey, data[key]!.toString());
            }
        }
        await addEmployee(dataSend);
        setLoading(false)
    }

    return (
        <Panel>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <PanelHeader>
                <Typography className="titleForm" variant='h5'>Create Employee Form</Typography>
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
                            onChange={(e)=>{setData({...data, activeFlatSalary: !data.activeFlatSalary})}} />
                            <TextField
                                fullWidth
                                required
                                disabled={!data.activeFlatSalary}
                                id="flatSalary"
                                key="flatSalary"
                                label="Flat Salary"
                                onChange={(e)=>{handleChange(e, "flatSalary")} }
                                className="text-input"
                                defaultValue={data.flatSalary}
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

}

export default ResultComponent

function saveData(axiosOption: AxiosRequestConfig<any>) {
    throw new Error('Function not implemented.');
}
