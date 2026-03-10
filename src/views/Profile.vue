<template>
  <div class="profile">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>我的能力画像</span>
          <el-button type="primary" @click="uploadVisible = true">上传简历</el-button>
        </div>
      </template>
      <div v-if="profile">
        <h3>基础信息</h3>
        <p>{{ profile.name }} · {{ profile.major }} · {{ profile.grade }}</p>
        <h3>能力标签</h3>
        <div class="skills">
          <el-tag v-for="s in profile.skills.professionalSkills" :key="s">{{ s }}</el-tag>
        </div>
        <h3>能力维度评分</h3>
        <RadarChart :data="radarData" />
        <el-row :gutter="20">
          <el-col :span="12">
            <el-progress type="dashboard" :percentage="profile.completeness" :color="colors">
              <template #default>{{ profile.completeness }}%</template>
            </el-progress>
            <p>完整度</p>
          </el-col>
          <el-col :span="12">
            <el-progress type="dashboard" :percentage="profile.competitiveness" :color="colors">
              <template #default>{{ profile.competitiveness }}%</template>
            </el-progress>
            <p>竞争力</p>
          </el-col>
        </el-row>
      </div>
      <div v-else>
        <p>暂无能力数据，请上传简历或手动填写</p>
      </div>
    </el-card>

    <el-dialog v-model="uploadVisible" title="上传简历" width="30%">
      <el-upload drag :auto-upload="false" :on-change="handleUpload">
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">拖拽文件或 <em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">支持 PDF/DOCX 格式</div>
        </template>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="uploadVisible = false">取消</el-button>
          <el-button type="primary" @click="mockUpload">开始解析</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { mockStudentProfile } from '@/mock/student'
import RadarChart from '@/components/RadarChart.vue'
import { useUserStore } from '@/store'

const profile = ref(mockStudentProfile) // 模拟已解析
const userStore = useUserStore()
userStore.setStudentProfile(profile.value)

const uploadVisible = ref(false)
const colors = [
  { color: '#f56c6c', percentage: 60 },
  { color: '#e6a23c', percentage: 80 },
  { color: '#5cb87a', percentage: 100 },
]

const handleUpload = (file: any) => {
  console.log('上传文件', file)
}

const mockUpload = () => {
  // 模拟解析结果
  profile.value = mockStudentProfile
  userStore.setStudentProfile(profile.value)
  uploadVisible.value = false
}

const radarData = computed(() => {
  if (!profile.value) return { indicator: [], series: [] }
  const dims = profile.value.dimensions
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
    series: [{ name: '学生', value: Object.values(dims) }],
  }
})
</script>

<style scoped>
.skills {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
</style>