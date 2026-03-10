<template>
  <div v-if="position" class="position-detail">
    <el-page-header @back="$router.back()" content="岗位详情" />
    <el-card class="detail-card">
      <h2>{{ position.name }}</h2>
      <p>{{ position.company }} | {{ position.industry }} | {{ position.location }}</p>
      <p class="salary">{{ position.salary }}</p>
      <el-divider />
      <h3>岗位描述</h3>
      <p>{{ position.description }}</p>
      <h3>任职要求</h3>
      <el-descriptions :column="2" border>
        <el-descriptions-item label="专业技能">
          <el-tag v-for="s in position.requirements.professionalSkills" :key="s">{{ s }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="证书要求">
          {{ position.requirements.certificates.join('、') || '无' }}
        </el-descriptions-item>
        <el-descriptions-item label="创新能力">{{ position.requirements.innovation }} /5</el-descriptions-item>
        <el-descriptions-item label="学习能力">{{ position.requirements.learningAbility }} /5</el-descriptions-item>
        <el-descriptions-item label="抗压能力">{{ position.requirements.stressTolerance }} /5</el-descriptions-item>
        <el-descriptions-item label="沟通能力">{{ position.requirements.communication }} /5</el-descriptions-item>
        <el-descriptions-item label="实习经验">{{ position.requirements.internship.join('；') }}</el-descriptions-item>
      </el-descriptions>
      <h3>能力要求雷达图</h3>
      <RadarChart :data="radarData" />
      <h3>岗位关联图谱</h3>
      <RelationGraph :nodes="graph.nodes" :links="graph.links" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { positions } from '@/mock/positions'
import { graphData } from '@/mock/graph'
import RadarChart from '@/components/RadarChart.vue'
import RelationGraph from '@/components/RelationGraph.vue'

const route = useRoute()
const position = positions.find(p => p.id === route.params.id)

const radarData = computed(() => {
  if (!position) return { indicator: [], series: [] }
  const dims = position.dimensions
  return {
    indicator: [
      { name: '专业技能', max: 100 },
      { name: '证书', max: 100 },
      { name: '创新能力', max: 100 },
      { name: '学习能力', max: 100 },
      { name: '抗压能力', max: 100 },
      { name: '沟通能力', max: 100 },
      { name: '实习经验', max: 100 },
    ],
    series: [{ name: position.name, value: Object.values(dims) }],
  }
})

const graph = graphData // 实际应根据岗位ID筛选，这里用全局mock
</script>