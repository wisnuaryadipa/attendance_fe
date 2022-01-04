import react, {useEffect, useState, useRef} from 'react';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Select from '@src/components/Select/Select';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Divider from '@mui/material/Divider';
import { useSearchParams, useParams } from 'react-router-dom';
import moment from 'moment'
import NotFoundPage from '@pages/404'
import { SelectChangeEvent } from '@mui/material/Select';
import { IPayroll } from '@src/interfaces/response/IPayroll';
import { getAxios } from '@src/services/axios';
import { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import IResponse from '@src/interfaces/response/IResponse';
import IEmployee from '@src/interfaces/response/IEmployee';
import { MonthYear } from '@src/types/common';
import {monthIDN} from '@src/static/common';

interface IMonthYear {
    month: number,
    year: number,
}

interface Props extends HTMLDivElement{
    inputData: any
}

const GridStyled = styled(Grid)`
    padding-bottom: 30px;
`

const FormInput = (props: any) => {
    const selectSalaryType = [{id:true,name:"Gaji Bulanan Flat"}, {id: false, name: "Gaji Harian"}];

    
    const monthNow = moment().format('M');
    const yearNow = moment().format("YYYY");
    const initMonthYear = {
        month: parseInt(monthNow), 
        year: parseInt(yearNow)
    } as IMonthYear
    const [isPositionIdExist, setIsPositionIdExist] = useState(true);
    const [selectedSalayType, SetSelectedSalaryType] = useState(1);
    const [monthYear, setMonthYear] = useState(initMonthYear);
    const [data, setData] = useState({} as Partial<IPayroll>);
    const [employee, setEmployee] = useState({} as Partial<IEmployee>);
    const [searchParams, setSearchParam] = useSearchParams();
    const {employeeId} = useParams();
    const refData = useRef({} as any);
    const refMonthYear = useRef({
        month: parseInt(monthNow), 
        year: parseInt(yearNow)
    } as MonthYear)
    const [loading, setLoading] = useState(true);

    

    const fetchEmployeeData = async (month: number, year: number, employeeId: number) => {
        const queryString = qs.stringify({month: month, year: year}, { indices: false });
        const axiosOption: AxiosRequestConfig = {
            url: `${process.env.REACT_APP_URL_API}/api/payroll/${employeeId}?${queryString}`,
            method: "GET",
        }
        const result = await getAxios<IResponse<IEmployee>>(axiosOption)
        return result;
    }

    const fetchPayrollData = async (month: number, year: number, employeeId: number) => {
        const queryString = qs.stringify({month: month, year: year}, { indices: false });
        const axiosOption: AxiosRequestConfig = {
            url: `${process.env.REACT_APP_URL_API}/api/payroll/last-input/${employeeId}?${queryString}`,
            method: "GET",
        }
        const result = await getAxios<IResponse<IPayroll>>(axiosOption)
        return result; 
    }



    useEffect(() => {

        const loadSync = async () => {

            searchParams.forEach((item, key) => {
                setMonthYear({...monthYear, [key]: item});
                refMonthYear.current = {...refMonthYear.current, [key]: item}
            })

            const _employeeData = await fetchEmployeeData(
                refMonthYear.current.month,
                refMonthYear.current.year,
                parseInt(employeeId!)
            )

            if (_employeeData && _employeeData.status === 201 ) {
                
                setEmployee(_employeeData.data.data)
                if (!_employeeData.data.data){ setIsPositionIdExist(false) }
                if(_employeeData.data.data.payrolls[0]) {
                    setData(_employeeData.data.data.payrolls[0]);
                    refData.current = _employeeData.data.data.payrolls[0]
                    props.inputData(_employeeData.data.data.payrolls[0]);
                } else {
                    const _payrollData = await fetchPayrollData(
                        refMonthYear.current.month,
                        refMonthYear.current.year,
                        parseInt(employeeId!)
                    )
                    setData(_payrollData.data.data);
                    refData.current = _payrollData.data.data
                    props.inputData(_payrollData.data.data);
                }
            }
            setLoading(false)
        }

        if(loading === true){
            loadSync();
            
        }
    },[])
    
    useEffect( () => {
        const loadSync = async () => {

            const _employeeData = await fetchEmployeeData(
                refMonthYear.current.month,
                refMonthYear.current.year,
                parseInt(employeeId!)
            )

            if (_employeeData && _employeeData.status === 201 ) {
                
                setEmployee(_employeeData.data.data)
                if (!_employeeData.data.data){ setIsPositionIdExist(false) }
                if(_employeeData.data.data.payrolls[0]) {
                    setData(_employeeData.data.data.payrolls[0]);
                    props.inputData(_employeeData.data.data.payrolls[0]);
                } else {
                    const _payrollData = await fetchPayrollData(
                        refMonthYear.current.month,
                        refMonthYear.current.year,
                        parseInt(employeeId!)
                    )
                    setData(_payrollData.data.data);
                    props.inputData(_payrollData.data.data);
                }
            }
            setLoading(false)
        }

        loadSync();
    },[employeeId, props])

    const handleChangeSelect = async (event: SelectChangeEvent<unknown>, name: string) => {
        setData({...data, [name as keyof typeof data]: event.target.value})
        refData.current = {...data, [name as keyof typeof data]: event.target.value};
        props.inputData(refData.current)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: String) => {
        setData({...data, [name as keyof typeof data]: event.target.value})
        refData.current = {...data, [name as keyof typeof data]: event.target.value};
        console.log(refData.current)
        props.inputData(refData.current)
    };

    if (!isPositionIdExist){ return (<NotFoundPage/>)}
    return (
        <Box>
            <Box>
                <GridStyled container spacing={2} rowSpacing={3} >
                    <Grid item lg={3} sm={6}>
                        <Typography variant='body2'>Nama</Typography>
                        <Typography>{employee.name ?? `(Kosong)`}</Typography>
                    </Grid>
                    <Grid item lg={3} sm={6}>
                        <Typography variant='body2'>Email</Typography>
                        <Typography>{employee.email ?? `(Kosong)`}</Typography>
                    </Grid>
                    <Grid item lg={3} sm={6}>
                        <Typography variant='body2'>Jenis Kelamin</Typography>
                        <Typography>{employee.gender ?? `(Kosong)`}</Typography>
                    </Grid>
                    <Grid item lg={3} sm={6}>
                        <Typography variant='body2'>Nomor Mesin Absen</Typography>
                        <Typography>{employee.machineId ?? `(Kosong)`}</Typography>
                    </Grid>
                </GridStyled>
            </Box>

            <Divider />
            <Box sx={{marginBottom: "30px", display: 'flex', flexDirection: "row", justifyContent: "space-between"}}>
                <Typography variant='h6'>
                    GAJI & FASILITAS 
                </Typography>
                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    <Typography variant='body2' sx={{color: "red"}}>
                        Last Input : {data ? `${monthIDN[data.month!-1]} / ${data.year}` : `(Kosong)`}
                    </Typography>
                </Box>
            </Box>
            <GridStyled container spacing={2} rowSpacing={3}>
                <Grid item lg={3} sm={6}>
                    <TextField 
                        fullWidth
                        required
                        id="monthlySalary"
                        key="monthlySalary"
                        label="Gaji Bulanan"
                        helperText="Gaji Bulanan Flat (Rp)"
                        className="text-input"
                        onChange={ (e)=>{handleChange(e, "monthlySalary")} }
                        defaultValue= ""
                        value={ data && data.monthlySalary ? data.monthlySalary : "" }
                        />
                </Grid>
                <Grid item lg={3} sm={6}>
                    <Select
                        required
                        id="selectSalaryType"
                        key="selectSalaryType"
                        label="Tipe Penggajian"
                        onChange={ (e)=>{handleChangeSelect(e, "selectedSalaryType")} }
                        className="text-input"
                        defaultValue=""
                        value={ data && (data.selectedSalaryType !== undefined) ? data.selectedSalaryType : ""}
                        dataList={selectSalaryType}
                        /> 
                </Grid>
            </GridStyled>
            <GridStyled container spacing={2} rowSpacing={3}>

                <Grid item lg={3} sm={6}>
                    <TextField 
                        fullWidth
                        required
                        id="totalDayAttended"
                        key="totalDayAttended"
                        label="Jumlah Kedatangan (Hari)"
                        helperText="Jumlah Hari Kedatangan"
                        className="text-input"
                        onChange={(e)=>{handleChange(e, "totalDayAttended")} }
                        defaultValue= ""
                        value={ data && data.totalDayAttended ? data.totalDayAttended : ""}
                        />
                </Grid>
                <Grid item lg={3} sm={6}>
                    <TextField 
                        fullWidth
                        required
                        id="dailySalary"
                        key="dailySalary"
                        label="Gaji per hari"
                        helperText="Total Gaji per Hari (Rp)"
                        className="text-input"
                        onChange={(e)=>{handleChange(e, "dailySalary")} }
                        defaultValue= ""
                        value={ data && data.dailySalary ? data.dailySalary : ""}
                        />
                </Grid>
            </GridStyled>
            

            <GridStyled container spacing={2} rowSpacing={3} >
                <Grid item lg={3} sm={6}>
                    <FormControl fullWidth >
                        <TextField 
                            fullWidth
                            required
                            id="totalOvertimeHour"
                            key="totalOvertimeHour"
                            label="Jumlah Overtime (Jam)"
                            helperText="Jumlah Jam Overtime"
                            className="text-input"
                            onChange={(e)=>{handleChange(e, "totalOvertimeHour")} }
                            defaultValue= ""
                            value={ data && data.totalOvertimeHour ? data.totalOvertimeHour : ""}
                            />
                    </FormControl>
                </Grid>
                <Grid item lg={3} sm={6}>
                    <TextField 
                        fullWidth
                        required
                        id="hourlyOvertimeSalary"
                        key="hourlyOvertimeSalary"
                        label="Gaji Overtime per Jam"
                        helperText="Gaji Overtime Setiap Jam (Rp)"
                        className="text-input"
                        onChange={(e)=>{handleChange(e, "hourlyOvertimeSalary")} }
                        defaultValue= ""
                        value={ data && data.hourlyOvertimeSalary ? data.hourlyOvertimeSalary : ""}
                        />
                </Grid>
            </GridStyled>
            
            <GridStyled container spacing={2} rowSpacing={3}>

                <Grid item lg={3} sm={6}>
                    <TextField 
                        fullWidth
                        required
                        id="tunjangan"
                        key="tunjangan"
                        label="Tunjangan"
                        className="text-input"
                        onChange={(e)=>{handleChange(e, "tunjangan")} }
                        defaultValue= ""
                        value={ data && data.tunjangan ? data.tunjangan : ""}
                        />
                </Grid>
                <Grid item lg={3} sm={6}>
                    <TextField 
                        fullWidth
                        required
                        id="fasilitasBpjs"
                        key="fasilitasBpjs"
                        label="Fasilitas BPJS"
                        className="text-input"
                        onChange={(e)=>{handleChange(e, "fasilitasBpjs")} }
                        defaultValue= ""
                        value={ data && data.fasilitasBpjs ? data.fasilitasBpjs : ""}
                        />
                </Grid>
                <Grid item lg={3} sm={6}>
                    <TextField 
                        fullWidth
                        required
                        id="incomeLainLain"
                        key="incomeLainLain"
                        label="Lain-Lain"
                        className="text-input"
                        onChange={(e)=>{handleChange(e, "incomeLainLain")} }
                        defaultValue= ""
                        value={ data && data.incomeLainLain ? data.incomeLainLain : ""}
                        />
                </Grid>
            </GridStyled>

            <Divider/>
            
            <Box sx={{marginBottom: "30px", marginTop: "20px"}}>
                <Typography variant='h6'>
                    POTONGAN
                </Typography>
            </Box>
            
            <GridStyled container spacing={2} rowSpacing={3}>

                <Grid item lg={3} sm={6}>
                    <TextField 
                        fullWidth
                        required
                        id="outcomeBpjstk"
                        key="outcomeBpjstk"
                        label="Iuran BPJS TK/JHT/PENSIUN"
                        className="text-input"
                        onChange={(e)=>{handleChange(e, "outcomeBpjstk")} }
                        defaultValue= ""
                        value={ data && data.outcomeBpjstk ? data.outcomeBpjstk : ""}
                        />
                </Grid>
                <Grid item lg={3} sm={6}>
                    <TextField 
                        fullWidth
                        required
                        id="outcomeDebt"
                        key="outcomeDebt"
                        label="Pinjaman"
                        className="text-input"
                        onChange={(e)=>{handleChange(e, "outcomeDebt")} }
                        defaultValue= ""
                        value={ data && data.outcomeDebt ? data.outcomeDebt : ""}
                        />
                </Grid>
                <Grid item lg={3} sm={6}>
                    <TextField 
                        fullWidth
                        required
                        id="outcomeLainLain"
                        key="outcomeLainLain"
                        label="Lain-Lain"
                        className="text-input"
                        onChange={(e)=>{handleChange(e, "outcomeLainLain")} }
                        defaultValue= ""
                        value={ data && data.outcomeLainLain ? data.outcomeLainLain : ""}
                        />
                </Grid>
            </GridStyled>
        </Box>
    )
}

export default FormInput;