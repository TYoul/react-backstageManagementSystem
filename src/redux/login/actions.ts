import { LOGIN_SUCCESS, LOGIN_FAILURE, SIGN_OUT } from './constants';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { getToken } from '../../services/login';

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: any;
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: any;
}

interface SignOutAction {
  type: typeof SIGN_OUT;
}

export type ModifyAction = LoginSuccessAction | LoginFailureAction | SignOutAction;

// 登录成功的action
const loginSuccessAction = (data: any): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

// 登录失败的action
const loginFailureAction = (data: any): LoginFailureAction => ({
  type: LOGIN_FAILURE,
  payload: data,
});

// 由登录页面发出dispatch对应的action，在这个action里面发送对应登录的网络请求
export const getLoginAction = (values: any): ThunkAction<void, RootState, unknown, ModifyAction> => async (dispatch, getState) => {
  const result: any = await getToken(values);
  const { status, data, msg } = result;
  if (status === 0) {
    const { token, user } = data;
    // 将有关登录的信息放到localStorage中
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch(loginSuccessAction(data));
  } else if (status === 1) {
    dispatch(loginFailureAction(msg));
  }
};

export const signOutAction = (): SignOutAction => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  return {
    type: SIGN_OUT,
  };
};
