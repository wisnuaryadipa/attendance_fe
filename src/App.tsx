import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Sidebar from '@containers/sidebar';
import MainBar from '@containers/mainbar';
import ProTip from './ProTip';
import Router from '@routers/index'


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  return (
    <Container style={{display: "flex"}} maxWidth={false} >
      <Router/>
    </Container>
  );
}
