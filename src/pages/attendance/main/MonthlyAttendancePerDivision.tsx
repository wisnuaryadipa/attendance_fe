import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import react, { HtmlHTMLAttributes } from 'react';
import moment from 'moment';
import { Panel, PanelBody, PanelHeader, PanelFooter } from '@src/components/panel';



const MonthlyAttendancePerDivision = () => {
    const monthYear = moment().month(10).year(2021);
    const daysInMonth = monthYear.daysInMonth();
    let rows = [];

    const TitleCellMonth = () => {

        let rows = [];

        for (let index = 1; index <= daysInMonth; index++) {
            rows.push(<TableCell sx={{color: "white"}} align="center">{index}</TableCell>)
        }

        return (<>{rows}</>)
    }

    
    const DumpCell = (props: HtmlHTMLAttributes<HTMLDivElement>) => {
        let rows = [];
        for (let index = 1; index <= daysInMonth; index++) {
            rows.push(<TableCell align="center" sx={{ border: "0px 1px"}} >{props.children}</TableCell>)
        }

        return (<>{rows}</>)
    }
    
    
    return(
        <Panel className="masterEmploye wrapper" sx={{margin: '0px'}}>
            <PanelHeader>
                <Typography variant="h5">Monthly Percentage Employee Attend by Division</Typography>
            </PanelHeader>
            <PanelBody>
                <Box component="div" sx={{overflowY: "auto"}}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{background: "black"}} >
                            <TableRow>
                            <TableCell sx={{color: "white"}}>No.</TableCell>
                            <TableCell sx={{color: "white"}} align="left">Division</TableCell>
                            <TitleCellMonth/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>Marketing</TableCell>
                                <DumpCell>30/40</DumpCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>2</TableCell>
                                <TableCell>Produksi</TableCell>
                                <DumpCell>160/200</DumpCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
                
            </PanelBody>
            <PanelFooter>

            </PanelFooter>
        </Panel>
    )
}

export default MonthlyAttendancePerDivision;