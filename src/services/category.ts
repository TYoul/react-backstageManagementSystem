import request from "./request";

// 获取分类列表数据
export const getCategoryList = () => {
  return request({
    url: "/manage/category/list",
    method: "GET",
  });
};

// 添加分类
export const addCategory = (categoryName:string) => {
  return request({
    url:"/manage/category/add",
    method:"POST",
    data:{categoryName}
  })
}

// 更新分类
export const updateCategory = (categoryId:string,categoryName:string) => {
  return request({
    url:'/manage/category/update',
    method:'POST',
    data:{categoryId,categoryName}
  })
}