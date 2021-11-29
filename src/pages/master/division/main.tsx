import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import axios, {AxiosRequestConfig} from 'axios';
import Typography from '@mui/material/Typography';
import { getAxios } from '@services/axios';


export default function BasicTable() {

  
  const [divisions, setDivisions] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const axiosOption: AxiosRequestConfig = {
    url: 'http://localhost:3001/api/master/division/get-all',
    method: "GET",
  }

  useEffect(() => {
    const fetchDivisions = async () => {
        const response = await getAxios(axiosOption);
        setDivisions(response.data.data)
        console.log(response);
        setLoadingData(false);
    }

    fetchDivisions();
  }, [])


  const TableHeadlineStyled = styled.div`
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

    <TableContainer sx={{maxWidth:800}} component={Paper}>
        <TableHeadlineStyled>
            <Typography variant="h5">Division List</Typography>
            <div className="headline-action">
            <NavLink to="/" ></NavLink>
                
            </div>
        </TableHeadlineStyled>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="left">Division Name</TableCell>
                <TableCell align="right">Action</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {divisions.map((division:any) => (
                <TableRow
                key={division.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {division.id}
                </TableCell>
                <TableCell align="left">{division.name}</TableCell>
                <TableCell align="right"></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
  );
}