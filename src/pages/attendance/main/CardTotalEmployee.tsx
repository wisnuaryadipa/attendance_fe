import react from 'React';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box } from '@mui/system';


const TotalEmployee = () => {
    return (
        <Card>
            <Box sx={{display: 'flex'}}>
                <Box sx={{display: 'flex', alignItems: 'center', width: '100px' }}>
                    <AccountCircleIcon sx={{fontSize: "50pt !important", margin: '0px 10px'}}/>
                </Box>
                <CardContent sx={{paddingBottom: "0px !important", width: "100%"}} >
                    <Typography align='center' gutterBottom variant="h5" component="div">
                        Total Employee
                    </Typography>
                    <Typography align='center' minWidth="200px" sx={{fontSize: "25pt"}} >
                        300
                    </Typography>
                    <Typography 
                    gutterBottom variant="body2" 
                    color="text.secondary" 
                    component="div"
                    sx={{padding: "5px 0px", minHeight: "60px", height: "60px", textAlign:"center"}}
                    >
                        Number of Employee
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    )
}


export default TotalEmployee;