import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const postAxios = async (option: AxiosRequestConfig): Promise<AxiosResponse<any>> => {
    try {
        return await axios.post(option.url!, option.data, option)
    } catch (err) {
        alert(err);
        throw err;
    }
}

export const getAxios = async (option: AxiosRequestConfig): Promise<AxiosResponse<any>> => {
    try {
        return await axios.get(option.url!, option);
    } catch (err) {
        alert(err);
        throw err;
    }
}

export const putAxios = async (option: AxiosRequestConfig): Promise<AxiosResponse<any>> => {
    try {
        return await axios.put(option.url!, option);
    } catch (err) {
        alert(err);
        throw err;
    }
}

const axiosServices = {
    postAxios,
    getAxios,
    putAxios
}

export default axiosServices;