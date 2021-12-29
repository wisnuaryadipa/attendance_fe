import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import react, {useEffect, useState, useRef} from 'react';
import TotalEmployee from './CardTotalEmployee'
import TotalOvertime from './CardTotalOvertime';
import MonthlyAttendancePerDivision from './MonthlyAttendancePerDivision';
import { getAxios } from '@src/services/axios';
import IResponse from '@src/interfaces/response/IResponse';
import { AxiosRequestConfig } from 'axios';

const Main = () => {
    const refTotalEmployee = useRef(0);
    const [totalEmployee, setTotalEmployee] = useState(0);


    useEffect( () => {
        const callAsync = async () => {
            await fetchDataTotalEmployee();
        }
        callAsync();

    },[])

    const fetchDataTotalEmployee = async () => {

        const axiosOption: AxiosRequestConfig = {
            url: `${process.env.REACT_APP_URL_API}/api/master/employees/count`,
            method: "GET"
        }
        const countData = await getAxios<IResponse<number>>(axiosOption);
        refTotalEmployee.current = countData.data.data;
        setTotalEmployee(countData.data.data)

    }


    return (
        <Grid container spacing={3}>
            <Grid item lg={4} sm={6} >
                <TotalEmployee totalNumber={totalEmployee}/>
            </Grid>
            <Grid item lg={4} sm={6} >
                <TotalOvertime/>
            </Grid>
            <Grid item lg={12} sm={12} >
                <MonthlyAttendancePerDivision/>
            </Grid>
        </Grid>
        
    )
}

export default Main;