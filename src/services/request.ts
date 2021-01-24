import axios from 'axios';
import qs from 'querystring';
import store from '../redux/store';
import { BASE_URL, TIMEOUT } from './config';
import { message } from 'antd';
import { signOutAction } from '../redux/login/actions';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

// 请求拦截器
instance.interceptors.request.use(config => {
  const { method, data } = config;
  // 从redux中获取之前保存的token，放在请求头中
  const { token } = store.getState().login;
  if (token) config.headers.Authorization = 'atguigu_' + token;
  // 判断请求方式
  if (method?.toLowerCase() === 'post') {
    // 若传递过来的参数是对象
    if (data instanceof Object) {
      config.data = qs.stringify(data);
    }
  }
  return config;
});

// 响应拦截器
instance.interceptors.response.use(
  res => {
    // 请求成功
    return res.data;
  },
  err => {
    // 请求失败
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          console.log('请求错误');
          break;
        case 401:
          console.log('未授权访问');
          message.error('身份校验失败，请重新登录', 1);
          // token过期 调用store的dispatch 分发一个退出登录的action
          store.dispatch(signOutAction());
          break;
        default:
          console.log('其他错误信息');
      }
    }
    return err;
  }
);

export default instance;
