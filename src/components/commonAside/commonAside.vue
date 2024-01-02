<template>
    <div id="commonLeft" class="com_left-box">
        <el-menu :default-active="defaultActive" class="com_swiper-ul" text-color="#6A7682" active-text-color="#008ff4
            " :unique-opened="uniqueOpened" :router="router">
            <template v-for="item in swiperList">
                <div v-if="item.show" class="menu_block">
                    <el-sub-menu :index="item.url" v-if="item.childList && item.childList.length > 0">
                        <template slot="title"> <b :class="'icon_left ' + item.iconClass"></b>{{ item.name }}</template>
                        <el-menu-item-group v-if="item.childList.length > 0">
                            <el-menu-item v-if="jtem.show" :index="jtem.url" @click="openUrl(jtem.url)"
                                v-for="jtem in item.childList" :key="jtem.name">{{ jtem.name }}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-menu-item :index="item.url" @click="openUrl(item.url)" v-else>
                        <template slot="title" v-if="item.show"><span slot="title"> <b
                                    :class="'icon_left ' + item.iconClass"></b>{{ item.name }}</span></template>
                    </el-menu-item>
                </div>
            </template>
        </el-menu>
    </div>
</template>


<script setup lang="ts">
import {
    leftTopStatus
} from '@/pinia/leftAndTop'
import {
    userInfo
} from '@/pinia/userInfo'
import {
    ref,
    reactive,
    onMounted,
    getCurrentInstance,
    ComponentInternalInstance
} from 'vue'
let piniaLeft = leftTopStatus()
let userInfos = userInfo()
const {
    proxy
} = <ComponentInternalInstance>getCurrentInstance()
interface swiperType {
    name: string;
    url: string;
    show: boolean;
    childList: Array<Object>,
    iconClass: string;
    code: number;
}
const swiperList: Array<swiperType> = reactive([{
    name: '数据导入',
    url: '/dataImport/dataImportList',
    show: false,
    iconClass: 'icon_class1',
    childList: [],
    code: 1002
}, {
    name: '数据作业',
    url: '/dataWork/dataWorkList',
    show: false,
    iconClass: 'icon_class2',
    childList: [],
    code: 1003
}, {
    name: '属性配置',
    url: '/attributeConfig/attributeConfigList',
    show: false,
    iconClass: 'icon_class3',
    childList: [],
    code: 1004
}, {
    name: '系统管理',
    url: '/systemManage/systemManageList',
    show: false,
    iconClass: 'icon_class4',
    childList: [],
    code: 1005
},])
const uniqueOpened = true
const router = true
let firstPageUrl = ref<string>('')
let defaultActive = ref<string>('')
onMounted(() => {
    if (proxy?.$getUrlData(proxy?.$route.fullPath).activeIndex) {
        const url = decodeURIComponent(proxy?.$getUrlData(proxy?.$route.fullPath)
            .activeIndex)
        piniaLeft.setDefaultActive(url)
        defaultActive.value = url
        getSwiperList(false)
    } else {
        getSwiperList(true)
    }
})

function getSwiperList(goIndexPageFlag: boolean) {
    computedList(swiperList, userInfos.menujson);
    //设置左侧高亮和权限菜单
    let tab = swiperList.find(item => item.show)
    if (tab) {
        firstPageUrl.value = tab.url
        piniaLeft.setSwiperList(swiperList)

        //设置首页路径
        piniaLeft.setFirstPageUrl(firstPageUrl.value)
        if (goIndexPageFlag) {
            setLocalPage(tab)
        }
    }

}

function setLocalPage(tab: swiperType) {
    piniaLeft.setDefaultActive(tab.url)
    defaultActive.value = tab.url
    proxy?.$router.push(firstPageUrl.value)
}

function computedList(localList: Array<swiperType>, menujson: Array<number>) {
    localList.forEach(item => {
        if (menujson.indexOf(item.code) != -1) {
            item.show = true;
        }
    })
}

function openUrl(url: string) {
    piniaLeft.setDefaultActive(url)
    defaultActive.value = url
}
</script>

<style scoped>
.com_left-box {
    width: 125px;
    height: 100%;
}

.com_swiper-icon {
    width: 10px;
    height: 10px;
    padding-right: 5px;
}

.com_left-h1 {
    font-size: 22px;
    line-height: 60px;
    text-align: center;
    color: #fff;
}

.menu_block {
    min-height: 42px;
}

.el-menu {
    border-right: 0;
    background-color: unset;
}

.el-menu-item {
    color: #333;
    display: flex;
    align-items: center;
    padding: 0 !important;
    min-width: 85px !important;
    min-height: 42px !important;
}

.el-menu-item span {
    display: flex;
    align-items: center;
    height: 40px;
    line-height: 40px;
    width: 100%;
    padding-left: 10px;
}

.el-main .is-active span {
    border-right: 2px solid #008ff4;
}

.el-submenu {
    width: 100%;
}

.com_left-box :deep(.el-menu-item-group__title) {
    padding: 0;
}

.el-menu-item,
.el-submenu__title {
    height: auto;
    height: 32px;
}

.com_left-box :deep(.el-submenu__title) {
    padding: 0 10px !important;
    height: 42px;
    display: flex;
    align-items: center;
}

.el-menu-item-group .el-menu-item {
    padding-left: 0;
    justify-content: center;
}

.icon_left {
    width: 14px;
    height: 14px;
    display: block;
    margin-right: 10px;
}


.icon_class1 {
    background: url(../assets/image/common/icon/icon_1.png)no-repeat center;
}

.icon_class2 {
    background: url(../assets/image/common/icon/icon_2.png)no-repeat center;
}

.icon_class3 {
    background: url(../assets/image/common/icon/icon_3.png)no-repeat center;
}

.icon_class4 {
    background: url(../assets/image/common/icon/icon_4.png)no-repeat center;
}
</style>