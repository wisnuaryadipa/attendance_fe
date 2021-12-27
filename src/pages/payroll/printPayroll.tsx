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
        }

        if(loading === true){
            loadSync();
        }
    },[])


    const fetchEmployeeData = async (month: number, year: number, employeeId: number) => {
        const queryString = qs.stringify({month: month, year: year}, { indices: false });
        const axiosOption: AxiosRequestConfig = {
            url: `http://localhost:3001/api/payroll/${employeeId}?${queryString}`,
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
                PT. XYZ
            </Box>
            <Box sx={{marginTop: "15px"}}>
                
                <Box sx={{ display: "flex", flexDirection: "column"}}>
                    <Box sx={{display: "flex", justifyContent: "start", maxWidth: "10cm"}}>
                        <div style={{minWidth: "3.5cm", maxWidth: "3.5cm"}}>Nama</div>
                        <div style={{width: "0.5cm"}}>:</div>
                        <div>John Martijo</div>
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "start", maxWidth: "10cm"}}>
                        <div style={{minWidth: "3.5cm", maxWidth: "3.5cm"}}>No. Absen</div>
                        <div style={{width: "0.5cm"}}>:</div>
                        <div>0001</div>
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "start", maxWidth: "10cm"}}>
                        <div style={{minWidth: "3.5cm", maxWidth: "3.5cm"}}>Periode</div>
                        <div style={{width: "0.5cm"}}>:</div>
                        <div>1-30 Juni 2021</div>
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "start", maxWidth: "10cm"}}>
                        <div style={{minWidth: "3.5cm", maxWidth: "3.5cm"}}>Tanggal</div>
                        <div style={{width: "0.5cm"}}>:</div>
                        <div>1 Juli 2021</div>
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "start", maxWidth: "10cm"}}>
                        <div style={{minWidth: "3.5cm", maxWidth: "3.5cm"}}>Jabatan</div>
                        <div style={{width: "0.5cm"}}>:</div>
                        <div>Operator</div>
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
                        <th style={{textAlign: "end", width: "3cm", fontWeight: "normal"}}>1.200.000</th>
                    </tr>
                    <tr>
                        <td>Gaji Mingguan</td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}>25</td>
                        <td style={{textAlign: "center"}}>x</td>
                        <td style={{textAlign: "end"}}>50.000</td>
                        <td style={{textAlign: "end"}}>=</td>
                        <td style={{textAlign: "end"}}>1.250.000</td>
                    </tr>
                    <tr>
                        <td>Overtime</td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}>21</td>
                        <td style={{textAlign: "center"}}>x</td>
                        <td style={{textAlign: "end"}}>7.500</td>
                        <td style={{textAlign: "end"}}>=</td>
                        <td style={{textAlign: "end"}}>157.500</td>
                    </tr>
                    <tr>
                        <td>Tunjangan</td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}>100.000</td>
                    </tr>
                    <tr>
                        <td>Fasilitas BPJS</td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}>197.500</td>
                    </tr>
                    <tr>
                        <td>Lain-Lain *)</td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}>-</td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{textAlign: "center"}}>Total</td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end", borderTop: "1px solid #000000"}}>92.000</td>
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
                        <th style={{textAlign: "end", width: "3cm", fontWeight: "normal"}}>57.000</th>
                    </tr>
                    <tr>
                        <td colSpan={3}>Pinjaman</td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}>25.000</td>
                    </tr>
                    <tr>
                        <td colSpan={3}>Lain-Lain *)</td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}>10.000</td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{textAlign: "center"}}>Total</td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end", borderTop: "1px solid #000000"}}>1.705.000</td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td colSpan={2} style={{textAlign: "left"}}>TOTAL GAJI DITERIMA :</td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end"}}></td>
                        <td style={{textAlign: "end", border: "1px solid #000000"}}>1.613.000</td>
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