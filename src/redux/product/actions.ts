import { PRODUCT_SUCCESS } from "./constants";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { getProductList } from "../../services/product";
import { message } from "antd";

interface productSuccessAction {
  type: typeof PRODUCT_SUCCESS;
  payload: any;
}

export type ModifyAction = productSuccessAction;

const productSuccessAction = (data: any): productSuccessAction => ({
  type: PRODUCT_SUCCESS,
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
