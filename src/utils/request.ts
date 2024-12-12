// 封装 axios，用于发送请求
import axios from 'axios'
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { Toast } from 'bootstrap'

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: 'https://10.252.252.252',
  timeout: 5000,
})

// 请求拦截器
