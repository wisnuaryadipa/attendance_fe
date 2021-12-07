import react, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import axios, {AxiosRequestConfig} from 'axios';
import Typography from '@mui/material/Typography';
import IPosition from 'src/interfaces/response/IPosition';
import {postAxios} from '@services/axios';
import {Panel, PanelBody, PanelHeader, PanelFooter} from '@components/panel';


const PositionAdd = (props: any) => {

    const [data, setData] = useState({} as Partial<IPosition>);
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: String) => {
        setData({...data, [name as keyof typeof data]: event.target.value})
    };

    const saveData = async (option: AxiosRequestConfig) => {
        const response = await postAxios(option)
        console.log(response);
        alert("Input Data Success !");
    }
    
    const doSubmitForm = async (e:any)  => {
        if(data.name ) {
            const url = "http://localhost:3001/api/master/position/add";
            const bodyFormData = new URLSearchParams();
            bodyFormData.append('name', data.name);
            const axiosOption: AxiosRequestConfig = {
                url: url,
                data: bodyFormData,
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }
            console.log(data)
            await saveData(axiosOption);
        } else {
            alert("Please fill all required input form !");
        }
    }

    return (
        <Panel>
            <PanelHeader>
                <Typography 
                className="titleForm" 
                variant='h5'>
                    Create New Position
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
                            label="Position Name"
                            onChange={(e)=>{handleChange(e, "name")} }
                            className="text-input"
                            defaultValue={data.name}
                            />
                        </FormControl>
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                            required
                            id="basicSalary"
                            key="basicSalary"
                            label="Basic Salary"
                            onChange={(e)=>{handleChange(e, "basicSalary")} }
                            className="text-input"
                            defaultValue={data.basicSalary}
                            />
                        </FormControl>
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                            required
                            id="wagePerHour"
                            key="wagePerHour"
                            label="Wage Per Hour"
                            onChange={(e)=>{handleChange(e, "wagePerHour")} }
                            className="text-input"
                            defaultValue={data.wagePerHour}
                            />
                        </FormControl>
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                            required
                            id="overtimeWagePerHour"
                            key="overtimeWagePerHour"
                            label="Overtime Wage Per Hour"
                            onChange={(e)=>{handleChange(e, "overtimeWagePerHour")} }
                            className="text-input"
                            defaultValue={data.overtimeWagePerHour}
                            />
                        </FormControl>
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                            required
                            id="defaultWorkingHour"
                            key="defaultWorkingHour"
                            label="Default Working Hour"
                            onChange={(e)=>{handleChange(e, "defaultWorkingHour")} }
                            className="text-input"
                            defaultValue={data.defaultWorkingHour}
                            />
                        </FormControl>
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                            required
                            id="description"
                            key="description"
                            label="Description"
                            onChange={(e)=>{handleChange(e, "description")} }
                            className="text-input"
                            defaultValue={data.description}
                            />
                        </FormControl>
                        <FormControl fullWidth variant='filled' required>
                            <TextField
                            required
                            id="divisionId"
                            key="divisionId"
                            label="Division"
                            onChange={(e)=>{handleChange(e, "divisionId")} }
                            className="text-input"
                            defaultValue={data.divisionId}
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

export default PositionAdd