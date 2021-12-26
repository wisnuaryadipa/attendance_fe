import React, {useState, useEffect, useCallback, MouseEvent} from 'react';
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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import PrintIcon from '@mui/icons-material/Print';
import AddIcon from '@mui/icons-material/Add';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import moment from 'moment'
import {Panel, PanelHeader, PanelBody, PanelFooter} from '@components/panel';
import {MonthYear} from '@src/types/common'
import {buildArrRangeNumber} from '@src/helper/common'
import { getAxios } from '@src/services/axios';
import { AxiosRequestConfig } from 'axios';
import {useParams} from 'react-router-dom';
import qs from 'qs';
import IResponse from '@src/interfaces/response/IResponse';
import {NavLink, useNavigate} from 'react-router-dom';




const IndexPage = () => {

    let navigate = useNavigate();
    let years = [] as number[];
    const {month, year} = useParams();
    const initMonth = month ? parseInt(month) : parseInt(moment().format("M"));
    const initYear = year ? parseInt(year) : parseInt(moment().format("YYYY"));
    const months = moment.months();

    const [tableSelected, setTableSelected] = useState("inputed");
    const [monthYear, setMonthYear] = useState({month: initMonth, year: initYear} as MonthYear);
    const [dataInputed, setDataInputed] = useState([] as any);
    const [dataNotInputed, setDataNotInputed] = useState([] as any);


    const fetchDataInputed = useCallback(async () => {
        const query = qs.stringify({year: monthYear.year, month: monthYear.month, inputedPayroll: 2}, {indices: false});
        const axiosOption: AxiosRequestConfig = {
            url: `http://localhost:3001/api/master/employees/payroll?${query}`,
            method: "GET",
        }

        const _dataInputed = await getAxios<IResponse<any>>(axiosOption);
        const __dataInputed = _dataInputed.data.data;
        console.log(__dataInputed)
        setDataInputed( __dataInputed);
        return _dataInputed;
    },[monthYear.month, monthYear.year])

    const fetchDataNotInputed = useCallback(async () => {
        const query = qs.stringify({year: monthYear.year, month: monthYear.month, inputedPayroll: 1}, {indices: false});
        const axiosOption: AxiosRequestConfig = {
            url: `http://localhost:3001/api/master/employees/payroll?${query}`,
            method: "GET",
        }

        const _dataNotInputed = await getAxios<IResponse<any>>(axiosOption);
        const __dataNotInputed = _dataNotInputed.data.data
        setDataNotInputed(__dataNotInputed);
        return _dataNotInputed;
    },[monthYear.month, monthYear.year])


    useEffect(() => {
        const asyncRun = async () => {
            await fetchDataInputed();
            await fetchDataNotInputed();
        }
        console.log('run')
        asyncRun();
    },[fetchDataInputed, fetchDataNotInputed]) 
    
    const handleChangeSelect = async (e: SelectChangeEvent<unknown>, name: string) => {

        await setMonthYear({...monthYear, [name as keyof typeof monthYear]: e.target.value})
        // setLoading(true)
    }

    const handleMenuTable = async (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
      ) => {
        if (newAlignment !== null) {
            setTableSelected(newAlignment);
            if(newAlignment === "inputed"){
                await fetchDataInputed()
            } else {
                await fetchDataNotInputed()
            }
        }
      };

    const handleClickPrint = async (e: MouseEvent<HTMLButtonElement>, value: any) => {
        const query = qs.stringify({month: monthYear.month, year: monthYear.year});

    }

    const handleClickEdit = async (e: MouseEvent<HTMLButtonElement>, value: any) => {
        const query = qs.stringify({month: monthYear.month, year: monthYear.year});
        const employeeId = e.currentTarget.dataset['id'];
        // navigate(`/payroll/${employeeId}/form?${query}`, {replace: true})
    }

    const handleClickPrintAll = async (e: MouseEvent<HTMLButtonElement>) => {
        const query = qs.stringify({month: monthYear.month, year: monthYear.year});

    }


    years = buildArrRangeNumber(2015, initYear+1);
    return (
        <Panel>
            <PanelHeader>
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <Typography variant='h5'>List Payroll</Typography>
                </Box>
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
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <Box style={{marginBottom: '40px'}}>
                        <ToggleButtonGroup
                            value={tableSelected}
                            exclusive
                            onChange={handleMenuTable}
                            aria-label="text alignment"
                            >
                            <ToggleButton value="inputed" aria-label="left aligned">
                                Sudah Terinput
                            </ToggleButton>
                            <ToggleButton value="notInputed" aria-label="centered">
                                Belum Terinput
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                    <Box>
                        { (tableSelected === "inputed") && <Button variant="outlined" onClick={handleClickPrintAll}>Print All</Button> }
                    </Box>
                </Box>
                <Box>
                    <Box className="inputedTable" hidden={(tableSelected === "inputed" ? false : true)}>
                        <Table sx={{minHeight: "150px"}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell width="10%" align='center'>No.</TableCell>
                                    <TableCell width="70%">Employee Name</TableCell>
                                    <TableCell align='center' >Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataInputed.map((item: any, key: any) => {
                                    const query = qs.stringify({month: monthYear.month, year: monthYear.year});
                                    return (
                                        <TableRow>
                                            <TableCell align='center'>{key+1}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell align='center'>
                                                <ButtonGroup>
                                                    <NavLink to={`/payroll/${item.machineId}/form?${query}`} replace={false} target="_blank" >
                                                        <Button value={item.id} onClick={e => handleClickEdit(e, item.id)}>
                                                            <EditIcon/>
                                                        </Button>
                                                    </NavLink>
                                                    <NavLink to={`/`} target="_blank">
                                                        <Button value={item.id} onClick={e => handleClickPrint(e, item.id)}>
                                                            <PrintIcon/>
                                                        </Button>
                                                    </NavLink>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Box>
                    <Box className="notInputedTable" hidden={(tableSelected === "notInputed" ? false : true)}>
                        <Table sx={{minHeight: "150px"}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell width="10%" align='center'>No.</TableCell>
                                    <TableCell width="70%">Employee Name</TableCell>
                                    <TableCell align='center' >Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataNotInputed.map((item: any, key: any) => {
                                    const query = qs.stringify({month: monthYear.month, year: monthYear.year});
                                    return (
                                        <TableRow>
                                            <TableCell align='center'>{key+1}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell align='center'>
                                                <ButtonGroup>
                                                    <NavLink to={`/payroll/${item.machineId}/form?${query}`} replace={true} target="_blank" >
                                                        <Button value={item.id} data-id={item.machineId} onClick={e => handleClickEdit(e, item.id)}>
                                                            <AddIcon/>
                                                        </Button>
                                                    </NavLink>
                                                </ButtonGroup>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Box>
                </Box>
                
                
            </PanelBody>
            <PanelFooter>

            </PanelFooter>
        </Panel>
    )

}


export default IndexPage;