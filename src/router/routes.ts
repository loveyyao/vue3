import type { RouteRecordRaw } from 'vue-router'
import GlobalLayout from '@/layouts/GlobalLayout.vue'
import GlobalRouterView from '@/layouts/GlobalRouterView.vue'

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
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
        meta: {
          title: 'home',
          keepAlive: true,
          showViewTag: true,
          icon: 'House'
        }
      },
      {
        path: '/about',
        component: () => import(/* webpackChunkName: "about" */ '@/views/about/index.vue'),
        meta: {
          title: 'about',
          keepAlive: true,
          showViewTag: true,
          icon: 'House'
        }
      },
      {
        path: '/table',
        component: GlobalRouterView,
        meta: {
          title: 'table',
          keepAlive: true,
          icon: 'House'
        },
        children: [
          {
            path: '/table/base',
            component: () => import(/* webpackChunkName: "table" */ '@/views/table/baseTable.vue'),
            meta: {
              title: 'baseTable',
              keepAlive: true,
              showViewTag: true,
              icon: 'House'
            }
          }
        ]
      }
    ]
  }
]
