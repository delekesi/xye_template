<template>
    <el-container class="com_box">
        <common-top></common-top>
        <div class="com-body">
            <div class="com_swiper">
                <el-main>
                    <el-aside width="125px">
                        <common-aside></common-aside>
                    </el-aside>
                </el-main>
            </div>
            <div class="com_page">
                <router-view v-slot="{ Component }">
                    <transition>
                        <component :is="Component" />
                    </transition>
                </router-view>
            </div>
        </div>
    </el-container>
</template>
<script setup lang="ts">
import commonAside from '@/components/commonAside/commonAside.vue'
import commonTop from '@/components/commonTop/commonTop.vue'
</script>