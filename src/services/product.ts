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
