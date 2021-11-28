import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button'
import TableRow from '@mui/material/TableRow';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import axios from 'axios';


export default function BasicTable() {

  const [loadingData, setLoadingData] = useState(true);
  const [employees, setEmployees] = useState([]);


  useEffect(() => {
    const fetchEmployees = async () => {
      await axios.get('http://localhost:3001/api/master/employee/get-all')
      .then(function (response) {
        setEmployees(response.data.data)
        console.log(response);
        setLoadingData(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    }

    if (loadingData) {
      // if the result is not ready so you make the axios call
      fetchEmployees();
    }
  }, [])

  const TableHeadline = (props: any) => (
    <div className={`table-title ${props.className}`}>
          <div className="headline">{props.title}</div>
          <div className="headline-action">
            <div className="searchBox">
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
              >
                <SearchIcon/>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder={`Search ${props.title}`}
                  inputProps={{ 'aria-label': 'search google maps' }}
                />
              </Paper>
              <NavLink to="/master/employee/create">
                <Button 
                variant="contained" 
                style={{marginLeft: 15}}
                color="success">
                  Add Employee
                </Button>
              </NavLink>
              
            </div>
              
          </div>
        </div>
  );


  const TableHeadlineStyled = styled(TableHeadline)`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #bbbbbb;

    .headline-action{
      display: flex;

    }
    .searchBox {
      display: flex;

    }
  `;

  return (
    <div className="masterEmploye wrapper">
      <TableContainer sx={{maxWidth:800, marginBottom:'40px'}} component={Paper}>
        <TableHeadlineStyled
        title="Emlpoyee List"/>
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
      </TableContainer>
    </div>
    
  );
}