import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Panel, PanelHeader, PanelBody, PanelFooter} from '@components/panel'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import styled from 'styled-components';
import axios, {AxiosRequestConfig} from 'axios';
import Typography from '@mui/material/Typography';
import { getAxios } from '@services/axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IResponse from '@interfaces/response/IResponse';
import IDivision from '@interfaces/response/IDivision';


export default function BasicTable() {

  
  const [divisions, setDivisions] = useState([] as Partial<IDivision[]>);

  useEffect(() => {
    const loadData = async () => {
        const response = await fetchDivisions();
        setDivisions(response.data.data)
        console.log(response);
    }
    loadData();
  }, [])
  
  const fetchDivisions = async () => {
    const axiosOption: AxiosRequestConfig = {
      url: `${process.env.REACT_APP_URL_API}/api/master/division/get-all`,
      method: "GET",
    }
    const response = await getAxios<IResponse<IDivision[]>>(axiosOption);
    return response;
  }



  const HeaderAction = styled.div`
    display: flex;
  `


  
  return (

    <Panel>
      <PanelHeader>
        <Typography variant="h5">Division List</Typography>
            
        <HeaderAction>
          {/* <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
          >
          <SearchIcon/>
          <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={`Search Division List`}
              inputProps={{ 'aria-label': 'search google maps' }}
          />
          </Paper> */}
          <NavLink to="/master/division/create">
            <Button 
            variant="contained" 
            style={{marginLeft: 15}}
            color="success">
                Add Division
            </Button>
          </NavLink>
        </HeaderAction>
      </PanelHeader>
      <PanelBody>
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
                  <Box sx={{display: "inline-flex"}}>
                    <NavLink to={`/master/division/${division.id}/edit`} replace={false} >
                        <Button 
                        variant='contained' 
                        color='info' sx={{minWidth: "40px !important", width: "40px"  }} >
                            <EditIcon sx={{width: '20px !important'}} />
                        </Button>
                    </NavLink>
                    <Button 
                    variant='contained' 
                    color='error' sx={{minWidth: "40px !important", width: "40px"  }} >
                        <DeleteIcon sx={{width: '20px !important'}} />
                    </Button>
                  </Box>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
      </PanelBody>
      <PanelFooter>

      </PanelFooter>
    </Panel>
  );
}