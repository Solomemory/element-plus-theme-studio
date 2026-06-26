<template>
  <el-config-provider :locale="elementLocale">
    <ThemeStudio />
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import ThemeStudio from './pages/ThemeStudio.vue'
import { useI18n } from './i18n'

const { locale } = useI18n()
const elementLocale = computed(() => (locale.value === 'zh-CN' ? zhCn : en))
</script>
