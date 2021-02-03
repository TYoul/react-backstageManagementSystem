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
  productId,status
}:{
  productId:string;
  status:number
}) => {
  return request({
    url:"/manage/product/updateStatus",
    method:"POST",
    data:{
      productId,
      status
    }
  })
}