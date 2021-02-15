import { GETROLELIST, MANAGEROLEADD, SETUPAUTHORITY } from "./constants";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import {
  getRoleList,
  manageRoleAdd,
  manageRoleUpdate,
} from "../../services/role";
import { message } from "antd";

interface getRoleListAction {
  type: typeof GETROLELIST;
  payload: any;
}

interface manageRoleAddAction {
  type: typeof MANAGEROLEADD;
  payload: any;
}

interface setUpAuthorityAction {
  type: typeof SETUPAUTHORITY;
  payload: any;
}

export type ModifyAction =
  | getRoleListAction
  | manageRoleAddAction
  | setUpAuthorityAction;

const getRoleListActionSuccess = (data: any): getRoleListAction => ({
  type: GETROLELIST,
  payload: data,
});

const manageRoleAddActionSuccess = (data: any): manageRoleAddAction => ({
  type: MANAGEROLEADD,
  payload: data,
});

const setUpAuthorityActionSuccess = (data:any):setUpAuthorityAction=>({
  type: SETUPAUTHORITY,
  payload: data,
})

// 角色管理：获取角色列表数据的action
export const getRoleListAction = (): ThunkAction<
  void,
  RootState,
  unknown,
  ModifyAction
> => async (dispatch) => {
  const result: any = await getRoleList();
  const { status, data, msg } = result;
  if (status === 0) {
    dispatch(getRoleListActionSuccess(data));
  } else {
    message.error(msg, 1);
  }
};

// 角色管理：新增角色
export const manageRoleAddAction = (
  roleName: string
): ThunkAction<void, RootState, unknown, ModifyAction> => async (dispatch) => {
  const result: any = await manageRoleAdd(roleName);
  const { status, data, msg } = result;
  if (status === 0) {
    dispatch(manageRoleAddActionSuccess(data));
  } else {
    message.error(msg, 1);
  }
};

// 角色管理：设置权限
export const setUpAuthorityAction = ({
  _id,
  menus,
  auth_time,
  auth_name,
}: {
  _id: string;
  menus: string[];
  auth_time: number;
  auth_name: string;
}): ThunkAction<void, RootState, unknown, ModifyAction> => async (dispatch) => {
  const result: any = await manageRoleUpdate({
    _id,
    menus,
    auth_time,
    auth_name,
  });
  const {status, data, msg} = result;
  if (status === 0) {
    dispatch(setUpAuthorityActionSuccess(data));
  } else {
    message.error(msg, 1);
  }
};
