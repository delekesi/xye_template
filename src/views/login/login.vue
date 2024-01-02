<template>
    <div class="zt_html">
        <!-- <el-dialog title="忘记密码" v-model="addWorkFlag" width="450px" :close-on-click-modal="false">
            <el-form :model="forgetData" label-position="left" label-width="00px" :rules="platRules" ref="forgetData">
                <ul class="mod_list">
                    <li class="mod_li">
                        <span class="mod_title">账号：</span>
                        <el-form-item prop="loginname">
                            <el-input class="mod_input" placeholder="请输入账号" v-model="forgetData.loginname">
                            </el-input>
                        </el-form-item>
                    </li>
                    <li class="mod_li">
                        <span class="mod_title">验证码：</span>
                        <el-form-item prop="code">

                            <el-input class="mod_input" placeholder="请输入验证码" v-model="forgetData.code"></el-input>
                        </el-form-item>
                        <el-button :class="'set_msg marLeft20 ' + (getCodeFlag?'btn_bluebor':'btn_graybor')"
                            @click.native="getCode($event)">{{codeText}}</el-button>
                    </li>
                </ul>
                <div class="table_but">
                    <el-button class="btn-blue" type="primary" @click="confirmWork('forgetData')">确认</el-button>
                    <el-button class="btn_graybor marLeft40" @click="addWorkFlag = false">取消</el-button>
                </div>
            </el-form>
        </el-dialog> -->
        <div class="zt_bg">
            <div class="zt_login">
                <div class="zt_block">
                    <img src="../../assets/image/login/logo.png" alt="" class="zt_block-logo">
                    <h3 class="zt_block-title">DDTS项目协同云工作平台</h3>
                    <el-form :model="loginData" label-width="0" label-position="left" :rules="loginRules" ref="loginFormRef"
                        class="c_form">
                        <ul class="form_ul">
                            <li class="form_li clearFix">
                                <el-form-item class="fl pr" prop="loginname" inline-message="true">
                                    <el-input type="text" placeholder="请输入账号"
                                        class="el_form-limit form_block-name form_block-input" v-model="loginData.loginname"
                                        @keyup.native.enter='login(loginFormRef)'>
                                    </el-input>
                                </el-form-item>
                            </li>
                            <li class="form_li clearFix">
                                <el-form-item class="fl pr" prop="password">
                                    <el-input type="password" placeholder="请输入密码"
                                        class="el_form-limit form_block-pass form_block-input" v-model="loginData.password"
                                        @keyup.native.enter='login(loginFormRef)'></el-input>
                                </el-form-item>
                            </li>
                        </ul>
                        <el-checkbox v-model="checked" ref="reme" :checked="checked" name="saveName" class="log_radio fl"
                            id="saveName">记住账号</el-checkbox>
                        <el-button class="login_but" type="primary" @click="login(loginFormRef)">登录</el-button>
                        <!-- <a class="log_f" @click="forgetPass">忘记密码?</a> -->
                    </el-form>
                    <p class="zt_err-info">Copyright&nbsp;©&nbsp;2023 南京中图数码科技有限公司出品</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {
    userInfo
} from '@/pinia/userInfo'
let piniaUserInfo = userInfo()
import {
    ref,
    reactive,
    onMounted,
} from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
import type { FormInstance, FormRules } from 'element-plus/lib';
import { h } from 'vue'
import { ElMessage } from 'element-plus'
import loginApi from '@/axios/login/login'
// 定义登录字段类型
interface loginType {
    loginname: string;
    password: string;
}
//表单校验类型
const loginFormRef = ref<FormInstance>()
//登录字段默认值
const loginData = reactive<loginType>({
    loginname: '',
    password: ''
})
const loginRules = reactive<FormRules<loginType>>({
    loginname: [{
        required: true,
        message: '账号或者密码输入错误',
        trigger: 'blur'
    }],
    password: [{
        required: true,
        message: '账号或者密码输入错误',
        trigger: 'blur'
    }],
})

const checked = ref(false)

// const addWorkFlag = ref(false)
// const codeText = ref('获取验证码')
// 是否可以点击验证码  类似于节流抖动
// const getCodeFlag = ref(true)


onMounted(() => {
    if (localStorage.getItem('d04LoginName')) {
        checked.value = true;
        loginData.loginname = localStorage.getItem('d04LoginName') || '';
    }
})

const login = async (formEl: FormInstance) => {
    if (!formEl) return
    await formEl.validate((valid) => {
        if (valid) {
            if (checked.value) {
                localStorage.setItem('d04LoginName', loginData.loginname);
            } else {
                localStorage.removeItem('d04LoginName');
            }
            const data = loginApi(loginData)
            data.then(res => {
                const datas = res.data
                if (res.code == 0) {
                    let data = {
                        'loginUserId': datas.userid,
                        'userName': datas.loginname,
                        'loginHeadImg': datas.loginHeadImg,
                        'token': datas.token,
                        'menujson': datas.menujson,
                        'openPath': datas.openPath,
                    }
                    piniaUserInfo.setUserInfo(data)
                    ElMessage({
                        message: h('p', null, [
                            h('span', null, `登陆成功`)
                        ]),
                        duration: 0,
                        showClose: true,
                        customClass: 'custom_class_suc',
                        onClose: function () {
                            router.push('/main');
                        }
                    })
                } else {
                    ElMessage({
                        message: h('p', null, [
                            h('span', null, `${res.msg}`)
                        ]),
                        duration: 0,
                        showClose: true,
                        customClass: 'custom_class_error'
                    })
                }
            })
        } else {
            console.log('error submit!')
            return false
        }
    })
}

</script>
<style scoped>
@import './login.less';
</style>