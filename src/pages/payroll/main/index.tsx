import React, {useState, useEffect, useCallback} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import moment from 'moment'
import {Panel, PanelHeader, PanelBody, PanelFooter} from '@components/panel';
import {MonthYear} from '@src/types/common'
import {buildArrRangeNumber} from '@src/helper/common'
import { getAxios } from 'src/services/axios';
import { AxiosRequestConfig } from 'axios';
import {useParams} from 'react-router-dom';
import qs from 'qs';



const IndexPage = () => {

    let years = [] as number[];
    const {month, year} = useParams();
    const initMonth = month ? parseInt(month) : parseInt(moment().format("M"));
    const initYear = year ? parseInt(year) : parseInt(moment().format("YYYY"));
    const months = moment.months();

    const [monthYear, setMonthYear] = useState({month: initMonth, year: initYear} as MonthYear);
    const [dataInputed, setDataInputed] = useState({} as any);
    const [dataNotInputed, setDataNotInputed] = useState({} as any);


    const fetchDataInputed = useCallback(async () => {
        const query = qs.stringify({year: monthYear.year, month: monthYear.month}, {indices: false});
        const axiosOption: AxiosRequestConfig = {
            url: 'http://localhost:3001/api/master/employees/payroll',
            method: "GET",
        }

        const _dataInputed = await getAxios(axiosOption);
        setDataInputed({...dataInputed, _dataInputed});
        return _dataInputed;
    },[dataInputed])

    const fetchDataNotInputed = useCallback(async () => {

        const axiosOption: AxiosRequestConfig = {
            url: 'http://localhost:3001/api/master/employees/payroll',
            method: "GET",
        }

        const _dataNotInputed = await getAxios(axiosOption);
        setDataNotInputed({...dataNotInputed, _dataNotInputed});
        return _dataNotInputed;
    },[dataNotInputed])


    useEffect(() => {
        const asyncRun = async () => {
            await fetchDataInputed();
            await fetchDataNotInputed();
        }

        asyncRun();
    },[fetchDataInputed, fetchDataNotInputed, monthYear]) 
    
    const handleChangeSelect = async (e: SelectChangeEvent<unknown>, name: string) => {

        await setMonthYear({...monthYear, [name as keyof typeof monthYear]: e.target.value})
        // setLoading(true)
    }


    years = buildArrRangeNumber(2015, initYear);
    return (
        <Panel>
            <PanelHeader>
                <Typography>List Payroll</Typography>
                <Box sx={{minWidth: "200px", display: "flex", flexDirection: "row"}}>
                    <FormControl fullWidth sx={{minWidth: "200px", marginRight: "10px"}} >
                        <InputLabel id="demo-simple-select-label">Month</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={monthYear.month.toString()}
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
                            value={monthYear.year.toString()}
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
            </PanelHeader>
            <PanelBody>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataInputed.map((item: any, key: any) => {
                            return (
                                <TableRow>
                                    <TableCell>{key}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </PanelBody>
            <PanelFooter>

            </PanelFooter>
        </Panel>
    )

}


export default IndexPage;