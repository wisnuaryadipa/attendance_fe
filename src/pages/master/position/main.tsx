import React, {useState, useEffect, MouseEvent} from 'react';
import {NavLink} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button'
import TableRow from '@mui/material/TableRow';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {getAxios, test} from '@services/axios'
import IPosition from '@interfaces/response/IPosition';
import IResponse from '@interfaces/response/IResponse';
import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import {Panel, PanelBody, PanelFooter, PanelHeader} from '@components/panel';

export default function MainPosition() {

    const navigate = useNavigate();
    const [loadingData, setLoadingData] = useState(true);
    const [positions, setPositions] = useState([] as Partial<IPosition[]>);
    


    useEffect(() => {
        const loadData = async () => {
            const resFetch = await fetchPositions();
            console.log(resFetch.data.data);
            setPositions(resFetch.data.data);
        }

        if (loadingData) {
            // if the result is not ready so you make the axios call
            loadData();
        }
    }, [])

    const fetchPositions = async () => {
        const axiosOption: AxiosRequestConfig = {
            url: 'http://localhost:3001/api/master/position/get-all',
            method: "GET",
        }
        
        const resFetch = await test<IResponse<IPosition[]>>(axiosOption);
        return resFetch;
    }

    const SearchBox = styled.div`
        display: flex;
    `;

    const clickToEdit = (e: MouseEvent<HTMLButtonElement>, id:number) => {
        navigate(`/master/position/${id}/edit`, {replace: false})
    }

    return (
        <Panel className="masterPosition wrapper">
            <PanelHeader>
                <Typography variant="h5">Position List</Typography>
                <SearchBox className="headline-action">
                    <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
                    >
                        <SearchIcon/>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder={`Search Position List`}
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />
                    </Paper>
                    <NavLink to="/master/position/create">
                        <Button 
                        variant="contained" 
                        style={{marginLeft: 15}}
                        color="success">
                            Add Position
                        </Button>
                    </NavLink>
                </SearchBox>
            </PanelHeader>
            <PanelBody>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Division</TableCell>
                        <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {positions.map((position:any) => (
                        <TableRow
                            key={position.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            {position.id}
                            </TableCell>
                            <TableCell align="left">{position.name}</TableCell>
                            <TableCell align="center">{position.division.name}</TableCell>
                            <TableCell align="center">
                                <NavLink to={`/master/position/${position.id}/edit`} replace={false} >
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
            </PanelBody>
            <PanelFooter>

            </PanelFooter>
        </Panel>
        
    );
}