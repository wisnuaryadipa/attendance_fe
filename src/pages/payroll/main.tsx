import react, {useState, useRef} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Panel, PanelHeader, PanelBody, PanelFooter} from '@components/panel';
import FormInput from './formInput';
import {getAxios, postAxios, putAxios} from '@services/axios'
import { IBasePayroll, IPayroll } from '@src/interfaces/response/IPayroll';
import {useParams} from 'react-router-dom';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import moment from 'moment';
import IResponse from '@src/interfaces/response/IResponse';
import IEmployee from '@src/interfaces/response/IEmployee';
import qs from 'qs';
import {monthId} from '@src/static/common';

interface IMonthYear {
    month: number,
    year: number,
}

const Payroll = () => {

    const monthNow = moment().format('M');
    const yearNow = moment().format("YYYY");
    const initMonthYear = {
        month: parseInt(monthNow), 
        year: parseInt(yearNow)
    } as IMonthYear
    const [monthYear, setMonthYear] = useState(initMonthYear);
    const refInputData = useRef({} as Partial<IPayroll>);
    const {employeeId} = useParams();
    const refLoading = useRef(false);

    const updateInputData = (val:any) => {
        refInputData.current = val;
    }

    const doCheckPayrollIsExist = async (employeeId: string, month: number, year: number) => {
        let result = false;
        const queryString = qs.stringify({month: month, year: year}, { indices: false });
        const axiosOption: AxiosRequestConfig = {
            url: `http://localhost:3001/api/payroll/${employeeId}?${queryString}`,
            method: "GET",
        }
        const resResult = await getAxios<IResponse<IEmployee>>(axiosOption)
        console.log(resResult)
        resResult.data.data.payrolls.length > 0 ? result = true : result = false;
        return result;
    }

    const doSubmitData = async () => {
        let result: AxiosResponse

        const isPayrollExist = await doCheckPayrollIsExist(employeeId!, monthYear.month, monthYear.year)
        isPayrollExist ? result = await putInputData() : result = await postInputData();
        
        if (result.status === 201) {
            alert(`Success saved`);
        } else {
            alert(`Failed saved`);
        }
    }

    const addPayrollData = async (data: URLSearchParams) => {
        const axiosOption: AxiosRequestConfig = {
            url: `http://localhost:3001/api/payroll/${employeeId}`,
            data: data,
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
        const result = await postAxios(axiosOption);
        return result;
    }

    const updatePayrollData = async (data: URLSearchParams) => {
        const axiosOption: AxiosRequestConfig = {
            url: `http://localhost:3001/api/payroll/${employeeId}/${monthYear.year}/${monthYear.month}`,
            data: data,
            method: "PUT",
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
        const result = await putAxios(axiosOption);
        return result;
    }

    const postInputData = async () => {
        refLoading.current = true;
        const dataSend = new URLSearchParams();
        for (const propKey of Object.keys(refInputData.current)) {
            const key = propKey as keyof IBasePayroll;
            const ketString = key.toString();
            if(refInputData.current[key] !== null && ketString !== 'employee' && ketString !== 'division'){
                dataSend.append(propKey, refInputData.current[key]!.toString());
            }
        }
        
        dataSend.append('month', monthYear.month.toString());
        dataSend.append('year', monthYear.year.toString());
        dataSend.append('employeeId', employeeId!.toString());

        const result = await addPayrollData(dataSend);
        refLoading.current = false;
        return result;
    }

    const putInputData = async () => {
        
        refLoading.current = true;
        const dataSend = new URLSearchParams();
        for (const propKey of Object.keys(refInputData.current)) {
            const key = propKey as keyof IBasePayroll;
            const ketString = key.toString();
            if(refInputData.current[key] !== null && ketString !== 'employee' && ketString !== 'division'){
                dataSend.append(propKey, refInputData.current[key]!.toString());
            }
        }

        const result = await updatePayrollData(dataSend);
        refLoading.current = false;
        return result;
    }


    return (
        <Panel>
            <PanelHeader>
                <Box>
                    <Typography variant='h5'>Form Print Payroll</Typography>
                </Box>
                <Box>
                    <Typography variant='h5'>{monthId[monthYear.month-1].toUpperCase()} / {monthYear.year}</Typography>
                </Box>
            </PanelHeader>
            <PanelBody>
                
                <FormInput inputData={updateInputData} ></FormInput>
            </PanelBody>
            <PanelFooter>
                <div className="text-information">Please fill out the form above. </div>
                <div className="actionForm">
                    <Button 
                    variant="contained" 
                    style={{marginLeft: 15}}
                    color="success"
                    disabled={refLoading.current} 
                    onClick={doSubmitData} >
                        Submit
                    </Button>
                </div>
            </PanelFooter>
        </Panel>
    )
}

export default Payroll;