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

const plugins = [
  ElMessage,
  ElMessageBox,
  ElLoading,
  ElNotification
]

export default function (app: App) {
  plugins.forEach(plugin => {
    app.use(plugin)
  })
}
