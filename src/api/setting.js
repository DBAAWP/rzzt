import request from '@/utils/request'

// 获取所有角色列表
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

// 企业信息
export function getCompanyInfo(id) {
  return request({
    url: `/company/${id}`
  })
}

// 删除角色
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

/** *
 * 修改角色
 * ***/
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}
/**
   * 获取角色详情
   * **/
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

// 新增角色

export function addRole(data) {
  return request({
    url: `/sys/role`,
    method: 'POST',
    data
  })
}
