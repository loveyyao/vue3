import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import store from './store'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { AUTHORIZATION } from '@/utils/storage-vars'
import { permission } from '@/utils/utils'

NProgress.configure({ showSpinner: false })
const whiteList = ['/user/login']

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  NProgress.start()
  const token = localStorage.getItem(AUTHORIZATION)
  if (token) {
    const state: any = store.state
    const user = state.user.userInfo
    const roles: any = to.meta.roles
    if (to.matched.length === 0) {
      next('/error/404')
    }
    if (user.id) {
      NProgress.done()
      // 路由设置权限并且当前登录账号没有这个权限就到404
      if (roles && roles.length && !permission(roles)) {
        next('/error/404')
      } else {
        next()
      }
    } else {
      store.dispatch('user/getUserInfo').then(() => {
        NProgress.done()
        // 路由设置权限并且当前登录账号没有这个权限就到404
        if (roles && roles.length && !permission(roles)) {
          next('/error/404')
        } else {
          next()
        }
      }).catch(() => {
        localStorage.removeItem(AUTHORIZATION)
        NProgress.done()
        next('/user/login')
      })
    }
  } else {
    if (whiteList.includes(to.path)) {
      NProgress.done()
      next()
    } else {
      next(`/user/login`)
    }
  }
})
