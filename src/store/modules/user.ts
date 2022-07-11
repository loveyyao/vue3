import { AUTHORIZATION } from '@/utils/storage-vars'
// import { login, getUserInfo } from '@/api/login'
import { routes } from '@/router/routes'
import { cloneDeep } from 'lodash'

const ADMIN_TOKEN = 'ADMIN_TOKEN' // 管理员
const OTHER_TOKEN = 'OTHER_TOKEN' // 其他用户
const ADMIN_USER = {
  id: 'c904dfe3-a204-4ead-b75d-5fbdff339645',
  username: 'admin',
  realname: '五更琉璃',
  password: '123456',
  avatar: 'https://file.jhtinfo.net/temp/A0/1542059294931394560.jpg',
  birthday: '1996-04-20 15:49:33',
  sex: 2,
  email: '320130049@qq.com',
  phone: '13481812503',
  roleId: '8ddb52f2-3b00-412b-8fc0-ec54a304a98d',
  status: 1,
  post: null,
  delFlag: 0,
  createBy: '系统',
  createTime: '2021-08-07 17:45:38',
  updateBy: null,
  updateTime: null,
  userIdentity: null,
  role_id: '8ddb52f2-3b00-412b-8fc0-ec54a304a98d',
  roles: ['admin']
}
const OTHER_USER = {
  id: 'c904dfe3-a204-4ead-b75d-5fbdff339646',
  username: 'test',
  realname: '测试用户',
  password: '123456',
  avatar: 'https://file.jhtinfo.net/temp/A0/1546325505969991680.png',
  birthday: '1996-04-20 15:49:33',
  sex: 2,
  email: '320130049@qq.com',
  phone: '13481812503',
  roleId: '8ddb52f2-3b00-412b-8fc0-ec54a304a98d',
  status: 1,
  post: null,
  delFlag: 0,
  createBy: '系统',
  createTime: '2021-08-07 17:45:38',
  updateBy: null,
  updateTime: null,
  userIdentity: null,
  role_id: '8ddb52f2-3b00-412b-8fc0-ec54a304a98f',
  // roles: ['home', 'table', 'baseTable', 'about']
  roles: ['home', 'about']
}

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
      state.menus = []
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
        setTimeout(() => {
          let token = ''
          if (data.username === 'admin') {
            token = ADMIN_TOKEN
          } else {
            token = OTHER_TOKEN
          }
          action.commit('setToken', token)
          resolve(token)
        }, 500)
        // login(data).then(res => {
        //   action.commit('setToken', res.data)
        //   resolve(res)
        // }).catch(err => {
        //   reject(err)
        // })
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
        setTimeout(() => {
          const data = localStorage.getItem(AUTHORIZATION) === ADMIN_TOKEN ? ADMIN_USER : OTHER_USER
          action.commit('setUserInfo', data)
          action.commit('setRoles', data.roles)
          action.commit('setMenus', fun(cloneDeep(routes), data.roles))
          resolve(data)
        }, 500)
        // getUserInfo().then(res => {
        //   const roles = ['admin', 'home', 'about']
        //   action.commit('setUserInfo', res.data)
        //   action.commit('setRoles', roles)
        //   action.commit('setMenus', fun(routes, roles))
        //   resolve(res)
        // }).catch(err => {
        //   reject(err)
        // })
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
