import {NavLink} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const result = (props: any) => {

    const employees = props.data;

    return (
        
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="center">MachineId</TableCell>
                <TableCell align="right">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {employees.map((employee:any) => (
                <TableRow
                    key={employee.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                    {employee.id}
                    </TableCell>
                    <TableCell align="left">{employee.name}</TableCell>
                    <TableCell align="center">{employee.machineId}</TableCell>
                <TableCell align="right"></TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default result;