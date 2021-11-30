import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const postAxios = async (option: AxiosRequestConfig): Promise<AxiosResponse<any>> => {
    try {
        return await axios.post(option.url!, option.data, option)
    } catch (err) {
        alert(err);
        throw err;
    }
}

export const getAxios = async <T>(option: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    try {
        return await axios.get(option.url!, option);
    } catch (err) {
        alert(err);
        throw err;
    }
}

export const putAxios = async (option: AxiosRequestConfig): Promise<AxiosResponse<any>> => {
    try {
        return await axios.put(option.url!, option.data, option);
    } catch (err) {
        alert(err);
        throw err;
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