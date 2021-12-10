import react, { HtmlHTMLAttributes } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import IEmployee from 'src/interfaces/response/IEmployee';
import WorkIcon from '@mui/icons-material/Work';
import ContactsIcon from '@mui/icons-material/Contacts';
import EmailIcon from '@mui/icons-material/Email';
import UnknownPerson from '@src/static/img/UnknownPerson.png';
import styled from 'styled-components';

interface Props extends HTMLDivElement {
    data?: IEmployee
}

const ContainerBox = styled(Box)`
    padding: 25px 20px;
    display: flex;
`


const BasicInformation = (props: HtmlHTMLAttributes<Props>) => {

    return (
        <Container component={Paper} elevation={1}>
            <ContainerBox>
                <Box>
                    <Container>

                    <img src={UnknownPerson} style={{ width: "150px", height: "150px", borderRadius: "5px" }} alt="" />
                    </Container>
                </Box>
                
                <Box sx={{width: '100%', display: 'flex', justifyContent: "space-between"}}>
                    <Box>
                        <Typography variant='h5' sx={{marginBottom: "5px"}}>Mukorobin</Typography>
                        <Box sx={{display: "flex", maxWidth: "600px", marginBottom: "2px", color: "#00000054"}} >
                            <Box sx={{marginRight: '1.25rem', display:"flex", flexDirection:"row", color: "#00000054", alignItems: "center" }}>
                                <WorkIcon sx={{fontSize: "16px !important", marginRight: "3px"}}></WorkIcon>
                                <Typography variant='body1' >Position</Typography>
                            </Box>
                        </Box>
                        <Box sx={{display: "flex", marginBottom: "5px", color: "#00000054"}}>
                            
                            <Box sx={{marginRight: '1.25rem', display:"flex", flexDirection:"row", alignItems: "center" }}>
                                <ContactsIcon sx={{fontSize: "16px !important", marginRight: "3px"}}></ContactsIcon>
                                <Typography variant='body1'  >Contact Number</Typography>
                            </Box>
                            <Box sx={{marginRight: '1.25rem', display:"flex", flexDirection:"row", alignItems: "center" }}>
                                <EmailIcon sx={{fontSize: "16px !important", marginRight: "3px"}} ></EmailIcon>
                                <Typography variant='body1' >Email</Typography>
                            </Box>
                        </Box>
                        <Box sx={{color: "#00000054"}} >
                            <Typography variant='body1' >Address</Typography>
                        </Box>

                    </Box>
                    <Box sx={{display: "flex", flexDirection: "column", border: "1px solid #d9d9d9", padding: "10px", borderRadius: "6px"}}>
                        <Box>
                            <Typography variant='body1'>Machine ID</Typography>
                        </Box>
                        <Box sx={{flexGrow: "1", display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Typography variant='h3'>1</Typography>
                        </Box>
                    </Box>
                </Box>


            </ContainerBox>
        </Container>
    )

}

export default BasicInformation;