import type { RouteRecordRaw } from 'vue-router'
import GlobalLayout from '@/layouts/GlobalLayout.vue'
import GlobalRouterView from '@/layouts/GlobalRouterView.vue'
import UserLayout from '@/layouts/UserLayout.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
    component: GlobalLayout,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
        meta: {
          title: 'home',
          keepAlive: true,
          showViewTag: true,
          icon: 'House',
          roles: ['admin', 'home']
        }
      },
      {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '@/views/about/index.vue'),
        meta: {
          title: 'about',
          keepAlive: true,
          showViewTag: true,
          icon: 'House',
          roles: ['admin', 'about']
        }
      },
      {
        path: '/table',
        name: 'table',
        component: GlobalRouterView,
        meta: {
          title: 'table',
          keepAlive: true,
          icon: 'House',
          roles: ['admin', 'table']
        },
        children: [
          {
            path: '/table/base',
            name: 'baseTable',
            component: () => import(/* webpackChunkName: "table" */ '@/views/table/baseTable.vue'),
            meta: {
              title: 'baseTable',
              keepAlive: true,
              showViewTag: true,
              icon: 'House',
              roles: ['admin', 'table', 'baseTable']
            }
          }
        ]
      }
    ]
  },
  {
    path: '/error',
    redirect: '/error/404',
    component: GlobalLayout,
    children: [
      {
        path: '/error/404',
        name: 'error404',
        component: () => import(/* webpackChunkName: "error-page" */ '@/views/error-page/index.vue'),
        meta: {
          title: '404',
          keepAlive: false,
          showViewTag: false
        }
      },
    ]
  },
  {
    path: '/user',
    name: 'user',
    redirect: '/user/login',
    component: UserLayout,
    children: [
      {
        path: '/user/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/login/index.vue'),
        meta: {
          title: 'login',
          keepAlive: false,
          showViewTag: false
        }
      }
    ]
  }
]
