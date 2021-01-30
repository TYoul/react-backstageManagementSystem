import {
  CATEGORY_LIST_SUCCESS,
  ADD_CATEGORY_SUCCESS,
  CHANGE_MODAL,
} from "./constants";
import { ModifyAction } from "./actions";

interface StoreState {
  categoryList: { name: string; _id: string; [propName: string]: any }[];
  isModalVisible: boolean;
}

const defaultState: StoreState = {
  categoryList: [],
  isModalVisible: false,
};

const categoryReducer = (state = defaultState, action: ModifyAction) => {
  switch (action.type) {
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categoryList: action.payload,
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: [...state.categoryList, action.payload],
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
