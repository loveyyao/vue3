import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from './router'
import store from './store'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { AUTHORIZATION } from '@/utils/storage-vars'

NProgress.configure({ showSpinner: false })
const whiteList = ['/user/login']

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  NProgress.start()
  const token = localStorage.getItem(AUTHORIZATION)
  if (token) {
    const state: any = store.state
    const user = state.user.userInfo
    if (user.id) {
      NProgress.done()
      next()
    } else {
      store.dispatch('user/getUserInfo').then(() => {
        NProgress.done()
        next()
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
      next(`/user/login?redirect=${to.path}`)
    }
  }
})
