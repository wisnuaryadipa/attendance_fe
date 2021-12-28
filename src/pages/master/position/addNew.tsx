import react, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios, {AxiosRequestConfig} from 'axios';
import Typography from '@mui/material/Typography';
import IPosition, { IBasePosition } from '@src/interfaces/response/IPosition';
import {getAxios, postAxios} from '@services/axios';
import {Panel, PanelBody, PanelHeader, PanelFooter} from '@components/panel';
import IDivision from '@src/interfaces/response/IDivision';
import IResponse from '@src/interfaces/response/IResponse';
import Select from '@src/components/Select/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

const PositionAdd = (props: any) => {

    const [data, setData] = useState({} as Partial<IPosition>);
    const [divisions, setDivisions] = useState([] as IDivision[]);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {
        const runAsync = async () => {
            await fetchDivisions();
            setLoading(false);
        }
        runAsync();
    },[])
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: String) => {
        setData({...data, [name as keyof typeof data]: event.target.value})
    };

    const handleChangeSelect = async (e: SelectChangeEvent<unknown>, name: string) => {
        await setData({...data, [name as keyof typeof data]: e.target.value})
    }

    const saveData = async (option: AxiosRequestConfig) => {
        const response = await postAxios(option)
        return response;
    }
    
    const fetchDivisions = async () => {
        const axiosOption: AxiosRequestConfig = {
            url: `${process.env.REACT_APP_URL_API}/api/master/division/get-all`,
        }
        const response = await getAxios<IResponse<IDivision[]>>(axiosOption);
        setDivisions(response.data.data)
        return response;
    }

    const addPosition = async (data: URLSearchParams) => {
        const axiosOption: AxiosRequestConfig = {
            url: `${process.env.REACT_APP_URL_API}/api/master/position/add`,
            data: data,
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
        const result = await saveData(axiosOption);
        return result;
    }
    
    const doSubmitForm = async ()  => {
        setLoading(true);
        const dataSend = new URLSearchParams();
        for (const propKey of Object.keys(data)) {
            const key = propKey as keyof IBasePosition;
            const ketString = key.toString();
            if(data[key] !== null && ketString !== 'employees' && ketString !== 'division' && data[key] !== ""){
                dataSend.append(propKey, data[key]!.toString());
            }
        }
        const result = await addPosition(dataSend);
        if (result.status === 201) {
            setData({});
            enqueueSnackbar(`Success saved ${result.data.data.name}`, { variant: 'success' });
        } else {
            enqueueSnackbar(`Failed saved`, { variant: 'error' });
        }
        setData({})
        setLoading(false);
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
                <Typography 
                className="titleForm" 
                variant='h5'>
                    Create New Position
                </Typography>
                <div className="actionForm"></div>
            </PanelHeader>
            <PanelBody>
                <Grid container spacing={2}>  
                    <Grid item xs={12} lg={6} sm={12}>
                            <TextField
                            fullWidth
                            required
                            id="name"
                            key="name"
                            label="Position Name"
                            onChange={(e)=>{handleChange(e, "name")} }
                            className="text-input"
                            defaultValue={data.name}
                            value={data.name}
                            />
                    </Grid>
                    <Grid item xs={12} lg={6} sm={12}>
                        <Select
                            required
                            id="divisionId"
                            key="divisionId"
                            label="Division"
                            onChange={(e)=>{handleChangeSelect(e, "divisionId")} }
                            className="text-input"
                            defaultValue={data.divisionId}
                            value={data.divisionId}
                            dataList={divisions}
                            /> 

                    </Grid>
                    <Grid item xs={12} lg={3} sm={6}>
                            <TextField
                            fullWidth
                            required
                            id="basicSalary"
                            key="basicSalary"
                            label="Basic Salary"
                            onChange={(e)=>{handleChange(e, "basicSalary")} }
                            className="text-input"
                            defaultValue={data.basicSalary}
                            value={data.basicSalary}
                            />
                    </Grid>
                    <Grid item xs={12} lg={3} sm={6}>
                            <TextField
                            fullWidth
                            required
                            id="wagePerHour"
                            key="wagePerHour"
                            label="Wage Per Hour"
                            onChange={(e)=>{handleChange(e, "wagePerHour")} }
                            className="text-input"
                            defaultValue={data.wagePerHour}
                            value={data.wagePerHour}
                            />
                    </Grid>
                    <Grid item xs={12} lg={3} sm={6}>
                            <TextField
                            fullWidth
                            required
                            id="overtimeWagePerHour"
                            key="overtimeWagePerHour"
                            label="Overtime Wage Per Hour"
                            onChange={(e)=>{handleChange(e, "overtimeWagePerHour")} }
                            className="text-input"
                            defaultValue={data.overtimeWagePerHour}
                            value={data.overtimeWagePerHour}
                            />
                    </Grid>
                    <Grid item xs={12} lg={6} sm={12}>
                            <TextField
                            fullWidth
                            required
                            multiline
                            rows={3}
                            id="defaultWorkingHour"
                            key="defaultWorkingHour"
                            label="Default Working Hour"
                            onChange={(e)=>{handleChange(e, "defaultWorkingHour")} }
                            className="text-input"
                            defaultValue={data.defaultWorkingHour}
                            value={data.defaultWorkingHour}
                            />
                    </Grid>
                    <Grid item xs={12} lg={6} sm={12}>
                            <TextField
                            fullWidth
                            required
                            multiline
                            rows={3}
                            id="description"
                            key="description"
                            label="Description"
                            onChange={(e)=>{handleChange(e, "description")} }
                            className="text-input"
                            defaultValue={data.description}
                            value={data.description}
                            />
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

const Wrapper = () => {
    return (
        <SnackbarProvider maxSnack={3}>
            <PositionAdd />
        </SnackbarProvider>
    )
}

export default Wrapper;