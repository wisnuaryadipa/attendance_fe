import React, {useState, useEffect, useRef} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import moment from 'moment';
import qs from 'qs'
import {useSearchParams, useParams} from 'react-router-dom'
import IResponse from '@src/interfaces/response/IResponse';
import IEmployee from '@src/interfaces/response/IEmployee';
import { getAxios } from '@src/services/axios';
import { AxiosRequestConfig } from 'axios';
import { MonthYear } from '@src/types/common';
import NotFoundPage from '@pages/404'
import { MonetizationOnSharp } from '@material-ui/icons';
import {monthIDN} from '@src/static/common';
import {addDotNumberCurrency as addDOt} from '@src/helper/common';
import PrintPayrollBase from './printPayrollBase';
import Grid from '@mui/material/Grid'

interface IMonthYear {
    month: number,
    year: number,
}

type Props = {
    location: Location
}

const PrintArea = styled(Box)`
    padding: 10px 20px;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #ffffff;
    width:  9.5cm;
    height: 14.0cm;
    /* width:  21.0cm;
    height: 29.7cm; */
    border: 1px solid #000000;
    font-size: 9pt;
    line-height: 1;

    table {
        border-collapse: collapse;
    }

    td, th {
        padding: 2px 0px;
    }
`

const PrintLayoutPayroll = () => {
    const monthNow = moment().format('M');
    const yearNow = moment().format("YYYY");
    const initMonthYear = {
        month: parseInt(monthNow), 
        year: parseInt(yearNow)
    } as IMonthYear
    
    const [monthYear, setMonthYear] = useState(initMonthYear);
    const [loading, setLoading] = useState(true);
    const [employees, setEmployees] = useState({} as Partial<IEmployee[]>);
    const [searchParams, setSearchParam] = useSearchParams();
    const monthQuery = searchParams.get('month') ?? undefined;
    const yearQuery = searchParams.get('year') ?? undefined;
    const refMonthYear = useRef({} as MonthYear);
    const refIsEmployeeAvailable = useRef(false);
    const {employeeId} = useParams();
    const month = searchParams.get('month') || "";


    useEffect(() => {

        const loadSync = async () => {
            refMonthYear.current.month = monthQuery ? parseInt(monthQuery) : monthYear.month;
            refMonthYear.current.year = yearQuery ? parseInt(yearQuery) : monthYear.year;

            const _employeeData = await fetchEmployeeData(
                refMonthYear.current.month,
                refMonthYear.current.year,
                parseInt(employeeId!)
            )

            if (_employeeData && _employeeData.status === 201 ) {
                if (_employeeData.data.data){ refIsEmployeeAvailable.current = true }
                setEmployees(_employeeData.data.data)
            }
            setLoading(false)
        }

        if(loading === true){
            loadSync();
        }
    },[])


    const fetchEmployeeData = async (month: number, year: number, employeeId: number) => {
        const queryString = qs.stringify({month: month, year: year, inputedPayroll: 2 }, { indices: false });
        const axiosOption: AxiosRequestConfig = {
            url: `${process.env.REACT_APP_URL_API}/api//master/employees/payroll?${queryString}`,
            method: "GET",
        }
        const result = await getAxios<IResponse<IEmployee[]>>(axiosOption)
        return result;
    }


    if (loading){ return (<></>)} else {if (!refIsEmployeeAvailable.current){ return (<NotFoundPage/>)}}
    
    return (
        <Box sx={{position: 'absolute', left: "0"}}>
            {(() => {
                const PagePrint = [];
                const countPage = Math.ceil(employees.length / 4);
                for (let i = 1; i <= countPage; i++) {
                    PagePrint.push(
                        <Box sx={{width: '21cm', height: '29.7cm'}}>
                            <Grid container>
                                {employees.map((employee, key) => {
                                    if ( key >= (i-1)*4 && key < (i*4)){
                                        return (
                                        
                                            <Grid item xs={6}>
                                                <PrintPayrollBase 
                                                employeeData={employee} 
                                                month={monthYear.month} 
                                                year={monthYear.year}/>
                                            </Grid>
                                            
                                        )
                                    } else {
                                        return ""
                                    }
                                    
                                })}
                            </Grid>
                            
                        </Box>
                    )
                }
                return PagePrint
            })()}
        </Box>
    )
}

export default PrintLayoutPayroll;