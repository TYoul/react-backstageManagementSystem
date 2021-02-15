import { GETROLELIST, MANAGEROLEADD, SETUPAUTHORITY } from "./constants";
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
        roleList: [...state.roleList, action.payload],
      };
    case SETUPAUTHORITY:
      return {
        ...state,
        roleList: state.roleList.map((item: any) => {
          if (item._id === action.payload._id) {
            item = action.payload;
          }
          return item;
        }),
      };
    default:
      return state;
  }
};

export default roleReducer;
