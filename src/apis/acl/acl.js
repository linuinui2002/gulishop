import request from '@/utils/request';

export const reqUser=(page,limit,username)=>{
  return request.get(`/admin/acl/user/${page}/${limit}`,{
    params:{
      username
    }
  })
}

export const reqRole=(page,limit,roleName)=>{
  return request.get(`/admin/acl/role/${page}/${limit}`,{
    params: {
      roleName
    }
  })
}

export const reqPermission=()=>{
  return request.get(`/admin/acl/permission`,)
}

export const reqAddUser=(userInfo)=>{
  return request.post(`/admin/acl/user/save`,userInfo)
}

export const reqDeleteArr=(arr)=>{
  return request.post(`/admin/acl/user/batchRemove`,arr)
}

export const reqAllocation=(id)=>{
  return request.get(`/admin/acl/user/toAssign/${id}`)
}
// http://localhost:3000/app-dev/admin/acl/user/update

export const reqPutUserInfo=(data)=>{
  return request.put(`/admin/acl/user/update`,data)
}

export const reqDelete=(id)=>{
  return request.delete(`/admin/acl/user/remove/${id}`)
}


// 角色管理

// /admin/acl/role/save

export const addRole=(data)=>{
  return request.post(`/admin/acl/role/save`,data)
}

export const deleteRole=(id)=>{
  return request.post(`/admin/acl/role/save`,id)
}

