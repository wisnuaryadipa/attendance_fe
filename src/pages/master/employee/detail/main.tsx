import react, {useCallback, useState, useEffect} from 'react';
import BasicInformation from './basicInformation';
import AttendanceCalendar from './AttendanceCalendar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router';
import { AxiosRequestConfig } from 'axios';
import { getAxios, postAxios } from '@src/services/axios';
import IResponse from '@src/interfaces/response/IResponse';
import styled from 'styled-components';
import moment from 'moment';

import PerformanceInformation from './performanceInformation';

interface yearMonth {
    month: string;
    year: string;
}
const ContainerBox = styled(Box)`
    padding: 25px 20px;
    display: flex;
    flex-direction: column;
`

const MainDetail = () => {
    let years = [] as number[];
    const month = moment().format("M");
    const year = moment().format("YYYY");
    const months = moment.months();
    const {employeeId} = useParams();
    const [attendData, setAttendData] = useState([] as any[]);
    const [monthYear, setMonthYear] = useState({month, year} as yearMonth);

    
    const fetchDataAttends = useCallback(async () => {
        const dataSend = new URLSearchParams();
        dataSend.append('month', monthYear.month);
        dataSend.append('year', monthYear.year);
        const axiosOption: AxiosRequestConfig = {
            url: `http://localhost:3001/api/master/attendance/filter/${employeeId}`,
            data: dataSend
        }

        const response = await postAxios(axiosOption);
        setAttendData(response.data.data as [])
        console.log(response)
        return response;
    },[employeeId, monthYear])


    const buildYearsArr = (startYear: number, endYear: number) => {
        const years = []
        for (startYear; startYear <= endYear; startYear++) {
            years.push(startYear);
        }
        return years;
    }

    const handleChangeSelect = async (e: SelectChangeEvent<unknown>, name: string) => {

        await setMonthYear({...monthYear, [name as keyof typeof monthYear]: e.target.value})
        // setLoading(true)
    }

    useEffect(() => {
        const asyncRun = async () => {
            await fetchDataAttends();
        }

        if(monthYear){
            asyncRun()
        }
    },[monthYear, fetchDataAttends]);

    useEffect(() => {
        if(attendData){

        }
    },[attendData])

    years = buildYearsArr(2015, parseInt(year));

    return (
        
        <Grid container rowSpacing={3} >
            <Grid item sm={12}>

                <BasicInformation>

                </BasicInformation>
            </Grid>
            <Grid item sm={12}>
                
                <Container component={Paper} elevation={1}>
                    <Box sx={{padding: "20px", paddingTop: "40px", paddingBottom: "40px", borderBottom: "1px solid #292929"}}>
                        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <Typography variant='h4'>{moment().month(parseInt(monthYear.month)-1).format("MMMM")} - {monthYear.year}</Typography>
                            <Box sx={{minWidth: "200px", display: "flex", flexDirection: "row"}}>
                                <FormControl fullWidth sx={{minWidth: "200px", marginRight: "10px"}} >
                                    <InputLabel id="demo-simple-select-label">Month</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={monthYear.month}
                                        defaultValue={moment().format("M")}
                                        label="Month"
                                        onChange={(e) => handleChangeSelect(e,'month')}
                                    >
                                        {months.map((item, key) => {
                                            return (<MenuItem key={key} value={key+1}>{item}</MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={monthYear.year}
                                        defaultValue={moment().format("YYYY")}
                                        label="Year"
                                        onChange={(e) => handleChangeSelect(e,'year')}
                                    >
                                        {years.map((item, key) => {
                                            return (<MenuItem key={key} value={item}>{item}</MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    </Box>

                    <ContainerBox>
                        <PerformanceInformation month={monthYear.month} year={monthYear.year} />
                        

                        <AttendanceCalendar month={monthYear.month} year={monthYear.year} attendanceData={attendData} />
                    </ContainerBox>
                </Container>
            </Grid>
        </Grid>
    )
}

export default MainDetail;