import { LOGIN_SUCCESS, LOGIN_FAILURE, SIGN_OUT } from './constants';
import { ModifyAction } from './actions';

// 类型断言，localStorage.getItem('user')可能为null | string ，做一下断言
const user = JSON.parse(localStorage.getItem('user') as string);
const token = localStorage.getItem('token');

interface StoreState {
  user: {}; // 用户信息
  token: string; // 用来登录验证的token
  isLogin: boolean; // 是否是登录状态
  msg: string; // 登录失败，服务器返回的错误信息
}

const defaultState: StoreState = {
  user: user || '',
  token: token || '',
  isLogin: user && token ? true : false,
  msg: '',
};

const loginReducer = (state = defaultState, action: ModifyAction) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isLogin: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        msg: action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        user: '',
        token: '',
        isLogin: false,
      };
    default:
      return state;
  }
};

export default loginReducer;
