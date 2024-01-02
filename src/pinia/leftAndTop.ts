import { defineStore } from 'pinia'
interface leftType {
    defaultActive: string;
    firstPageUrl: string;
    swiperList: Array<object>;
}
export const leftTopStatus = defineStore('leftTopStatus', {
    state: () => {
        const data: leftType = {
            defaultActive: '',
            firstPageUrl: '',
            swiperList: []
        }
        return data
    },
    actions: {
        setDefaultActive(defaultActive: string) {
            // 设置左侧哪个tab高亮
            this.defaultActive = defaultActive
        },
        setFirstPageUrl(firstPageUrl: string) {
            // 设置首页
            this.firstPageUrl = firstPageUrl
        },
        setSwiperList(swiperList: Array<object>) {
            // 左侧权限菜单
            this.swiperList = swiperList
        },
    },
    persist: {
        storage: localStorage,
        paths: []
    },
})