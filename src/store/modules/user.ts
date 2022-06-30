import { AUTHORIZATION } from '@/utils/storage-vars'
import { login, getUserInfo } from '@/api/login'

export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
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
      localStorage.removeItem(AUTHORIZATION)
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
      return new Promise((resolve, reject) => {
        getUserInfo().then(res => {
          action.commit('setUserInfo', res.data)
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
