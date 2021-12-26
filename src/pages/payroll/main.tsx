import react, {useState, useRef, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {Panel, PanelHeader, PanelBody, PanelFooter} from '@components/panel';
import FormInput from './formInput';
import {getAxios, postAxios, putAxios} from '@services/axios'
import { IBasePayroll, IPayroll } from '@src/interfaces/response/IPayroll';
import {useParams} from 'react-router-dom';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import {useSearchParams, NavLink, Link} from 'react-router-dom';
import moment from 'moment';
import IResponse from '@src/interfaces/response/IResponse';
import IEmployee from '@src/interfaces/response/IEmployee';
import qs from 'qs';
import {monthIDN} from '@src/static/common';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

interface IMonthYear {
    month: number,
    year: number,
}

const Payroll = () => {

    const monthNow = moment().format('M');
    const yearNow = moment().format("YYYY");
    const initMonthYear = {
        month: parseInt(monthNow), 
        year: parseInt(yearNow)
    } as IMonthYear
    const [monthYear, setMonthYear] = useState(initMonthYear);
    const [employeeBeforeAfter, setEmployeeBeforeAfter] = useState({} as any);
    const refInputData = useRef({} as Partial<IPayroll>);
    const refQueryRoute = useRef({} as any); 
    const {employeeId} = useParams();
    const refLoading = useRef(false);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParam] = useSearchParams();

    const updateInputData = (val:any) => {
        refInputData.current = val;
    }

    const doCheckPayrollIsExist = async (employeeId: string, month: number, year: number) => {
        let result = false;
        const queryString = qs.stringify({month: month, year: year}, { indices: false });
        const axiosOption: AxiosRequestConfig = {
            url: `http://localhost:3001/api/payroll/${employeeId}?${queryString}`,
            method: "GET",
        }
        const resResult = await getAxios<IResponse<IEmployee>>(axiosOption)
        console.log(resResult)
        resResult.data.data.payrolls.length > 0 ? result = true : result = false;
        return result;
    }

    const doSubmitData = async () => {
        let result: AxiosResponse

        const isPayrollExist = await doCheckPayrollIsExist(employeeId!, monthYear.month, monthYear.year)
        isPayrollExist ? result = await putInputData() : result = await postInputData();
        
        if (result.status === 201) {
            alert(`Success saved`);
        } else {
            alert(`Failed saved`);
        }
    }

    const addPayrollData = async (data: URLSearchParams) => {
        const axiosOption: AxiosRequestConfig = {
            url: `http://localhost:3001/api/payroll/${employeeId}`,
            data: data,
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
        const result = await postAxios(axiosOption);
        return result;
    }

    const updatePayrollData = async (data: URLSearchParams) => {
        const axiosOption: AxiosRequestConfig = {
            url: `http://localhost:3001/api/payroll/${employeeId}/${monthYear.year}/${monthYear.month}`,
            data: data,
            method: "PUT",
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
        const result = await putAxios(axiosOption);
        return result;
    }

    const postInputData = async () => {
        refLoading.current = true;
        const dataSend = new URLSearchParams();
        for (const propKey of Object.keys(refInputData.current)) {
            const key = propKey as keyof IBasePayroll;
            const ketString = key.toString();
            if(refInputData.current[key] !== null && ketString !== 'employee' && ketString !== 'division'){
                dataSend.append(propKey, refInputData.current[key]!.toString());
            }
        }
        
        dataSend.append('month', monthYear.month.toString());
        dataSend.append('year', monthYear.year.toString());
        dataSend.append('employeeId', employeeId!.toString());

        const result = await addPayrollData(dataSend);
        refLoading.current = false;
        return result;
    }

    const putInputData = async () => {
        
        refLoading.current = true;
        const dataSend = new URLSearchParams();
        for (const propKey of Object.keys(refInputData.current)) {
            const key = propKey as keyof IBasePayroll;
            const ketString = key.toString();
            if(refInputData.current[key] !== null && ketString !== 'employee' && ketString !== 'division'){
                dataSend.append(propKey, refInputData.current[key]!.toString());
            }
        }

        const result = await updatePayrollData(dataSend);
        refLoading.current = false;
        return result;
    }

    const fetchBeforeAfterData = async (employeeId: number) => {
        const axiosOption: AxiosRequestConfig = {
            url: `http://localhost:3001/api/payroll/${employeeId}/employee-before-after`,
            method: "GET",
        }
        const result = await getAxios<IResponse<any>>(axiosOption)
        return result;
    }

    useEffect(() => {
        const runAsync = async () => {

            const _beforeAfter = await fetchBeforeAfterData(parseInt(employeeId!));
            setEmployeeBeforeAfter(_beforeAfter.data.data);
        } 

        searchParams.forEach((item, key) => {
            setMonthYear({...monthYear, [key]: item});
            refQueryRoute.current = {...refQueryRoute.current, [key]: item}
        })
        setMonthYear({month: refQueryRoute.current.month, year: refQueryRoute.current.year});
        runAsync();
    },[])

    useEffect( () => {
        const runAsync = async () => {
            const _beforeAfter = await fetchBeforeAfterData(parseInt(employeeId!));
            setEmployeeBeforeAfter(_beforeAfter.data.data);
            setLoading(false);
        } 
        setMonthYear({month: refQueryRoute.current.month, year: refQueryRoute.current.year});
        if(loading){
            runAsync()
        };
        console.log(`Route has been changed - ${employeeId}`)
    },[employeeId, loading])

    const queryString = qs.stringify({month: monthYear.month, year: monthYear.year}, { indices: false });
    return (
        <Panel>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <PanelHeader>
                <Box sx={{display: 'flex', flexDirection: "row"}}>
                    { (() => {
                            if (employeeBeforeAfter) {
                                if (employeeBeforeAfter.before && employeeBeforeAfter.before.length > 0) {
                                    return (
                                        <Link 
                                        to={`/payroll/${employeeBeforeAfter.before[0].machineId}/form?${queryString}`} 
                                        onClick={() => setLoading(true)} >
                                            <Button sx={{minWidth: "34px", width: "80px", marginRight: "10px"}} variant="outlined">
                                                <ArrowBackIosNewIcon></ArrowBackIosNewIcon>
                                            </Button>
                                        </Link>
                                    )
                                }
                                
                            }
                    })() }
                    
                    <Typography variant='h5'>Form Print Payroll</Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: "row"}}>
                    <Typography variant='h5'>{monthIDN[monthYear.month-1].toUpperCase()} / {monthYear.year}</Typography>
                    { (() => {
                            if (employeeBeforeAfter) {
                                console.log(employeeBeforeAfter)
                                if (employeeBeforeAfter.after && employeeBeforeAfter.after.length > 0) {

                                    return (
                                        <Link 
                                        to={`/payroll/${employeeBeforeAfter.after[0].machineId}/form?${queryString}`} 
                                        replace={true} 
                                        onClick={() => setLoading(true)} >
                                            <Button sx={{minWidth: "34px", width: "80px", marginLeft: "10px"}} variant="outlined">
                                                <ArrowForwardIosIcon></ArrowForwardIosIcon>
                                            </Button>
                                        </Link>
                                    )
                                }
                            }
                    })() }
                </Box>
            </PanelHeader>
            <PanelBody>
                
                <FormInput inputData={updateInputData} ></FormInput>
            </PanelBody>
            <PanelFooter>
                <div className="text-information">Please fill out the form above. </div>
                <div className="actionForm">
                    <Button 
                    variant="contained" 
                    style={{marginLeft: 15}}
                    color="success"
                    disabled={refLoading.current} 
                    onClick={doSubmitData} >
                        Submit
                    </Button>
                </div>
            </PanelFooter>
        </Panel>
    )
}

export default Payroll;