import {
  PRODUCT_SUCCESS,
  UPDATESTATUS_SUCCESS,
  UPDATESEARCHTYPE,
  UPDATESEARCHVALUE,
  UPDATESEARCHLIST,
} from "./constants";
import { ModifyAction } from "./actions";

interface StoreState {
  productList: {
    pageNum: number;
    total: number;
    pages: number;
    pageSize: number;
    list: any;
  };
  isSearch: boolean;
  keyWord: string;
  searchType: string;
}

const defaultState: StoreState = {
  productList: {
    pageNum: 0,
    total: 0,
    pages: 0,
    pageSize: 0,
    list: [],
  },
  isSearch: false,
  keyWord: "", // 搜索关键字
  searchType: "productName", // 搜索类型 productName：是按名称搜索； productDesc：按描述搜索
};

const productReducer = (state = defaultState, action: ModifyAction) => {
  switch (action.type) {
    case PRODUCT_SUCCESS:
      return {
        ...state,
        productList: action.payload,
      };
    case UPDATESTATUS_SUCCESS:
      return {
        ...state,
        productList: {
          ...state.productList,
          list: state.productList.list.map((item: any) => {
            if (item._id === action.payload.productId) {
              item.status = action.payload.status;
              return item;
            } else {
              return item;
            }
          }),
        },
      };
    case UPDATESEARCHTYPE:
      return {
        ...state,
        searchType: action.payload,
        keyWord: "",
      };
    case UPDATESEARCHVALUE:
      return {
        ...state,
        keyWord: action.payload,
        isSearch: true,
      };
    case UPDATESEARCHLIST:
      return {
        ...state,
        productList: {
          ...state.productList,
          pageNum: action.payload.pageNum,
          total: action.payload.total,
          pageSize: action.payload.pageSize,
          list: action.payload.list,
        },
      };
    default:
      return state;
  }
};

export default productReducer;
