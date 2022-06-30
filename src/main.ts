import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locals'
import './permission'
import './assets/style/reset.css'
import installPlugins from './plugins'

const app = createApp(App)

installPlugins(app)

app
  .use(store)
  .use(router)
  .use(i18n)
  .mount('#app')
