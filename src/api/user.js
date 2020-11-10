import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api-auth/oauth/token',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api-auth/oauth/userinfo',
    method: 'get',
    params: {
      access_token: token
    }
  })
}
export function getMenus() {
  return request({
    url: '/api-user/menus/current',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
