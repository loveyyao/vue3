import {
  ElMessage,
  ElMessageBox,
  ElLoading,
  ElNotification
} from 'element-plus'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import 'element-plus/es/components/loading/style/css'
import 'element-plus/es/components/notification/style/css'
import type { App, DirectiveBinding } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { permission } from '@/utils/utils'
import ECharts from './echarts'

const plugins = [
  ElMessage,
  ElMessageBox,
  ElLoading,
  ElNotification
]

export default function (app: App) {
  // 注册ECharts组件
  app.component('v-chart', ECharts)
  // 注册element-plus图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  // 注册element-plus全局方法
  plugins.forEach(plugin => {
    app.use(plugin)
  })
  // 注册全局指令
  app.directive('permission', {
    mounted(el, binding: DirectiveBinding, vNode: any) {
      const roles = binding.value
      if (!permission(roles)) {
        const comment = document.createComment('')
        Object.defineProperty(comment, 'setAttribute', {
          value: () => undefined
        })
        vNode.parentNode = el.parentNode
        vNode.currentEl = comment
        el.parentNode && el.parentNode.replaceChild(comment, el)
      }
    },
    updated (el, binding: DirectiveBinding, vNode: any, prevVNode: any) {
      const roles = binding.value
      if (permission(roles)) {
        prevVNode && prevVNode.parentNode && prevVNode.parentNode.replaceChild(el, prevVNode.currentEl)
      } else {
        const comment = document.createComment('')
        Object.defineProperty(comment, 'setAttribute', {
          value: () => undefined
        })
        vNode.parentNode = el.parentNode
        vNode.currentEl = comment
        el.parentNode && el.parentNode.replaceChild(comment, el)
      }
    }
  })
}
