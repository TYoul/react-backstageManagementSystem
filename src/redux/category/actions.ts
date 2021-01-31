import {
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAILURE,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  CHANGE_MODAL,
} from "./constants";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import {
  getCategoryList,
  addCategory,
  updateCategory,
} from "../../services/category";
import { message } from "antd";

interface CategoryListSuccessAction {
  type: typeof CATEGORY_LIST_SUCCESS;
  payload: any;
}

interface CategoryListFailureAction {
  type: typeof CATEGORY_LIST_FAILURE;
  payload: any;
}

interface AddCategorySuccessAction {
  type: typeof ADD_CATEGORY_SUCCESS;
  payload: any;
}

interface AddCategoryFailureAction {
  type: typeof ADD_CATEGORY_FAILURE;
  payload: any;
}

interface UpdateCategorySuccessAction {
  type: typeof UPDATE_CATEGORY_SUCCESS;
  payload: any;
}

interface UpdateCategoryFailureAction {
  type: typeof UPDATE_CATEGORY_FAILURE;
  payload: any;
}

interface ChangeModalAction {
  type: typeof CHANGE_MODAL;
  payload: boolean;
}

export type ModifyAction =
  | CategoryListSuccessAction
  | CategoryListFailureAction
  | AddCategorySuccessAction
  | AddCategoryFailureAction
  | UpdateCategorySuccessAction
  | UpdateCategoryFailureAction
  | ChangeModalAction;

const categoryListSuccessAction = (data: any): CategoryListSuccessAction => ({
  type: CATEGORY_LIST_SUCCESS,
  payload: data,
});

const addCategorySuccessAction = (data: any): AddCategorySuccessAction => ({
  type: ADD_CATEGORY_SUCCESS,
  payload: data,
});

const updateCategorySuccessAction = (
  data: any
): UpdateCategorySuccessAction => ({
  type: UPDATE_CATEGORY_SUCCESS,
  payload: data,
});

// 分类页面的弹窗显示
export const changeModalAction = (data: boolean): ChangeModalAction => ({
  type: CHANGE_MODAL,
  payload: data,
});

// 获取分类列表数据的action
export const getCategoryListAction = (): ThunkAction<
  void,
  RootState,
  unknown,
  ModifyAction
> => async (dispatch) => {
  const result: any = await getCategoryList();
  let { status, data, msg } = result;
  if (status === 0) {
    dispatch(categoryListSuccessAction(data));
  } else if (status === 1) {
    message.error(msg, 1);
  }
};

// 添加分类数据的action
export const addCategoryAction = (
  values: string
): ThunkAction<void, RootState, unknown, ModifyAction> => async (dispatch) => {
  const result: any = await addCategory(values);
  const { status, data, msg } = result;
  if (status === 0) {
    dispatch(addCategorySuccessAction(data));
    message.success("新增商品分类成功", 1);
  } else {
    dispatch(changeModalAction(true));
    message.error(msg, 1);
  }
};

// 更新分类数据的action
export const updateCategoryAction = ({
  categoryId,
  categoryName,
}: {
  categoryId: string;
  categoryName: string;
}): ThunkAction<void, RootState, unknown, ModifyAction> => async (dispatch) => {
  const result: any = await updateCategory({ categoryId, categoryName });
  const { status, msg } = result;
  if (status === 0) {
    const category = { _id: categoryId, name: categoryName };
    dispatch(updateCategorySuccessAction(category));
    message.success("修改商品分类成功", 1);
  }
};
