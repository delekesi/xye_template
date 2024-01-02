
// 1. 导入
import { createPinia } from 'pinia'
import persistedstate from 'pinia-plugin-persistedstate'
// 2. 创建
const pinia = createPinia()
pinia.use(persistedstate)
// 3. 导出
export default pinia
