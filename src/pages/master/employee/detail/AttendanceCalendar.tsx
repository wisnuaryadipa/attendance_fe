import react, { HtmlHTMLAttributes, useCallback, useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
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
import { Calendar, momentLocalizer, EventPropGetter, stringOrDate } from 'react-big-calendar'
import moment from 'moment'
import styled from 'styled-components';
import { border } from '@mui/system';
import { useParams } from 'react-router';
import { postAxios } from '@src/services/axios';
import { AxiosRequestConfig } from 'axios';
import IResponse from '@src/interfaces/response/IResponse';
import { IAttendance } from '@src/interfaces/response/IAttendance';

interface Props extends HtmlHTMLAttributes<HTMLDivElement>, yearMonth {
    data?: IEmployee;
    attendanceData?: any[];
}

interface yearMonth {
    month: string;
    year: string;
}

const LimitedBackdrop = styled(Backdrop)`
    root: {
    position: "absolute",
    zIndex: 1
  }
`


const BasicInformation = (props: Props) => {
    const month = moment().format("M");
    const year = moment().format("YYYY");
    const localizer = momentLocalizer(moment) // or globalizeLocalizer

    const [propsData, setPropsData] = useState(props.attendanceData);
    const [dateCalendar, setDateCalendar] = useState([] as any)
    const [monthYear, setMonthYear] = useState({month: props.month, year: props.year} as yearMonth);

    const genCalendarEvent = useCallback(() => {
        const _arrCalendar:any = [];
        props.attendanceData!.map( (item:any) => {
            let objEvent: any = {}
            if(item.checkIn || item.checkOut) {
                if(item.checkIn){
                    objEvent = {}
                    objEvent.start = moment(item.checkIn).toDate();
                    objEvent.end = moment(item.checkIn).add(1, 'minutes').toDate();
                    objEvent.hexColor = "40e0d0";
                    objEvent.title = "Check In";
                    _arrCalendar.push(objEvent)
                }
                if(item.checkOut) {
                    objEvent = {}
                    objEvent.start = moment(item.checkOut).toDate();
                    objEvent.end = moment(item.checkOut).add(1, 'minutes').toDate();
                    objEvent.hexColor = "f76161";
                    objEvent.title = "Check Out"
                    _arrCalendar.push(objEvent)
                }
            }
            return item
        })
        setDateCalendar(_arrCalendar)
    },[props.attendanceData])
    

    useEffect(() => {
        if(props.attendanceData !== propsData){
            setPropsData(props.attendanceData);
            setMonthYear({month: props.month, year: props.year})
            genCalendarEvent();
        }
        console.log('run')
    },[genCalendarEvent, props, propsData])


    const eventStyle: EventPropGetter<any> = (event: any, start: stringOrDate, end: stringOrDate, isSelected: boolean) => {
        var backgroundColor = '#' + event.hexColor;
        var style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        } as React.HTMLAttributes<HTMLDivElement>;
    }

    return (
        <>
            <Calendar
                localizer={localizer}
                events={dateCalendar}
                startAccessor="start"
                endAccessor="end"
                date={moment().month(parseInt(monthYear.month)-1).year(parseInt(monthYear.year)).toDate()}
                style={{height: 1000, width: "100%", marginTop: "50px" }}
                views={{month: true}}
                toolbar={false}
                eventPropGetter={eventStyle}
                />
        </>
                
    )

}

export default BasicInformation;