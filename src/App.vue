<template>
  <el-config-provider :locale="zhCn">
    <Layout />
  </el-config-provider>
</template>

<script setup lang="ts">
import Layout from '@/components/Layout.vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>