import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './router/index'
import pinia from './pinia/index'
import { getUrlData, toFixed } from '@/assets/js/format'

const app = createApp(App)
app.config.globalProperties.$getUrlData = getUrlData
Number.prototype.toFixed = toFixed
import "element-plus/theme-chalk/el-loading.css"
import "element-plus/theme-chalk/el-message.css"
import "element-plus/theme-chalk/el-notification.css"
import "element-plus/theme-chalk/el-message-box.css"
import "element-plus/theme-chalk/el-drawer.css"
createApp(App)
// 引入注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router)
app.use(ElementPlus)
app.use(pinia)
app.mount('#app')