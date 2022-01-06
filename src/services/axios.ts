import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export const postAxios = async (option: AxiosRequestConfig): Promise<AxiosResponse<any>> => {
    try {
        const result = await axios.post(option.url!, option.data, option);
        return result
    } catch (err) {
        if (axios.isAxiosError(err)){
            alert(err.response?.data.message);
            const result = err.response!
            throw result;
        } else {
            alert(err);
            throw err;
        }
    }
}

export const getAxios = async <T>(option: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    
    try {

        const data = await axios.get(option.url!, option).catch(err => { alert(err) }) as AxiosResponse<T>;
        return data;
        
    } catch (err) {
        if (axios.isAxiosError(err)){
            alert(err.response);
            const result = err.response!
            return result;
        } else {
            alert(err);
            throw err;
        }
    }
}

export const putAxios = async <T>(option: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    try {
        const result = await axios.put(option.url!, option.data, option);
        alert("Input Data Success !");
        return result;
    } catch (err) {
        if (axios.isAxiosError(err)){
            alert(err.response);
            const result = err.response!
            return result;
        } else {
            alert(err);
            throw err;
        }
    }
}

export async function test<T>(option: AxiosRequestConfig) {
    try {
        return await axios.get(option.url!, option) as AxiosResponse<T>;
    } catch (err) {
        alert(err);
        throw err;
    }
}

const axiosServices = {
    postAxios,
    getAxios,
    test,
    putAxios
}

export default axiosServices;