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