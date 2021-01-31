import {
  CATEGORY_LIST_SUCCESS,
  ADD_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  CHANGE_MODAL,
} from "./constants";
import { ModifyAction } from "./actions";

interface StoreState {
  categoryList: { name: string; _id: string; [propName: string]: any }[];
  isModalVisible: boolean;
  isLoading: boolean;
}

const defaultState: StoreState = {
  categoryList: [], // 分类列表数据
  isModalVisible: false, // 弹窗是否显示
  isLoading: true, //是否处于加载中
};

const categoryReducer = (state = defaultState, action: ModifyAction) => {
  switch (action.type) {
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categoryList: action.payload,
        isLoading: false,
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: [...state.categoryList, action.payload],
        isModalVisible: false,
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: state.categoryList.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          } else {
            return item;
          }
        }),
        isModalVisible: false,
      };
    case CHANGE_MODAL:
      return {
        ...state,
        isModalVisible: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
