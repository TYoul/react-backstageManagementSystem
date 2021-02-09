import request from "./request";

// 根据图片名删除图片
export const deleteImg = (name: string) => {
  return request({
    url: "/manage/img/delete",
    method: "POST",
    data: {
      name,
    },
  });
};
