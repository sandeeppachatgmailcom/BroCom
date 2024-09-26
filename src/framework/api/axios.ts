import axios, { AxiosInstance } from 'axios';

interface AxiosApiConfig {
  baseURL: string;
  withCredentials?: boolean;
  // Add any additional configuration options here
}

const axiosApi: AxiosInstance = axios.create({
  // baseURL: 'https://sandeeppachat.xyz',
   baseURL: 'https://growcom-1.onrender.com',
  withCredentials: true
} as AxiosApiConfig);

export default axiosApi;
