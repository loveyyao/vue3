import type { RouteRecordRaw } from 'vue-router'
import GlobalLayout from '@/layouts/GlobalLayout.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    // redirect: '/home',
    component: GlobalLayout
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]
