import { GETROLELIST, MANAGEROLEADD } from "./constants";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { getRoleList, manageRoleAdd } from "../../services/role";
import { message } from "antd";

interface getRoleListAction {
  type: typeof GETROLELIST;
  payload: any;
}

interface manageRoleAddAction {
  type: typeof MANAGEROLEADD;
  payload: any;
}

export type ModifyAction = getRoleListAction | manageRoleAddAction;

const getRoleListActionSuccess = (data: any): getRoleListAction => ({
  type: GETROLELIST,
  payload: data,
});

const manageRoleAddActionSuccess = (data: any): manageRoleAddAction => ({
  type: MANAGEROLEADD,
  payload: data,
});

// 角色管理：获取角色列表数据的action
export const getRoleListAction = (): ThunkAction<void, RootState, unknown, ModifyAction> => async (dispatch) => {
  const result:any = await getRoleList();
  const {status,data,msg} = result;
  if(status === 0){
    dispatch(getRoleListActionSuccess(data))
  }else{
    message.error(msg,1)
  }
}

// 角色管理：新增角色
export const manageRoleAddAction = (roleName:string):ThunkAction<void, RootState, unknown, ModifyAction> => async (dispatch) => {
  const result:any = await manageRoleAdd(roleName);
  const {status,data,msg} = result;
  if(status===0){
    dispatch(manageRoleAddActionSuccess(data))
  }else{
    message.error(msg,1)
  }
}

