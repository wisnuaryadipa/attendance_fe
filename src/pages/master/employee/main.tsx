import React, {useState, useEffect, MouseEvent, KeyboardEvent, useRef, ChangeEvent} from 'react';
import {NavLink} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import TableRow from '@mui/material/TableRow';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';
import axios, { AxiosRequestConfig } from 'axios';
import {getAxios} from '@services/axios'
import IEmployee from '@interfaces/response/IEmployee';
import IResponse from '@interfaces/response/IResponse';
import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from 'react-router-dom';
import {Panel, PanelBody, PanelFooter, PanelHeader} from '@components/panel';
import qs from 'qs';

const SearchBox = (props: any) => {
    const [searchBox, setSearchBox] = useState("");
    const handleChangeSearch = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.value;
        setSearchBox(value);
    }
    return (
        <Paper
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
        >
            <SearchIcon/>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={`Search Emlpoyee List`}
                onChange={handleChangeSearch}
                onKeyDown={props.onSearch}
                defaultValue= {searchBox}
                value={searchBox}
            />
        </Paper>

    )
}

const RightActionBox = styled.div`
    display: flex;
`;
const ActionBox = styled(NavLink)`
    margin-right: 5px;
`


export default function MainEmployee() {

    const navigate = useNavigate();
    const [loadingData, setLoadingData] = useState(true);
    const [employees, setEmployees] = useState([] as Partial<IEmployee[]>);


    useEffect(() => {
        const loadData = async () => {
            await fetchEmployees();
        }

        if (loadingData) {
        // if the result is not ready so you make the axios call
            loadData();
        }
        console.log('reload')
    }, [])


    const fetchEmployees = async ({filter = undefined as any} = {}) => {
        setLoadingData(true);
        let _query = {}
        if (filter) {
            (filter.search) && (_query = {..._query, search: filter.search});
        }
        const query = qs.stringify(_query)
        const axiosOption: AxiosRequestConfig = {
            url: `${process.env.REACT_APP_URL_API}/api/master/employee/get-all?${query}`,
            method: "GET",
        }

        const resFetch = await getAxios<IResponse<IEmployee[]>>(axiosOption);
        setEmployees(resFetch.data.data);
        setLoadingData(false);
    }

    const clickToEdit = (e: MouseEvent<HTMLButtonElement>, id:number) => {
        navigate(`/master/employee/${id}/edit`, {replace: false})
    }
    

    const handleSearch = async (e: KeyboardEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        if(e.key === 'Enter') {
            const filter = {search: value}
            await fetchEmployees({filter})
        }
    }
    


    return (
        <Panel className="masterEmploye wrapper">
            <PanelHeader>
                <Typography variant="h5">Emlpoyee List</Typography>
                <RightActionBox className="headline-action">
                    <SearchBox onSearch={handleSearch}/>
                    <NavLink to="/master/employee/create">
                        <Button 
                        variant="contained" 
                        style={{marginLeft: 15}}
                        color="success">
                            Add Employee
                        </Button>
                    </NavLink>
                </RightActionBox>
            </PanelHeader>
            <PanelBody>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell>No.</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Position</TableCell>
                        <TableCell align="center">MachineId</TableCell>
                        <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(() => {
                            if (loadingData) {
                                return(<></>)
                            } else {
                                return(
                                    employees.map((employee:any) => (
                                        <TableRow 
                                            key={employee.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                            {employee.id}
                                            </TableCell>
                                            <TableCell align="left">{employee.name}</TableCell>
                                            <TableCell align="center">{employee.position ? employee.position.name : ""}</TableCell>
                                            <TableCell align="center">{employee.machineId}</TableCell>
                                            <TableCell align="center">
                                                <Box sx={{display: "inline-flex"}}>
                                                    <ActionBox to={`/master/employee/${employee.id}/edit`} replace={false} target="_blank" >
                                                        <Button 
                                                        variant='contained' 
                                                        color='info' sx={{minWidth: "40px !important", width: "40px"  }} >
                                                            <EditIcon sx={{width: '20px !important'}} />
                                                        </Button>
                                                    </ActionBox>
                                                    <ActionBox 
                                                    to={{ pathname:`/master/employee/${employee.id}`}} 
                                                    state={{data: employee}} 
                                                    replace={false}
                                                    target="_blank">
                                                        <Button 
                                                        variant='contained' 
                                                        color='info' sx={{minWidth: "40px !important", width: "40px"  }} >
                                                            <ArticleIcon sx={{width: '20px !important'}} />
                                                        </Button>
                                                    </ActionBox>
                                                    <Button 
                                                    variant='contained' 
                                                    color='error' sx={{minWidth: "40px !important", width: "40px"  }} >
                                                        <DeleteIcon sx={{width: '20px !important'}} />
                                                    </Button>
                                                </Box>
                                                
                                            </TableCell>
                                        </TableRow>
                                        ))
                                )
                            }
                        })()}
                        
                    </TableBody>
                </Table>
                <Box sx={{position: 'relative', alignSelf: 'center'}}>
                    
                    {(() => {
                        return ( loadingData ? <CircularProgress /> : <></> )
                    })()}
                </Box>
            </PanelBody>
            <PanelFooter>

            </PanelFooter>
        </Panel>
        
    );
}