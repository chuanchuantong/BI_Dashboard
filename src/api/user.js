import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/User/Login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/User/getByUserId',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserList(data) {
  return request({
    url: '/Pcu/getList?name='+data,
    method: 'post'
  })
}

export function getRoleList() {
  return request({
    url: '/PSysRole/getRoleList',
    method: 'post'
  })
}
