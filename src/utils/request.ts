import axios, { AxiosError } from 'axios';

const request = axios.create({
    baseURL: '/api',
    timeout: 5000,
});

request.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
});

request.interceptors.response.use(response => {
    return response.data;
}, error => {
    const axiosError = error as AxiosError<{ message: string }>;
    const errorMessage = axiosError.response?.data?.message || '请求失败，请稍后再试';
    console.error('请求错误:', errorMessage);
    return Promise.reject(errorMessage); // 返回错误信息
});

export default request;