import { LOGIN_SUCCESS, LOGIN_FAILURE } from './constants';
import { getToken } from '../../services/login';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: any;
}

interface loginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: any;
}

export type ModifyAction = LoginSuccessAction | loginFailureAction;

const loginSuccessAction = (data: any): LoginSuccessAction => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

const loginFailureAction = (data: any): loginFailureAction => ({
  type: LOGIN_FAILURE,
  payload: data,
});

export const getLoginAction = (values: any): ThunkAction<void, RootState, unknown, ModifyAction> => async (dispatch, getState) => {
  const result: any = await getToken(values);
  const { status, data, msg } = result;
  if (status === 0) {
    const { token } = data;
    window.localStorage.setItem('token', token);
    dispatch(loginSuccessAction(data));
  } else if (status === 1) {
    dispatch(loginFailureAction(msg));
  }
};
