import axios, { AxiosInstance } from 'axios';

interface AxiosApiConfig {
  baseURL: string;
  withCredentials?: boolean;
  // Add any additional configuration options here
}

const axiosApi: AxiosInstance = axios.create({
  baseURL: 'http://51.20.6.206',
  withCredentials: true
} as AxiosApiConfig);

export default axiosApi;
