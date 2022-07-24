import request from '@/utils/request'

// 获取组织架构数据
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}
// 删除组织架构部门
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'DELETE'
  })
}

// 新增部门

export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
// 查询部门详情
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`
  })
}

// 编辑部门
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'PUT',
    data
  })
}