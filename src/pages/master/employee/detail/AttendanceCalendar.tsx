import react, { HtmlHTMLAttributes, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import IEmployee from 'src/interfaces/response/IEmployee';
import WorkIcon from '@mui/icons-material/Work';
import ContactsIcon from '@mui/icons-material/Contacts';
import EmailIcon from '@mui/icons-material/Email';
import UnknownPerson from '@src/static/img/UnknownPerson.png';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import styled from 'styled-components';
import { border } from '@mui/system';
import { useParams } from 'react-router';
import { postAxios } from '@src/services/axios';
import { AxiosRequestConfig } from 'axios';
import IResponse from '@src/interfaces/response/IResponse';

interface Props extends HTMLDivElement {
    data?: IEmployee
}

interface yearMonth {
    month: string;
    year: string;
}

const ContainerBox = styled(Box)`
    padding: 25px 20px;
    display: flex;
    flex-direction: column;
`


const BasicInformation = (props: HtmlHTMLAttributes<Props>) => {
    let years = [] as number[];
    const month = moment().format("M");
    const year = moment().format("YYYY");
    const months = moment.months();
    const localizer = momentLocalizer(moment) // or globalizeLocalizer

    
    const [monthYear, setMonthYear] = useState({month, year} as yearMonth);
    const [attendData, setAttendData] = useState([]);
    const {employeeId} = useParams();


    const fetchDataAttends = async () => {
        const dataSend: any = new URLSearchParams();
        dataSend.month = monthYear.month;
        dataSend.year = monthYear.year;
        const axiosOption: AxiosRequestConfig = {
            url: `http://localhost:3001/api/attendance/filter/${employeeId}`,
            data: dataSend
        }
        const response = await postAxios(axiosOption);
        setAttendData(response.data.data)
        return response;
    }


    useEffect( () => {
        const month = moment().format("M");
        const year = moment().format("YYYY");
        setMonthYear({...monthYear, month: month, year: year});

        const runAsync = async () => {
            const callback = await fetchDataAttends();
            console.log(callback)
        }
        runAsync();
        
    },[])

    const handleChangeSelect = async (e: SelectChangeEvent<unknown>, name: string) => {
        console.log(monthYear.month)
        await setMonthYear({...monthYear, [name as keyof typeof monthYear]: e.target.value})
    }

    const buildYearsArr = (startYear: number, endYear: number) => {
        const years = []
        for (startYear; startYear <= endYear; startYear++) {
            years.push(startYear);
        }
        return years;
    }

    const state = {
        events: [
          {
            start: moment().toDate(),
            end: moment()
              .add(1, "days")
              .toDate(),
            title: "Some title"
          }
        ]
      };

    years = buildYearsArr(2015, parseInt(year));
    return (
        <Container component={Paper} elevation={1}>
            <ContainerBox>

                <Box sx={{paddingBottom: "40px", borderBottom: "1px solid #292929"}}>
                    <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <Typography variant='h4'>{moment().month(parseInt(monthYear.month)-1).format("MMMM")} - {monthYear.year}</Typography>
                        <Box sx={{minWidth: "200px", display: "flex", flexDirection: "row"}}>
                            <FormControl fullWidth sx={{minWidth: "150px", marginRight: "10px"}} >
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

                <Box sx={{paddingTop: "30px"}}>
                    <Grid container spacing={3} columnSpacing={3}>
                        <Grid item lg={3} sm={4}>
                            <Box sx={{borderLeft: "4px solid #434343", paddingLeft: "10px"}}>
                                <Typography variant='body1' sx={{fontSize: "10pt"}}>
                                    Total Working Hour
                                </Typography>
                                <Typography variant='h5' sx={{fontWeight: "700"}}>
                                    350 Hours
                                </Typography>
                            </Box>

                        </Grid>
                        <Grid item lg={3} sm={4}>
                            <Box sx={{borderLeft: "4px solid #434343", paddingLeft: "10px"}}>
                                <Typography variant='body1' sx={{fontSize: "10pt"}}>
                                    Total Overtime Hour
                                </Typography>
                                <Typography variant='h5' sx={{fontWeight: "700"}}>
                                    30 Hours
                                </Typography>
                            </Box>

                        </Grid>
                        <Grid item lg={3} sm={4}>
                            <Box sx={{borderLeft: "4px solid #434343", paddingLeft: "10px"}}>
                                <Typography variant='body1' sx={{fontSize: "10pt"}}>
                                    Attend in a Month
                                </Typography>
                                <Typography variant='h5' sx={{fontWeight: "700"}}>
                                    20 / {moment().month(parseInt(monthYear.month)-1).year(parseInt(monthYear.year)).daysInMonth()} Days
                                </Typography>
                            </Box>

                        </Grid>
                        <Grid item lg={3} sm={4}>
                            <Box sx={{borderLeft: "4px solid #434343", paddingLeft: "10px"}}>
                                <Typography variant='body1' sx={{fontSize: "10pt"}}>
                                    On Time in a Month
                                </Typography>
                                <Typography variant='h5' sx={{fontWeight: "700"}}>
                                    12 / {moment().month(parseInt(monthYear.month)-1).year(parseInt(monthYear.year)).daysInMonth()} Days
                                </Typography>
                            </Box>

                        </Grid>
                        <Grid item lg={3} sm={4}>
                            <Box sx={{borderLeft: "4px solid #434343", paddingLeft: "10px"}}>
                                <Typography variant='body1' sx={{fontSize: "10pt"}}>
                                    Overtime Days in a Month
                                </Typography>
                                <Typography variant='h5' sx={{fontWeight: "700"}}>
                                    5 / {moment().month(parseInt(monthYear.month)-1).year(parseInt(monthYear.year)).daysInMonth()} Days
                                </Typography>
                            </Box>

                        </Grid>
                    </Grid>
                </Box>
                
                <Calendar
                    localizer={localizer}
                    events={state.events}
                    startAccessor="start"
                    endAccessor="end"
                    date={moment().month(parseInt(monthYear.month)-1).year(parseInt(monthYear.year)).toDate()}
                    style={{height: 500, width: "100%", marginTop: "50px" }}
                    views={{month: true}}
                    toolbar={false}
                    />

            </ContainerBox>
        </Container>
    )

}

export default BasicInformation;