import {
  PRODUCT_SUCCESS,
  UPDATESTATUS_SUCCESS,
  UPDATESEARCHTYPE,
  UPDATESEARCHVALUE,
  UPDATESEARCHLIST,
} from "./constants";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import {
  getProductList,
  updateStatus,
  getSearchProductList,
} from "../../services/product";
import { message } from "antd";

interface productSuccessAction {
  type: typeof PRODUCT_SUCCESS;
  payload: any;
}

interface updateStatusAction {
  type: typeof UPDATESTATUS_SUCCESS;
  payload: any;
}

interface updateSearchType {
  type: typeof UPDATESEARCHTYPE;
  payload: string;
}

interface updateSearchValue {
  type: typeof UPDATESEARCHVALUE;
  payload: string;
}

interface updateSearchList {
  type: typeof UPDATESEARCHLIST;
  payload: any;
}

export type ModifyAction =
  | productSuccessAction
  | updateStatusAction
  | updateSearchType
  | updateSearchValue
  | updateSearchList;

const productSuccessAction = (data: any): productSuccessAction => ({
  type: PRODUCT_SUCCESS,
  payload: data,
});

const updateSuccessAction = (data: any): updateStatusAction => ({
  type: UPDATESTATUS_SUCCESS,
  payload: data,
});

const updateSearchListSuccessAction = (data:any):updateSearchList => ({
  type: UPDATESEARCHLIST,
  payload: data,
})

export const updateSearchTypeAction = (data: string): updateSearchType => ({
  type: UPDATESEARCHTYPE,
  payload: data,
});

export const updateSearchValueAction = (data: string): updateSearchValue => ({
  type: UPDATESEARCHVALUE,
  payload: data,
});

// 获取商品分页列表数据的action
export const getProductAction = ({
  pageNum,
  pageSize,
}: {
  pageNum: number;
  pageSize: number;
}): ThunkAction<void, RootState, unknown, ModifyAction> => async (dispatch) => {
  const result: any = await getProductList({ pageNum, pageSize });
  const { status, data, msg } = result;
  if (status === 0) {
    dispatch(productSuccessAction(data));
  } else {
    message.error(msg, 1);
  }
};

// 更新商品状态
export const updateStatusAction = ({
  productId,
  status,
}: {
  productId: string;
  status: number;
}): ThunkAction<void, RootState, unknown, ModifyAction> => async (dispatch) => {
  const result: any = await updateStatus({ productId, status });
  const { msg } = result;
  if (result.status === 0) {
    dispatch(updateSuccessAction({ status, productId }));
  } else {
    message.error(msg, 1);
  }
};

export const updateSearchListAction = ({
  searchType,
  keyWord,
  pageNum,
  pageSize,
}: {
  searchType: string;
  keyWord: string;
  pageNum: number;
  pageSize: number;
}): ThunkAction<void, RootState, unknown, ModifyAction> => async (dispatch) => {
  const result: any = await getSearchProductList({
    searchType,
    keyWord,
    pageNum,
    pageSize,
  });
  const {data,status,msg} = result;
  if(status===0){
    dispatch(updateSearchListSuccessAction(data))
  }else if(status ===1){
    message.error(msg,1)
  }
};
