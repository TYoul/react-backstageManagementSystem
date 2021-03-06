import request from "./request";

// 获取商品分页列表数据
export const getProductList = ({
  pageNum,
  pageSize,
}: {
  pageNum: number;
  pageSize: number;
}) => {
  return request({
    url: "/manage/product/list",
    method: "GET",
    params: {
      pageNum,
      pageSize,
    },
  });
};

// 更新商品状态
export const updateStatus = ({
  productId,
  status,
}: {
  productId: string;
  status: number;
}) => {
  return request({
    url: "/manage/product/updateStatus",
    method: "POST",
    data: {
      productId,
      status,
    },
  });
};

// 搜索商品列表
export const getSearchProductList = ({
  searchType,
  keyWord,
  pageNum,
  pageSize,
}: {
  searchType: string;
  keyWord: string;
  pageNum: number;
  pageSize: number;
}) => {
  return request({
    url: "/manage/product/search",
    method: "GET",
    params: {
      [searchType]: keyWord,
      pageNum,
      pageSize,
    },
  });
};

// 获取分类列表
export const getCategoryList = () => {
  return request({
    url: "/manage/category/list",
    method: "GET",
  });
};

// 添加商品
export const addProduct = ({
  categoryId,
  name,
  desc,
  price,
  detail,
  imgs,
}: {
  categoryId: string;
  name: string;
  desc: string;
  price: string;
  detail: string;
  imgs: string[];
}) => {
  return request({
    url: "/manage/product/add",
    method: "POST",
    data: {
      categoryId,
      name,
      desc,
      price,
      detail,
      imgs,
    },
  });
};

// 更新商品
export const updateProduct = ({
  _id,
  categoryId,
  name,
  desc,
  price,
  detail,
  imgs,
}: {
  _id:string;
  categoryId: string;
  name: string;
  desc: string;
  price: string;
  detail: string;
  imgs: string[];
}) => {
  return request({
    url: "/manage/product/update",
    method: "POST",
    data: {
      _id,
      categoryId,
      name,
      desc,
      price,
      detail,
      imgs,
    },
  });
};
