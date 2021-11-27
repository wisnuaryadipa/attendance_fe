import React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';


export default function BasicTable() {

  
  const [divisions, setDivisions] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchDivisions = async () => {
      await axios.get('http://localhost:3001/api/master/division/get-all')
      .then(function (response) {
          setDivisions(response.data.data)
          console.log(response);
          setLoadingData(false);
      })
      .catch(function (error) {
          
          console.log(error);
      });
  
      console.log("tes");
    }

    fetchDivisions();
  }, [])

  
  return (

    <TableContainer sx={{maxWidth:800}} component={Paper}>
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