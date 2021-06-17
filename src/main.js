import { createApp } from 'vue'
import App from './App.vue'
import installElement from './element-plus';
import 'element-plus/packages/theme-chalk/src/base.scss'
import './assets/basic.scss'
import router from './router/index'



const app = createApp(App)
installElement(app)
app.use(router)
app.mount('#app')
