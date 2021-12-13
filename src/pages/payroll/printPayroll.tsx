import React from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';

const PrintArea = styled(Box)`

    position: absolute;
    left: 0;
    top: 0;
    background-color: #ffffff;
    width:  21.0cm;
    height: 29.7cm;
    border: 1px solid #000000;

`

const PrintLayoutPayroll = () => {
    return (

        <PrintArea>
            <Box>
                Slip Gaji
            </Box>
            <Box sx={{borderBottom: "1px solid #000000"}}>
                PT. XYZ
            </Box>
            <Box>
                
                <Box sx={{borderBottom: "1px solid #000000", display: "flex", flexDirection: "column"}}>
                    <Box sx={{display: "flex", justifyContent: "start", maxWidth: "10cm"}}>
                        <div style={{minWidth: "3.5cm", maxWidth: "3.5cm"}}>Nama</div>
                        <div style={{width: "0.5cm"}}>:</div>
                        <div>John Martijo</div>
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "space-between", maxWidth: "10cm"}}>
                        <div style={{minWidth: "3.5cm", maxWidth: "3.5cm"}}>No. Absen</div>
                        <div style={{width: "0.5cm"}}>:</div>
                        <div>0001</div>
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "space-between", maxWidth: "10cm"}}>
                        <div style={{minWidth: "3.5cm", maxWidth: "3.5cm"}}>Periode</div>
                        <div style={{width: "0.5cm"}}>:</div>
                        <div>1-30 Juni 2021</div>
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "space-between", maxWidth: "10cm"}}>
                        <div style={{minWidth: "3.5cm", maxWidth: "3.5cm"}}>Tanggal</div>
                        <div style={{width: "0.5cm"}}>:</div>
                        <div>1 Juli 2021</div>
                    </Box>
                    <Box sx={{display: "flex", justifyContent: "space-between", maxWidth: "10cm"}}>
                        <div style={{minWidth: "3.5cm", maxWidth: "3.5cm"}}>Jabatan</div>
                        <div style={{width: "0.5cm"}}>:</div>
                        <div>Operator</div>
                    </Box>
                </Box>
            </Box>

        </PrintArea>

    )
}

export default PrintLayoutPayroll;