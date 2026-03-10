<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="card" shadow="hover">
          <template #header>
            <div class="card-header">
              <el-icon :size="20"><Briefcase /></el-icon>
              <span>岗位画像库</span>
            </div>
          </template>
          <p>浏览100+岗位画像，了解行业要求</p>
          <el-button type="primary" @click="$router.push('/positions')">立即查看</el-button>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="card" shadow="hover">
          <template #header>
            <div class="card-header">
              <el-icon :size="20"><User /></el-icon>
              <span>我的能力画像</span>
            </div>
          </template>
          <p>上传简历，AI解析生成你的能力图谱</p>
          <el-button type="primary" @click="$router.push('/profile')">开始测评</el-button>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="card" shadow="hover">
          <template #header>
            <div class="card-header">
              <el-icon :size="20"><DataLine /></el-icon>
              <span>职业匹配报告</span>
            </div>
          </template>
          <p>获取个性化职业规划与发展路径</p>
          <el-button type="primary" @click="$router.push('/match')">生成报告</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { Briefcase, User, DataLine } from '@element-plus/icons-vue'
</script>

<style scoped>
.home {
  padding: 20px;
}
.card {
  height: 200px;
}
.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
}
</style>