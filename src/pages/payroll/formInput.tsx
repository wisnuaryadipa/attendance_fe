import react, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import { useSearchParams, useParams } from 'react-router-dom';
import moment from 'moment'

interface IMonthYear {
    month: number,
    year: number,
}

const GridStyled = styled(Grid)`
    
    padding-bottom: 30px;


`

const FormInput = () => {

    
    const monthNow = moment().format('M');
    const yearNow = moment().format("YYYY");
    const initMonthYear = {
        month: parseInt(monthNow), 
        year: parseInt(yearNow)
    } as IMonthYear
    
    const [monthYear, setMonthYear] = useState(initMonthYear);
    const [searchParams, setSearchParam] = useSearchParams();
    const {employeeId} = useParams();

    

    const fetchPayrollData = (month: number, year: number, employeeId: number) => {

        console.log()

    }

    console.log(monthYear)


    useEffect(() => {

        searchParams.forEach((item, key) => {
            setMonthYear({...monthYear, [key]: item});
        })
        // console.log(month)
    },[])

    return (
        <Box>
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
                        id="monthlyPayment"
                        key="monthlyPayment"
                        label="Gaji Bulanan"
                        helperText="Gaji Bulanan Flat (Rp)"
                        className="text-input"
                        />
                </Grid>
            </GridStyled>
            <GridStyled container spacing={2} rowSpacing={3}>

                <Grid item lg={3} sm={6}>
                    <TextField 
                        fullWidth
                        required
                        id="weeklyPayment"
                        key="weeklyPayment"
                        label="Jumlah Kedatangan (Hari)"
                        helperText="Jumlah Hari Kedatangan"
                        className="text-input"
                        />
                </Grid>
                <Grid item lg={3} sm={6}>
                    <TextField 
                        fullWidth
                        required
                        id="weeklyPayment"
                        key="weeklyPayment"
                        label="Gaji per hari"
                        helperText="Total Gaji per Hari (Rp)"
                        className="text-input"
                        />
                </Grid>
            </GridStyled>
            

            <GridStyled container spacing={2} rowSpacing={3} >
                <Grid item lg={3} sm={6}>
                    <FormControl fullWidth >
                        <TextField 
                            fullWidth
                            required
                            id="weeklyPayment"
                            key="weeklyPayment"
                            label="Jumlah Overtime (Jam)"
                            helperText="Jumlah Jam Overtime"
                            className="text-input"
                            />
                    </FormControl>
                </Grid>
                <Grid item lg={3} sm={6}>
                    <TextField 
                        fullWidth
                        required
                        id="weeklyPayment"
                        key="weeklyPayment"
                        label="Gaji Overtime per Jam"
                        helperText="Gaji Overtime Setiap Jam (Rp)"
                        className="text-input"
                        />
                </Grid>
            </GridStyled>
            
            <GridStyled container spacing={2} rowSpacing={3}>

                <Grid item lg={3} sm={6}>
                    <TextField 
                        fullWidth
                        required
                        id="weeklyPayment"
                        key="weeklyPayment"
                        label="Tunjangan"
                        className="text-input"
                        />
                </Grid>
                <Grid item lg={3} sm={6}>
                    <TextField 
                        fullWidth
                        required
                        id="weeklyPayment"
                        key="weeklyPayment"
                        label="Fasilitas BPJS"
                        className="text-input"
                        />
                </Grid>
                <Grid item lg={3} sm={6}>
                    <TextField 
                        fullWidth
                        required
                        id="weeklyPayment"
                        key="weeklyPayment"
                        label="Lain-Lain"
                        className="text-input"
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
                        id="weeklyPayment"
                        key="weeklyPayment"
                        label="Iuran BPJS TK/JHT/PENSIUN"
                        className="text-input"
                        />
                </Grid>
                <Grid item lg={3} sm={6}>
                    <TextField 
                        fullWidth
                        required
                        id="weeklyPayment"
                        key="weeklyPayment"
                        label="Pinjaman"
                        className="text-input"
                        />
                </Grid>
                <Grid item lg={3} sm={6}>
                    <TextField 
                        fullWidth
                        required
                        id="weeklyPayment"
                        key="weeklyPayment"
                        label="Lain-Lain"
                        className="text-input"
                        />
                </Grid>
            </GridStyled>
        </Box>
    )
}

export default FormInput;