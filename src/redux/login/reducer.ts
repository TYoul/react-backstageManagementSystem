import { LOGIN_SUCCESS, LOGIN_FAILURE } from './constants';
import { ModifyAction } from './actions';

export interface StoreState {
  user: {};
  token: string;
  isLogin: boolean;
  msg: string;
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
