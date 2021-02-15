import request from "./request";

// 获取角色列表
export const getRoleList = () => {
  return request({
    url: "/manage/role/list",
    method: "GET",
  });
};

// 添加角色
export const manageRoleAdd = (roleName: string) => {
  return request({
    url: "/manage/role/add",
    method: "POST",
    data: {
      roleName,
    },
  });
};

// 更新角色(给角色设置权限)
export const manageRoleUpdate = ({
  _id,
  menus,
  auth_time,
  auth_name,
}: {
  _id: string;
  menus: string[];
  auth_time: number;
  auth_name: string;
}) => {
  return request({
    url: "/manage/role/update",
    method: "POST",
    data: {
      _id,
      menus,
      auth_time,
      auth_name,
    },
  });
};
