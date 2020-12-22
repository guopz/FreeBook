import axios from 'axios';
import router from '../router';
import qs from 'qs';
class Http {
  private service: any = null;
  constructor(url?: string) {
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    this.service = axios.create({
      baseURL: url ? url : '/api/',
      timeout: 5000
    });
    this.service.interceptors.request.use((config: { data: any; }) => {
      config.data = qs.stringify(config.data);
      return config;
    }, (error: any) => Promise.reject(error));
    // 过滤业务Code
    let filterCode = [100, 200];
    this.service.interceptors.response.use((response: { status: number; data: { code: number, data: any, msg: string}; }) => {
      // console.log('返回参数 ==>', response);
      if (response.status === 200) {
        if (!response.data.code || filterCode.includes(response.data.code)) {
          return Promise.resolve(response.data.data || true);
        } else {
          return Promise.reject(response);
        }
      }
    }, (error: any) => {
      alert('该章节暂时不能查看');
      router.push({ name: 'free' })
      console.log('response ' + error)// for debug
      return Promise.reject(error)
    });
  }
  public get(url: string, params: any = {}) {
    return this.service.get(`${url}`, params);
  }
  public post(url: string, data: any = {}, config: any = {}) {
    return this.service.post(`${url}`, data, config);
  }
}
export default Http;
