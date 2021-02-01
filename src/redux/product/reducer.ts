import { PRODUCT_SUCCESS } from "./constants";
import { ModifyAction } from "./actions";

interface StoreState {
  productList: {
    pageNum: number;
    total: number;
    pages: number;
    pageSize: number;
    list: {
      status: number;
      imgs: string[];
      _id: string;
      name: string;
      desc: string;
      price: number;
      categoryId: string;
      detail: string;
      __v: number;
    }[];
  }[];
}

const defaultState: StoreState = {
  productList: [],
};

const productReducer = (state = defaultState, action: ModifyAction) => {
  switch (action.type) {
    case PRODUCT_SUCCESS:
      return {
        ...state,
        productList: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
