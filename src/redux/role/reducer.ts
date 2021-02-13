import { GETROLELIST, MANAGEROLEADD } from "./constants";
import { ModifyAction } from "./actions";

interface StoreState {
  roleList: [];
}

const defaultState: StoreState = {
  roleList: [], // 角色列表数据
};

const roleReducer = (state = defaultState, action: ModifyAction) => {
  switch (action.type) {
    case GETROLELIST:
      return {
        ...state,
        roleList: action.payload,
      };
    case MANAGEROLEADD:
      return {
        ...state,
        roleList: [...state.roleList,action.payload]
      }
    default:
      return state;
  }
};

export default roleReducer;
