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
import IEmployee from 'src/interfaces/response/IEmployee';

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
    const [loading, setLoading] = useState(true);

    

    const fetchPayrollData = async (month: number, year: number, employeeId: number) => {
        const queryString = qs.stringify({month: month, year: year}, { indices: false });
        const axiosOption: AxiosRequestConfig = {
            url: `http://localhost:3001/api/payroll/${employeeId}?${queryString}`,
            method: "GET",
        }
        const result = await getAxios<IResponse<IEmployee>>(axiosOption)
        return result;
    }


    useEffect(() => {

        const loadSync = async () => {

                const _payrollData = await fetchPayrollData(
                    monthYear.month,
                    monthYear.year,
                    parseInt(employeeId!)
                )
                if(_payrollData && _payrollData.status === 201 ) {
                    setData(_payrollData.data.data.payrolls[0]);
                    setEmployee(_payrollData.data.data)
                    if (!_payrollData.data.data){ setIsPositionIdExist(false) }
                }
                searchParams.forEach((item, key) => {
                    setMonthYear({...monthYear, [key]: item});
                })
                setLoading(false)
                console.log(_payrollData)
        }

        if(loading === true){
            loadSync();
        }
    },[])

    const handleChangeSelect = async (event: SelectChangeEvent<unknown>, name: string) => {
        setData({...data, [name as keyof typeof data]: event.target.value})
        refData.current = {...data, [name as keyof typeof data]: event.target.value};
        props.inputData(refData.current)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: String) => {
        setData({...data, [name as keyof typeof data]: event.target.value})
        refData.current = {...data, [name as keyof typeof data]: event.target.value};
        props.inputData(refData.current)
    };


    if (!isPositionIdExist){ return (<NotFoundPage/>)}
    return (
        <Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
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
            <Box sx={{marginBottom: "30px"}}>
                <Typography variant='h6'>
                    GAJI & FASILITAS
                </Typography>
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
                        defaultValue={data.monthlySalary ?? ""}
                        value={data.monthlySalary ?? ""}
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
                        defaultValue={data.selectedSalaryType ?? ""}
                        value={data.selectedSalaryType ?? ""}
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
                        defaultValue={data.totalDayAttended ?? ""}
                        value={data.totalDayAttended ?? ""}
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
                        defaultValue={data.dailySalary ?? ""}
                        value={data.dailySalary ?? ""}
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
                            defaultValue={data.totalOvertimeHour ?? ""}
                            value={data.totalOvertimeHour ?? ""}
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
                        defaultValue={data.hourlyOvertimeSalary ?? ""}
                        value={data.hourlyOvertimeSalary ?? ""}
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
                        defaultValue={data.tunjangan ?? ""}
                        value={data.tunjangan ?? ""}
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
                        defaultValue={data.fasilitasBpjs ?? ""}
                        value={data.fasilitasBpjs ?? ""}
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
                        defaultValue={data.incomeLainLain ?? ""}
                        value={data.incomeLainLain ?? ""}
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
                        defaultValue={data.outcomeBpjstk ?? ""}
                        value={data.outcomeBpjstk ?? ""}
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
                        defaultValue={data.outcomeDebt ?? ""}
                        value={data.outcomeDebt ?? ""}
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
                        defaultValue={data.outcomeLainLain ?? ""}
                        value={data.outcomeLainLain ?? ""}
                        />
                </Grid>
            </GridStyled>
        </Box>
    )
}

export default FormInput;