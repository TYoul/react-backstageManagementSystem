import request from "./request";

// 获取分类列表数据
export const getCategoryList = () => {
  return request({
    url: "/manage/category/list",
    method: "GET",
  });
};
