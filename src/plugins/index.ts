import {
  ElMessage,
  ElMessageBox,
  ElLoading,
  ElNotification
} from 'element-plus'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/loading/style/css'
import 'element-plus/es/components/notification/style/css'
import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const plugins = [
  ElMessage,
  ElMessageBox,
  ElLoading,
  ElNotification
]

export default function (app: App) {
  // 注册element-plus图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  // 注册element-plus全局方法
  plugins.forEach(plugin => {
    app.use(plugin)
  })
}
