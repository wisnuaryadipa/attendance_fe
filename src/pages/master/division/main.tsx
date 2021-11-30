import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import styled from 'styled-components';
import axios, {AxiosRequestConfig} from 'axios';
import Typography from '@mui/material/Typography';
import { getAxios } from '@services/axios';
import EditIcon from '@mui/icons-material/Edit';
import IResponse from '@interfaces/response/IResponse';
import IDivision from '@interfaces/response/IDivision';


export default function BasicTable() {

  
  const [divisions, setDivisions] = useState([] as Partial<IDivision[]>);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const loadData = async () => {
        const response = await fetchDivisions();
        setDivisions(response.data.data)
        console.log(response);
        setLoadingData(false);
    }
    loadData();
  }, [])
  
  const fetchDivisions = async () => {
    const axiosOption: AxiosRequestConfig = {
      url: 'http://localhost:3001/api/master/division/get-all',
      method: "GET",
    }
    const response = await getAxios<IResponse<IDivision[]>>(axiosOption);
    return response;
  }


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
                <div className="searchBox">
                  <Paper
                  component="form"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
                  >
                  <SearchIcon/>
                  <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder={`Search Division List`}
                      inputProps={{ 'aria-label': 'search google maps' }}
                  />
                  </Paper>
                  <NavLink to="/master/division/create">
                    <Button 
                    variant="contained" 
                    style={{marginLeft: 15}}
                    color="success">
                        Add Division
                    </Button>
                  </NavLink>
                </div>
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
                <TableCell align="right">
                  <NavLink to={`/master/division/${division.id}/edit`} replace={false} >
                      <Button 
                      variant='contained' 
                      color='info' sx={{minWidth: "40px !important", width: "40px"  }} >
                          <EditIcon sx={{width: '20px !important'}} />
                      </Button>
                  </NavLink>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
  );
}