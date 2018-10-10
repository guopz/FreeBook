import axios from 'axios'
import NProgress from 'nprogress'
import router from '../router'

let dev = process.env.NODE_ENV, BASE_API;

console.log(dev);
if (dev === 'development') {
  BASE_API = 'http://192.168.2.144:8888';
  // BASE_API = 'http://140.143.136.44';
} else {
  BASE_API = 'http://140.143.136.44';
};

const request = axios.create({
  baseURL: BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
request.interceptors.request.use(config => {
  // Do something before request is sent
  // NProgress.start();
  return config
}, error => {
  // Do something with request error
  console.log('request ' + error) // for debug
  return Promise.reject(error)
})

// respone拦截器
request.interceptors.response.use(
  response =>{
    // NProgress.done();
    if (response.data && response.data.code === 100) {
      return response.data.data;
    }
    console.log(new Error(response.data.code + response.data.msg))// for debug
  } ,
  error => {
    alert('该章节暂时不能查看');
    router.push({ name: 'free'})
    console.log('response ' + error)// for debug
    return Promise.reject(error)
  }
)

export default request
