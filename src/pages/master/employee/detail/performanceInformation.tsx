import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import moment from 'moment';


interface Props {
    month: string;
    year: string;
    totalWorkingHour: number;
    totalOvertimeHour: number;
    attendInMonth: number;
    onTimeInMonth: number;
    overtimeInMonth: number;

}


const PerformanceInformation = (props: Props) => {
    return  (
        <Box sx={{paddingTop: "30px"}}>
            <Grid container spacing={3} columnSpacing={3}>
                <Grid item lg={3} sm={4}>
                    <Box sx={{borderLeft: "4px solid #434343", paddingLeft: "10px"}}>
                        <Typography variant='body1' sx={{fontSize: "10pt"}}>
                            Total Working Hour
                        </Typography>
                        <Typography variant='h5' sx={{fontWeight: "700"}}>
                            {props.totalWorkingHour.toFixed(2)} Hours
                        </Typography>
                    </Box>

                </Grid>
                <Grid item lg={3} sm={4}>
                    <Box sx={{borderLeft: "4px solid #434343", paddingLeft: "10px"}}>
                        <Typography variant='body1' sx={{fontSize: "10pt"}}>
                            Total Overtime Hour
                        </Typography>
                        <Typography variant='h5' sx={{fontWeight: "700"}}>
                            {props.totalOvertimeHour} Hours
                        </Typography>
                    </Box>

                </Grid>
                <Grid item lg={3} sm={4}>
                    <Box sx={{borderLeft: "4px solid #434343", paddingLeft: "10px"}}>
                        <Typography variant='body1' sx={{fontSize: "10pt"}}>
                            Attend in a Month
                        </Typography>
                        <Typography variant='h5' sx={{fontWeight: "700"}}>
                            {props.attendInMonth} / {moment().month(parseInt(props.month)-1).year(parseInt(props.year)).daysInMonth()} Days
                        </Typography>
                    </Box>

                </Grid>
                <Grid item lg={3} sm={4}>
                    <Box sx={{borderLeft: "4px solid #434343", paddingLeft: "10px"}}>
                        <Typography variant='body1' sx={{fontSize: "10pt"}}>
                            On Time in a Month
                        </Typography>
                        <Typography variant='h5' sx={{fontWeight: "700"}}>
                            {props.onTimeInMonth} / {moment().month(parseInt(props.month)-1).year(parseInt(props.year)).daysInMonth()} Days
                        </Typography>
                    </Box>

                </Grid>
                <Grid item lg={3} sm={4}>
                    <Box sx={{borderLeft: "4px solid #434343", paddingLeft: "10px"}}>
                        <Typography variant='body1' sx={{fontSize: "10pt"}}>
                            Overtime Days in a Month
                        </Typography>
                        <Typography variant='h5' sx={{fontWeight: "700"}}>
                            {props.overtimeInMonth} / {moment().month(parseInt(props.month)-1).year(parseInt(props.year)).daysInMonth()} Days
                        </Typography>
                    </Box>

                </Grid>
            </Grid>
        </Box>
    )
        
}


export default PerformanceInformation;