import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL: string | undefined = import.meta.env.VITE_BASE_API

const request = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  timeout: 15000
})
request.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'
request.defaults.headers.common['Authorization'] = Cookies.get('access_token') ? 'Bearer ' + Cookies.get('access_token') : ''

request.interceptors.request.use(request => {
  return request
})

request.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default request
