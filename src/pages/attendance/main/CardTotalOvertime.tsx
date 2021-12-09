import react from 'React';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { Box } from '@mui/system';


const TotalOvertime = () => {
    return (
        <Card>
            <Box sx={{display: 'flex'}}>
                <Box sx={{display: 'flex', alignItems: 'center', width: '100px' }}>
                    <AccessAlarmIcon sx={{fontSize: "50pt !important", margin: '0px 10px'}}/>
                </Box>
                <CardContent sx={{paddingBottom: "0px !important", width: "100%"}} >
                    <Typography align='center' gutterBottom variant="h5" component="div">
                        Total Overtime
                    </Typography>
                    <Typography align='center' minWidth="200px" sx={{fontSize: "25pt"}} >
                        5000 Hour
                    </Typography>
                    <Typography 
                        align='center' 
                        gutterBottom variant="body2" 
                        color="text.secondary" 
                        component="div"
                        sx={{padding: "5px 0px", minHeight: "60px", height: "60px"}}
                        
                        >
                        Total count of overtime by all employee
                    </Typography>
                </CardContent>
            </Box>
        </Card>
    )
}


export default TotalOvertime;