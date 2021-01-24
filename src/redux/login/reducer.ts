import { LOGIN_SUCCESS, LOGIN_FAILURE } from './constants';
import { ModifyAction } from './actions';

export interface StoreState {
  user: {}; // 用户信息
  token: string; // 用来登录验证的token
  isLogin: boolean; // 是否是登录状态
  msg: string; // 登录失败，服务器返回的错误信息
}

const defaultState: StoreState = {
  user: {},
  token: '',
  isLogin: false,
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
    default:
      return state;
  }
};

export default loginReducer;
