import request from '@/utils/request'

// 登录
export const login = (params: any)=> {
  return request({
    url: '/api/user/login',
    method: 'post',
    data: params
  })
}
// 获取用户信息
export const getUserInfo = ()=> {
  return request({
    url: '/api/user/info',
    method: 'get'
  })
}
