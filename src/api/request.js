import axios from 'axios'

let dev = process.env.NODE_ENV, BASE_API;

BASE_API = 'http://192.168.2.144:8888';

const request = axios.create({
  baseURL: BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
request.interceptors.request.use(config => {
  // Do something before request is sent
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
request.interceptors.response.use(
  response =>{
    if (response.data && response.data.code === 100) {
      return response.data.data;
    }
    console.log(new Error(response.data.code + response.data.msg))// for debug
  } ,
  error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)

export default request
