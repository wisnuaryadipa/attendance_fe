import react, { HtmlHTMLAttributes, useCallback, useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import IEmployee from 'src/interfaces/response/IEmployee';
import { Calendar, momentLocalizer, EventPropGetter, stringOrDate } from 'react-big-calendar'
import moment from 'moment'
import styled from 'styled-components';
import Box from '@mui/material/Box';
import {addZero} from '@src/helper/common';
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
        const _arrCalendar: Event[] = [];
        props.attendanceData!.map( (item:any) => {
            let objEvent: any = {}
            if(item.checkIn || item.checkOut) {
                if(item.checkIn){
                    objEvent = {}
                    objEvent.start = moment(item.checkIn).toDate();
                    objEvent.end = moment(item.checkIn).add(1, 'minutes').toDate();
                    objEvent.hexColor = "40e0d0";
                    objEvent.title = "Check In"
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

    const customSlotPropGetter = (date: Date) => {
        let result: any = {}
        for (const key in props.attendanceData!) {
            const attendance = props.attendanceData![key];
            const _date = parseInt(moment(attendance.checkIn).format('D'))
            if(date.getDate() === _date ){
                result = {title: attendance.workDuration}
            }
        }
        return result;
      }
    const customDateHeader = (propsHeader: any) => {
        const propsDate = parseInt(moment(propsHeader.date).format("D"));
        let result = 0;
        for (const key in props.attendanceData!) {
            const attendance = props.attendanceData![key];
            const _date = parseInt(moment(attendance.checkIn).format('D'))
            if(propsDate === _date) {result = attendance.workDuration}
        }
        return (
            <Box sx={{display: 'flex', justifyContent: "space-between"}}>
                <div>{addZero(Math.round(result/60), 2)}:{addZero(result%60, 2)}</div>
                <div>{propsHeader.label}</div>
            </Box>
        )
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
                dayPropGetter={customSlotPropGetter}
                eventPropGetter={eventStyle}
                components={{month: {
                    dateHeader: customDateHeader
                }}}
                />
        </>
                
    )

}

export default BasicInformation;