import react, {useCallback, useState, useEffect} from 'react';
import BasicInformation from './basicInformation';
import AttendanceCalendar from './AttendanceCalendar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
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
import { useLocation } from 'react-router';
import xlsx from 'xlsx';


import PerformanceInformation from './performanceInformation';
import ExportXlsxController, {IOptions} from '@src/controllers/attendance/ExportByEmployeXlsx'
import IEmployee from '@src/interfaces/response/IEmployee';
import FileSaver from 'file-saver';

interface monthYear {
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
    const location = useLocation();
    const [employeeDetail, setEmployeeDetail] = useState({} as IEmployee);
    const [attendData, setAttendData] = useState([] as any[]);
    const [monthYear, setMonthYear] = useState({month, year} as monthYear);
    const [totalWorkingHour, setTotalWorkingHour] = useState(0);
    const [totalOvertime, setTotalOvertime] = useState(0);
    const [attendInMonth, setAttendInMonth] = useState(0);
    const [onTimeInMonth, setOnTimeInMonth] = useState(0);
    const [overtimeInMonth, setOvertimeInMonth] = useState(0);

    
    const fetchDataAttends = useCallback(async () => {
        const dataSend = new URLSearchParams();
        dataSend.append('month', monthYear.month);
        dataSend.append('year', monthYear.year);
        const axiosOption: AxiosRequestConfig = {
            url: `${process.env.REACT_APP_URL_API}/api/master/attendance/filter/${employeeId}`,
            data: dataSend
        }

        const response = await postAxios(axiosOption);
        setAttendData(response.data.data as [])
        console.log(response)
        return response;
    },[employeeId, monthYear])

    const fetchDetailEmployee = useCallback(async () => {
        const axiosOption: AxiosRequestConfig = {
            url: `${process.env.REACT_APP_URL_API}/api/master/employee/${employeeId}`,
        }
        const response = await getAxios<IResponse<IEmployee>>(axiosOption);
        return response;
    },[employeeId])


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

    const onClickExportExcel = async () => {
        console.log(monthYear)
        console.log(process.env.REACT_APP_URL_API)
        let option: IOptions = {
            employeeId: employeeId!,
            dateStart: moment().month(parseInt(monthYear.month)-1).year(parseInt(monthYear.year)).startOf('month').format('DD-MM-YYYY'),
            dateEnd: moment().month(parseInt(monthYear.month)-1).year(parseInt(monthYear.year)).endOf('month').add(1, 'd').format('DD-MM-YYYY')
        }

        let _resData = await ExportXlsxController(option);

        const attendanceWS = xlsx.utils.json_to_sheet(_resData);
                var wb = xlsx.utils.book_new();
        
                xlsx.utils.book_append_sheet(wb, attendanceWS, 'kehadiran');
                const excelBuffer = xlsx.write(wb, {bookType:'xlsx', type:'array'});
                const finalData = new Blob([excelBuffer], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
                FileSaver.saveAs(finalData, `formated_${"employee"}_${moment().format("DD/MM/YYYY hh:mm:ss")}.xlsx`);

    }   

    const countTotalWorkingHour = useCallback(() => {
        let _totalWorkingHour = 0;
        attendData.forEach((item) => {
            _totalWorkingHour += (item.workDuration/60);
        })
        return _totalWorkingHour;
    },[attendData])

    const countAttendInMonth = useCallback(() => {
        let _totaAttendInMonth = 0;
        attendData.forEach((item) => {
            if(item.checkIn && item.checkOut){
                _totaAttendInMonth++;
            }
        })
        return _totaAttendInMonth;
    },[attendData])

    const countOnTimeInMonth = useCallback(() => {
        let _totOnTimeInMonth = 0;
        attendData.forEach((item) => {
            if(item.checkIn && item.checkOut){
            }
        })
        return _totOnTimeInMonth;
    },[attendData])

    const countOvertimeInMonth = useCallback(() => {
        let _totOnTimeInMonth = 0;
        attendData.forEach((item) => {
            if(item.checkIn && item.checkOut){
            }
        })
        return _totOnTimeInMonth;
    },[attendData])

    const checkEmployeeDetail = useCallback( async () => {
        if (!location.state) {
            const fetchRes = await fetchDetailEmployee();
            return fetchRes.data.data;
        }
        return location.state.data;
    },[fetchDetailEmployee, location])


    useEffect(() => {
        const asyncRun = async () => {
            await fetchDataAttends();
            setEmployeeDetail(await checkEmployeeDetail())
            
        }

        if(monthYear){
            asyncRun()
        }
    },[monthYear, fetchDataAttends, checkEmployeeDetail]);

    useEffect(() => {
        if(attendData){
            const _totWH = countTotalWorkingHour();
            const _attendInMonth = countAttendInMonth();
            const _onTimeInMonth = countOnTimeInMonth();
            const _overtimeInMonth = countOvertimeInMonth();

            setTotalWorkingHour(_totWH);
            setAttendInMonth(_attendInMonth);
            setOnTimeInMonth(_onTimeInMonth);
            setOvertimeInMonth(_overtimeInMonth);
        }
    },[attendData, countAttendInMonth, countOnTimeInMonth, countOvertimeInMonth, countTotalWorkingHour])

    years = buildYearsArr(2015, parseInt(year));


    return (
        
        <Grid container rowSpacing={3} >
            <Grid item sm={12}>

                <BasicInformation data={employeeDetail} >

                </BasicInformation>
            </Grid>
            <Grid item sm={12}>
                
                <Container component={Paper} elevation={1}>
                    <Box sx={{padding: "20px", paddingTop: "40px", paddingBottom: "40px", borderBottom: "1px solid #292929"}}>
                        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <Typography variant='h4'>{moment().month(parseInt(monthYear.month)-1).format("MMMM")} - {monthYear.year}</Typography>
                            <Box sx={{minWidth: "200px", display: "flex", flexDirection: "row"}}>

                                <FormControl fullWidth sx={{minWidth: "200px", marginRight: "10px"}} >
                                    <Button 
                                        onClick={onClickExportExcel}
                                        variant='contained' 
                                        color='info' sx={{minWidth: "40px !important", height:"100%"  }} >
                                        Export Excel
                                    </Button>
                                </FormControl>
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
                        <PerformanceInformation 
                        month={monthYear.month} 
                        year={monthYear.year} 
                        totalWorkingHour={totalWorkingHour} 
                        totalOvertimeHour={totalOvertime}
                        attendInMonth={attendInMonth}
                        onTimeInMonth={onTimeInMonth}
                        overtimeInMonth={overtimeInMonth}
                         />

                        <AttendanceCalendar 
                        month={monthYear.month} 
                        year={monthYear.year} 
                        attendanceData={attendData} />
                    </ContainerBox>
                </Container>
            </Grid>
        </Grid>
    )
}

export default MainDetail;