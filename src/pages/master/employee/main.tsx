import React, {useState, useEffect, MouseEvent} from 'react';
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
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {getAxios, test} from '@services/axios'
import IEmployee from '@interfaces/response/IEmployee';
import IResponse from '@interfaces/response/IResponse';
import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import {Panel, PanelBody, PanelFooter, PanelHeader} from '@components/panel'



export default function BasicTable() {

    const navigate = useNavigate();
    const [loadingData, setLoadingData] = useState(true);
    const [employees, setEmployees] = useState([] as Partial<IEmployee[]>);
    const axiosOption: AxiosRequestConfig = {
        url: 'http://localhost:3001/api/master/employee/get-all',
        method: "GET",
    }


    useEffect(() => {
        const loadData = async () => {
            const resFetch = await test<IResponse<IEmployee[]>>(axiosOption);
            setEmployees(resFetch.data.data);
        }

        if (loadingData) {
        // if the result is not ready so you make the axios call
        loadData();
        }
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

    const clickToEdit = (e: MouseEvent<HTMLButtonElement>, id:number) => {
        navigate(`/master/employee/${id}/edit`, {replace: false})
    }

    return (
        <div className="masterEmploye wrapper">
        <TableContainer sx={{maxWidth:800, marginBottom:'40px'}} component={Paper}>
            <TableHeadlineStyled>
                <Typography variant="h5">Emlpoyee List</Typography>
                <div className="headline-action">
                <div className="searchBox">
                    <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
                    >
                    <SearchIcon/>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder={`Search Emlpoyee List`}
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
            </TableHeadlineStyled>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="center">MachineId</TableCell>
                <TableCell align="center">Action</TableCell>
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
                    <TableCell align="center">
                        <NavLink to={`/master/employee/${employee.id}/edit`} replace={false} >
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
        </div>
        
    );
}