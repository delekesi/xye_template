<template>
  <div id="app" class="app">
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
  </div>
</template>


<script setup lang="ts">
import {
  computed,
  ref
} from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en.mjs'
const language = ref<string>('zh-cn')
const locale = computed(() => (language.value === 'zh-cn' ? zhCn : en))
</script>

<style>
@import './assets/css/basic.scss';
</style>
