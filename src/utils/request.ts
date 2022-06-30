import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { AUTHORIZATION}  from '@/utils/storage-vars'
import { ElMessage, ElMessageBox } from 'element-plus'

const request: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 1000 * 30 // 30秒超时
})
const errorHandler = (error: any) => {
  const response = error.response
  const data = response.data
  if (error.response) {
    const status = response.status
    if (status === 401) {
      // 登录过期
      ElMessageBox({
        title: '提示',
        message: '登录过期，请重新登录',
        showCancelButton: false,
        showClose: false,
        confirmButtonText: '确认',
        closeOnClickModal: false
      }).then(() => {
        // TODO 退出重新登录
        console.log('ok')
      }).catch(() => {
        console.log('cancel')
      })
    } else {
      ElMessage({
        message: data.msg || data.message || '服务器异常',
        type: 'error'
      })
    }
  }
  return Promise.reject(data)
}

request.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = localStorage.getItem(AUTHORIZATION)
  if (token) {
    config.headers = config.headers || {}
    config.headers.authorization = 'Bearer ' + token
  }
  return config
}, errorHandler)

request.interceptors.response.use(response => {
  const res = response.data
  // 返回类型为文件流的处理
  // if (response.config.responseType === 'blob') {}
  if (res.code !== 200 || !res.success) {
    ElMessage({
      message: res.msg || res.message || '服务器异常',
      type: 'error'
    })
    return Promise.reject(res)
  }
  return res
}, errorHandler)

export default request
