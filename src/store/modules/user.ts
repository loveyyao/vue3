import { AUTHORIZATION } from '@/utils/storage-vars'
import { login, getUserInfo } from '@/api/login'
import { routes } from '@/router/routes'

export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {},
    roles: [],
    // 菜单
    menus: []
  },
  getters: {},
  mutations: {
    setToken(state: any, val: string) {
      state.token = val
      localStorage.setItem(AUTHORIZATION, val)
    },
    setUserInfo(state: any, val: any) {
      state.userInfo = val
    },
    clearLoginInfo(state: any) {
      state.token = ''
      state.userInfo = {}
      state.roles = []
      localStorage.removeItem(AUTHORIZATION)
    },
    setRoles(state: any, val: any) {
      state.roles = val
    },
    setMenus(state: any, val: any) {
      state.menus = val
    }
  },
  actions: {
    login(action: any, data: any) {
      return new Promise((resolve, reject) => {
        login(data).then(res => {
          action.commit('setToken', res.data)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getUserInfo(action: any) {
      const fun = (routeList: any, roles: any) => {
        return routeList.filter((e: any) => {
          const role = (e.meta || {}).roles
          let val: any = true // 路由没有设置权限就默认有权限
          if (role && role.length) {
            val = role.some((r: any) => roles.includes(r))
          }
          if (val && e.children && e.children.length) {
            e.children = fun(e.children, roles)
          }
          return val
        })
      }
      return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
          const roles = ['admin', 'home', 'about']
          action.commit('setUserInfo', res.data)
          action.commit('setRoles', roles)
          action.commit('setMenus', fun(routes, roles))
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    logout(action: any) {
      return new Promise((resolve) => {
        setTimeout(() => {
          action.commit('clearLoginInfo')
          resolve(null)
        }, 500)
      })
    }
  }
}
