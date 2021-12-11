import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export const postAxios = async (option: AxiosRequestConfig): Promise<AxiosResponse<any>> => {
    try {
        const result = await axios.post(option.url!, option.data, option);
        // alert("Input Data Success !");
        return result
    } catch (err) {
        alert(err);
        if (axios.isAxiosError(err)){
            const result = err.response!
            return result;
        } else {
            throw err;
        }
    }
}

export const getAxios = async <T>(option: AxiosRequestConfig) => {
    const data = await axios.get(option.url!, option).catch(err => { alert(err) }) as AxiosResponse<T>;
    return data;
}

export const putAxios = async <T>(option: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    try {
        const result = await axios.put(option.url!, option.data, option);
        alert("Input Data Success !");
        return result;
    } catch (err) {
        alert(err);
        if (axios.isAxiosError(err)){
            const result = err.response!
            return result;
        } else {
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