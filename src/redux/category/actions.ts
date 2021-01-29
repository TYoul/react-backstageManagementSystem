import { CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAILURE } from "./constants";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { getCategoryList } from "../../services/category";
import { message } from "antd";

interface CategoryListSuccessAction {
  type: typeof CATEGORY_LIST_SUCCESS;
  payload: any;
}

interface CategoryListFailureAction {
  type: typeof CATEGORY_LIST_FAILURE;
  payload: any;
}

export type ModifyAction =
  | CategoryListSuccessAction
  | CategoryListFailureAction;

const categoryListSuccessAction = (data: any): CategoryListSuccessAction => ({
  type: CATEGORY_LIST_SUCCESS,
  payload: data,
});

// 获取分类列表数据的action
export const getCategoryListAction = (): ThunkAction<
  void,
  RootState,
  unknown,
  ModifyAction
> => async (dispatch, getState) => {
  const result: any = await getCategoryList();
  let { status, data, msg } = result;
  if (status === 0) {
    dispatch(categoryListSuccessAction(data));
  } else if (status === 1) {
    message.error(msg, 1);
  }
};
