import react, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import axios, { AxiosRequestConfig } from 'axios';
import Typography from '@mui/material/Typography';
import NotFoundPage from '@pages/404'
import IPosition, { IBasePosition } from '@interfaces/response/IPosition'
import IResponse from '@interfaces/response/IResponse'
import { useParams, useNavigate } from 'react-router-dom';
import { putAxios, getAxios } from '@services/axios';
import {Panel, PanelBody, PanelFooter, PanelHeader} from '@components/panel';
import Select from '@src/components/Select/Select';
import IDivision from '@src/interfaces/response/IDivision';
import { SelectChangeEvent } from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSnackbar, SnackbarProvider } from 'notistack';

const PositionEdit = () => {
    const [isPositionIdExist, setIsPositionIdExist] = useState(true);
    const [isRendered, setIsRendered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [divisions, setDivisions] = useState([] as Partial<IDivision[]>);
    const [data, setData] = useState({} as Partial<IPosition>);
    const {positionId} = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const checkExisting = async () => {
            const fetchData = await doRefreshData();
            await fetchDivisions();
            if (!fetchData.data.data){ setIsPositionIdExist(false) }
            setIsRendered(true);
            setLoading(false);
        }
        checkExisting();
    },[])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: String) => {
        setData({...data, [name as keyof typeof data]: event.target.value})
    };

    const handleChangeSelect = async (e: SelectChangeEvent<unknown>, name: string) => {
        setData({...data, [name as keyof typeof data]: e.target.value})
    }
    
    const fetchDivisions = async () => {
        const axiosOption: AxiosRequestConfig = {
            url: `${process.env.REACT_APP_URL_API}/api/master/division/get-all`,
        }
        const response = await getAxios<IResponse<IDivision[]>>(axiosOption);
        setDivisions(response.data.data)
        return response;
    }

    const doRefreshData = async () => {
        const response = await fetchPositionById(positionId!);
        setData(response.data.data);
        return response;
    }
  
    const fetchPositionById = async (id: string) => {
        const axiosOption: AxiosRequestConfig = {
          url: `${process.env.REACT_APP_URL_API}/api/master/position/${id}`,
        }
        const response = await getAxios<IResponse<IPosition>>(axiosOption);
        return response;
    }

    const updatePositionById = async (id: string, data: URLSearchParams) => {
        const axiosOption: any = {
            url: `${process.env.REACT_APP_URL_API}/api/master/position/edit/${id}`,
            method: "PUT",
            data: data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
        return await saveEditData(axiosOption);
    }

    const saveEditData = async (option: AxiosRequestConfig) => {
        const response = await putAxios<IResponse<IPosition>>(option)
        return response;
    }
    
    const doSubmitForm = async () => {
        setLoading(true);
        const dataSend = new URLSearchParams();
        for (const propKey of Object.keys(data)) {
            const key = propKey as keyof IBasePosition;
            const ketString = key.toString();
            if(data[key] !== null && ketString !== 'employees' && ketString !== 'division'){
                dataSend.append(propKey, data[key]!.toString());
            }
        }
        const result = await updatePositionById(positionId!, dataSend);
        if (result.status === 201) {
            enqueueSnackbar(`Success saved ${result.data.data.name}`, { variant: 'success' });
        } else {
            enqueueSnackbar(`Failed saved`, { variant: 'error' });
        }
        setLoading(false);
    }

    if (!isPositionIdExist){ return (<NotFoundPage/>)}

    const result = (
        <Panel>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <PanelHeader>
                <Typography className="titleForm" variant='h5'>Edit Position Form</Typography>
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
                            onChange={(e)=>{ handleChange(e, "basicSalary") } }
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
                            onChange={(e)=>{ handleChange(e, "wagePerHour") }}
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


    return isRendered ? result : <div></div>
}

const Wrapper = () => {
    return (
        <SnackbarProvider maxSnack={3}>
            <PositionEdit />
        </SnackbarProvider>
    )
}

export default Wrapper;