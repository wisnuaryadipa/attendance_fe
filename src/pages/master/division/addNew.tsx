import react, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import axios, {AxiosRequestConfig} from 'axios';
import Typography from '@mui/material/Typography';
import IDivision, { IBaseDivision } from '@src/interfaces/response/IDivision';
import {postAxios} from '@services/axios';
import {Panel, PanelBody, PanelHeader, PanelFooter} from '@components/panel';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const ResultComponent = (props: any) => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({} as Partial<IDivision>);

    useEffect( () => {
        const loadAsync = async () => {

            setLoading(false)
        }
        loadAsync();
    }, [loading])
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: String) => {
        setData({...data, [name as keyof typeof data]: event.target.value})
    };

    const addDivision = async (data: URLSearchParams) => {
        const axiosOption: AxiosRequestConfig = {
            url: `http://localhost:3001/api/master/division/add`,
            data: data,
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
        console.log(data)
        await saveData(axiosOption);
    }

    const saveData = async (option: AxiosRequestConfig) => {
        const response = await postAxios(option);
        setData({});
        return response;
    }
    
    const doSubmitForm = async ()  => {
        setLoading(true);
        const dataSend = new URLSearchParams();
        for ( const propKey in Object.keys(data)) {
            const key = propKey as keyof IBaseDivision;
            const keyString = key.toString();
            if(data[key] !== null && keyString === "positions"){
                dataSend.append(key, data[key]!.toString())
            }
        }
        await addDivision(dataSend);
    }

    return (
        <Panel>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <PanelHeader>
                <Typography 
                className="titleForm" 
                variant='h5'>
                    Create New Division
                </Typography>
                <div className="actionForm"></div>
            </PanelHeader>
            <PanelBody>
                <Grid container>  
                    <Grid item lg={6} sm={12}>
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                            required
                            id="name"
                            key="name"
                            label="Division Name"
                            onChange={(e)=>{handleChange(e, "name")} }
                            className="text-input"
                            defaultValue={data.name}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                
            </PanelBody>
            <PanelFooter>
                <div className="text-information">Please fill out the form above. </div>
                <div className="actionForm">
                    <Button 
                    onClick={doSubmitForm}
                    variant="contained" 
                    style={{marginLeft: 15}}
                    color="success">
                    SUBMIT
                    </Button>
                </div>
            </PanelFooter>
        </Panel>
    )

}

export default ResultComponent