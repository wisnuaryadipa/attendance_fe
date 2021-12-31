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
import {addDotNumberCurrency as addDOt} from '@src/helper/common'

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

    @page {
        margin: 0;
    }
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
    const [employee, setEmployee] = useState({} as Partial<IEmployee>);
    const [searchParams, setSearchParam] = useSearchParams();
    const refMonthYear = useRef({} as MonthYear);
    const refIsEmployeeAvailable = useRef(false);
    const {employeeId} = useParams();
    const month = searchParams.get('month') || "";

    const dateStart = moment().month(monthYear.month-2).year(monthYear.year).startOf('month').format("DD");
    const dateEnd = moment().month(monthYear.month-2).year(monthYear.year).endOf('month').format("DD");
    const gajiBulanan = (employee.payrolls) ? employee.payrolls![0]?.monthlySalary : 0;
    const jumlahKedatangan = (employee.payrolls) ? employee.payrolls![0]?.totalDayAttended : 0;
    const gajiPerHari = (employee.payrolls) ? employee.payrolls![0]?.dailySalary : 0;
    const gajiMingguan = jumlahKedatangan * gajiPerHari;
    const jumlahJamLembur = (employee.payrolls) ? employee.payrolls![0]?.totalOvertimeHour : 0;
    const gajiPerJamLembur = (employee.payrolls) ? employee.payrolls![0]?.hourlyOvertimeSalary : 0;
    const gajiLembur = jumlahJamLembur * gajiPerJamLembur;
    const gajiTunjangan = (employee.payrolls) ? employee.payrolls![0]?.tunjangan : 0;
    const fasilitasBPJS = (employee.payrolls) ? employee.payrolls![0]?.fasilitasBpjs : 0;
    const incomeLainLain = (employee.payrolls) ? employee.payrolls![0]?.incomeLainLain : 0;
    const totalIncome = gajiMingguan + gajiLembur + gajiTunjangan + fasilitasBPJS + incomeLainLain;

    const outcomeBPJS = (employee.payrolls) ? employee.payrolls![0]?.outcomeBpjstk : 0;
    const pinjaman = (employee.payrolls) ? employee.payrolls![0]?.outcomeDebt : 0;
    const outcomeLainLain = (employee.payrolls) ? employee.payrolls![0]?.outcomeLainLain : 0;
    const totalOutcome = outcomeBPJS + pinjaman + outcomeLainLain;

    const totalPaymentReceived = totalIncome - totalOutcome;

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
                if (_employeeData.data.data){ refIsEmployeeAvailable.current = true }
                setEmployee(_employeeData.data.data)
            }
            setLoading(false)
            window.print()
        }

        if(loading === true){
            loadSync();
        }
    },[])


    const fetchEmployeeData = async (month: number, year: number, employeeId: number) => {
        const queryString = qs.stringify({month: month, year: year}, { indices: false });
        const axiosOption: AxiosRequestConfig = {
            url: `${process.env.REACT_APP_URL_API}/api/payroll/${employeeId}?${queryString}`,
            method: "GET",
        }
        const result = await getAxios<IResponse<IEmployee>>(axiosOption)
        return result;
    }


    if (loading){ return (<></>)} else {if (!refIsEmployeeAvailable.current){ return (<NotFoundPage/>)}}
    
    return (

        <PrintArea>
            <Box sx={{textAlign:"center"}}>
                Slip Gaji
            </Box>
            <Box sx={{borderBottom: "1px solid #000000", textAlign:"center"}}>
                CV. ALPHABET
            </Box>
            <Box sx={{marginTop: "15px"}}>
                
                <Box sx={{ display: "flex", flexDirection: "column"}}>
                    <Box sx={{display: "flex", justifyContent: "start", maxWidth: "10cm"}}>
                        <div style={{minWidth: "2cm", maxWidth: "3.5cm"}}>Nama</div>
                        <div style={{width: "0.3cm"}}>:</div>
                        <div style={{ maxWidth: "6cm"}}>{employee.name}</div>
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "start", maxWidth: "10cm"}}>
                        <div style={{minWidth: "2cm", maxWidth: "3.5cm"}}>No. Absen</div>
                        <div style={{width: "0.3cm"}}>:</div>
                        <div>{employee.machineId}</div>
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "start", maxWidth: "10cm"}}>
                        <div style={{minWidth: "2cm", maxWidth: "3.5cm"}}>Periode</div>
                        <div style={{width: "0.3cm"}}>:</div>
                        <div>{`${dateStart} - ${dateEnd}`} {monthIDN[monthYear.month-2]} {monthYear.year}</div>
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "start", maxWidth: "10cm"}}>
                        <div style={{minWidth: "2cm", maxWidth: "3.5cm"}}>Tanggal</div>
                        <div style={{width: "0.3cm"}}>:</div>
                        <div>{moment().format("DD")} {monthIDN[parseInt(moment().format("M"))-1]} {moment().format("YYYY")}</div>
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "start", maxWidth: "10cm"}}>
                        <div style={{minWidth: "2cm", maxWidth: "3.5cm"}}>Jabatan</div>
                        <div style={{width: "0.3cm"}}>:</div>
                        <div>{employee.position ? employee.position.name : "(Kosong)" }</div>
                    </Box>
                </Box>
            </Box>
            <Box sx={{marginTop: "15px"}}>
                <Typography sx={{fontWeight: "bold", fontSize: "9pt"}}> GAJI & FASILITAS :</Typography>
            </Box>
            <Box>
                <table style={{width: "100%"}}>
                    <tr>
                        <th style={{textAlign: "start", width: "3cm", fontWeight: "normal"}}>Gaji Bulanan</th>
                        <th></th>
                        <th style={{width: "1cm", fontWeight: "normal"}}></th>
                        <th style={{width: "1cm", fontWeight: "normal"}}></th>
                        <th style={{width: "1cm", fontWeight: "normal"}}></th>
                        <th style={{width: "1cm", fontWeight: "normal"}}></th>
                        <th style={{textAlign: "end", width: "3cm", fontWeight: "normal"}}>{addDOt(gajiBulanan)}</th>
                    </tr>
                    <tr>
                        <td>Gaji Mingguan</td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}>{jumlahKedatangan}</td>
                        <td style={{textAlign: "center"}}>x</td>
                        <td style={{textAlign: "end"}}>{addDOt(gajiPerHari)}</td>
                        <td style={{textAlign: "end"}}>=</td>
                        <td style={{textAlign: "end"}}>{addDOt(gajiMingguan)}</td>
                    </tr>
                    <tr>
                        <td>Overtime</td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}>{addDOt(jumlahJamLembur)}</td>
                        <td style={{textAlign: "center"}}>x</td>
                        <td style={{textAlign: "end"}}>{addDOt(gajiPerJamLembur)}</td>
                        <td style={{textAlign: "end"}}>=</td>
                        <td style={{textAlign: "end"}}>{addDOt(gajiLembur)}</td>
                    </tr>
                    <tr>
                        <td>Tunjangan</td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}>{addDOt(gajiTunjangan)}</td>
                    </tr>
                    <tr>
                        <td>Fasilitas BPJS</td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}>{addDOt(fasilitasBPJS)}</td>
                    </tr>
                    <tr>
                        <td>Lain-Lain *)</td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}>{addDOt(incomeLainLain)}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{textAlign: "center"}}>Total</td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end", borderTop: "1px solid #000000"}}>Rp. {addDOt(totalIncome)}</td>
                    </tr>
                </table>
            </Box>
            <Box sx={{marginTop: "15px"}} >
                <Typography sx={{fontWeight: "bold", fontSize: "9pt"}}> POTONGAN :</Typography>
            </Box>
            <Box>
                <table style={{width: "100%"}}>
                    <tr>
                        <th colSpan={3} style={{textAlign: "start", width: "3cm", fontWeight: "normal"}}>Iuran BPJS TK/JHT/PENSIUN</th>
                        <th style={{width: "1cm", fontWeight: "normal"}}></th>
                        <th style={{textAlign: "end", width: "3cm", fontWeight: "normal"}}>{addDOt(outcomeBPJS)}</th>
                    </tr>
                    <tr>
                        <td colSpan={3}>Pinjaman</td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}>{addDOt(pinjaman)}</td>
                    </tr>
                    <tr>
                        <td colSpan={3}>Lain-Lain *)</td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}>{addDOt(outcomeLainLain)}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{textAlign: "center"}}>Total</td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end", borderTop: "1px solid #000000"}}>Rp. {addDOt(totalOutcome)}</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{textAlign: "left"}}>TOTAL GAJI DITERIMA :</td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end", border: "1px solid #000000"}}>Rp. {addDOt(totalPaymentReceived)}</td>
                    </tr>
                </table>
            </Box>
            <Box>
                <table style={{width: "100%"}}>
                    <tr>
                        <th>&nbsp;</th>
                        <th></th>
                        <th style={{width: "3cm"}}></th>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td></td>
                        <td rowSpan={3} style={{textAlign: "center"}}>ttd</td>
                    </tr>
                    <tr>
                        <td>Keterangan *</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td style={{textAlign: "center"}}>HRD</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td style={{borderTop: "1px solid #000000", textAlign: "center"}} >Mr. Malcom R</td>
                    </tr>
                </table>
            </Box>

        </PrintArea>

    )
}

export default PrintLayoutPayroll;