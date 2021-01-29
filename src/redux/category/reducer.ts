import { CATEGORY_LIST_SUCCESS } from "./constants";
import { ModifyAction } from "./actions";

interface StoreState {
  categoryList: { name: string; _id: string; [propName: string]: any }[];
}

const defaultState: StoreState = {
  categoryList: [],
};

const categoryReducer = (state = defaultState, action: ModifyAction) => {
  switch (action.type) {
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categoryList: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
