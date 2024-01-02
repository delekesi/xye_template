import {
    createRouter,
    createWebHistory,
    RouteRecordRaw
} from 'vue-router'
import {
    userInfo
} from '@/pinia/userInfo'
import { usePermissStore } from '@/pinia/permiss';
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/login',
        meta: {
            title: '重定向',
            permiss: '',
        },
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录',
            permiss: '',
        },
        component: () => import('@/views/login/login.vue')
    },
    {
        path: '/main',
        name: 'main',
        meta: {
            title: '主体页',
            permiss: '',
        },
        component: () => import('@/components/main/main.vue'),
        children: [{
            path: '/workPage',
            name: 'workPage',
            component: () => import('@/views/mainPage/workPage/workPage.vue'),
            meta: {
                title: '工作台',
                permiss: '1001',
            },
        }]
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    //如果设置标题就显示，没设置使用默认
    document.title = `${to.meta.title} | vue-manage-system`;
    const permiss = usePermissStore();
    const permissStr = <string>to.meta.permiss
    if (!userInfo().token && to.path !== '/login') {
        next('/login');
    } else if (permissStr && !permiss.userRole.includes(permissStr)) {
        // 如果没有权限，则进入403
        next('/403');
    } else {
        next();
    }
})

export default router;