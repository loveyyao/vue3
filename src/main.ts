import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/reset.css'
import installPlugins from './plugins'

const app = createApp(App)

installPlugins(app)

app
  .use(store)
  .use(router)
  .mount('#app')
