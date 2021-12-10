import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import react from 'react';
import TotalEmployee from './CardTotalEmployee'
import TotalOvertime from './CardTotalOvertime';
import MonthlyAttendancePerDivision from './MonthlyAttendancePerDivision';

const Main = () => {


    return (
        <Grid container spacing={3}>
            <Grid item lg={4} sm={6} >
                <TotalEmployee/>
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