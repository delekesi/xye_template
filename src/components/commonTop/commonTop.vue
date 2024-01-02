<template>
    <div id="commonTop" class="page_top">
        <div class="top_box">
            <img src="../assets/image/common/top_logo.png" @click="goIndex" alt="" class="top_logo">
            <div class="top_middle" @click="goIndex">
                <h2>DDTS项目协同云工作平台</h2>
                <h2>Alliance Collaboration Platform</h2>
            </div>
            <div class="top_r">
                <!-- <b class="top_r-icon point top_r-set" @click="goSetAccount"></b> -->
                <el-dropdown @command="loginOut">
                    <div class="align_center">
                        <img src="../assets/image/common/default_head.png" class="top_head-img" alt="">
                        <span class="top_r-name">{{ userName }}</span>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item><span class="drop_pad">退出登录</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import {
    getCurrentInstance,
    ComponentInternalInstance
} from 'vue'
import {
    leftTopStatus
} from '@/pinia/leftAndTop'
import {
    userInfo
} from '@/pinia/userInfo'
let piniaTop = leftTopStatus()
let piniaUserInfo = userInfo()
const {
    proxy
} = <ComponentInternalInstance>getCurrentInstance()

const userName: string = piniaUserInfo.userName

const goIndex = () => {
    proxy?.$router.push(piniaTop.defaultActive)
}
const loginOut = () => {
    const data: object = {
        'loginUserId': '',
        'userName': '',
        'loginHeadImg': '',
        'token': '',
        'menujson': '',
        'openPath': '',
    }
    piniaUserInfo.setUserInfo(data)
    proxy?.$router.push('/login')
}


</script>

<style scoped>
.page_top {
    width: 100%;
    height: 40px;
    padding: 15px 0;
    border-top: 1px solid #787878;
    background: #4D84FF;
}

.top_box {
    width: calc(100% - 60px);
    height: 100%;
    display: flex;
    overflow: hidden;
    margin: 0 auto;
    align-items: center;
    display: flex;
}

.top_logo {
    width: 20px;
    height: 30px;
}

.top_middle {
    padding-left: 20px;
    flex-grow: 1;
    cursor: pointer;
}

.top_middle h2 {
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 17px;
}

.top_r {
    justify-content: flex-end;
    display: flex;
    align-items: center;
}

.top_r-icon {
    width: 14px;
    display: block;
    height: 14px;
    margin-right: 36px;
}

.top_head-img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}

.top_r-msg {
    background-image: url(../../assets/image/common/icon_xiaoxi.png);
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
}

.top_r-set {
    background-image: url(../../assets/image/common/icon_shezhi.png);
    background-repeat: no-repeat;
    background-size: cover;
}

.top_r-name {
    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: 0;
    line-height: 17px;
    padding-left: 20px;
}

.point {
    cursor: pointer;
}

.t-msg {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #E4E4E4;
    padding: 10px 15px;
}

.msg_title {
    font-size: 18px;
    color: #333;
}

.msg_close {
    font-size: 14px;
    color: #008ff4;
}

.t_msg-list li {
    border-bottom: 1px solid #E4E4E4;
    padding: 10px 15px;
    width: 251px;
    cursor: pointer;
}

.t-msg {
    cursor: auto;
}

.msg_list-p {
    font-size: 12px;
    color: #333;
    line-height: 17px;
}

.msg_list-p i {
    font-weight: bold;
}

.msg_list-time {
    font-size: 12px;
    color: #999999;
    line-height: 17px;
}

.msg_look-but {
    font-size: 14px;
    color: #008ff4;
    display: flex;
    justify-content: center;
    padding: 10px 0;
}

.el-dropdown-menu--small .el-dropdown-menu__item {
    padding: 0;
}

.el-dropdown-menu {
    padding: 0;
}

.drop_pad {
    padding: 0 10px;
}

.btn-msg_tip {
    top: -10px;
    right: -20px;
    text-align: center;
}

.drop_solt .el-dropdown-menu__item:hover {
    background-color: #fff !important;
}

.drop_solt .el-dropdown-menu__item .t_msg-list li:hover {
    background-color: #ecf5ff !important;
}

.align_center {
    display: flex;
    align-items: center;
}
</style>