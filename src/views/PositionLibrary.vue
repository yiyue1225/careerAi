<template>
  <div class="position-library">
    <el-input v-model="search" placeholder="搜索岗位名称" style="width: 300px; margin-bottom: 20px" />
    <el-row :gutter="20">
      <el-col :span="8" v-for="pos in filteredPositions" :key="pos.id">
        <el-card class="position-card" shadow="hover" @click="$router.push(`/position/${pos.id}`)">
          <h3>{{ pos.name }}</h3>
          <p>{{ pos.company }} · {{ pos.location }}</p>
          <p class="salary">{{ pos.salary }}</p>
          <el-tag size="small" v-for="skill in pos.requirements.professionalSkills.slice(0,3)" :key="skill">{{ skill }}</el-tag>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'          // 加上这一行
import { positions } from '@/mock/positions'

const search = ref('')
const filteredPositions = computed(() =>
  positions.filter(p => p.name.includes(search.value))
)
</script>

<style scoped>
.position-card {
  cursor: pointer;
  margin-bottom: 20px;
}
.salary {
  color: #f56c6c;
  font-weight: bold;
}
</style>