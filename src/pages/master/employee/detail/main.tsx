import BasicInformation from './basicInformation';
import AttendanceCalendar from './AttendanceCalendar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router';
import react, {useState} from 'react';
import { AxiosRequestConfig } from 'axios';
import { getAxios, postAxios } from '@src/services/axios';
import IResponse from '@src/interfaces/response/IResponse';

const MainDetail = () => {

    return (
        <Grid container rowSpacing={3} >
            <Grid item sm={12}>

                <BasicInformation>

                </BasicInformation>
            </Grid>
            <Grid item sm={12}>

                <AttendanceCalendar/>
            </Grid>
        </Grid>
    )
}

export default MainDetail;