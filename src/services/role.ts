import request from './request'

// 获取角色列表
export const getRoleList = () => {
  return request({
    url:"/manage/role/list",
    method:'GET',
  })
}

// 添加角色
export const manageRoleAdd = (roleName:string) => {
  return request({
    url:"/manage/role/add",
    method:"POST",
    data:{
      roleName
    }
  })
}