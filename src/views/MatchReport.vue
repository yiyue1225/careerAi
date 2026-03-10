<template>
  <div class="match-report">
    <el-steps :active="activeStep" finish-status="success" align-center>
      <el-step title="选择目标岗位" />
      <el-step title="人岗匹配分析" />
      <el-step title="职业发展路径" />
      <el-step title="行动计划" />
    </el-steps>

    <div v-if="activeStep === 0" class="step-content">
      <h3>选择您感兴趣的目标岗位</h3>
      <el-select v-model="selectedPositionId" placeholder="请选择" size="large" style="width: 300px">
        <el-option v-for="p in positions" :key="p.id" :label="p.name" :value="p.id" />
      </el-select>
      <div class="step-actions">
        <el-button type="primary" @click="nextStep" :disabled="!selectedPositionId">下一步</el-button>
      </div>
    </div>

    <div v-else-if="activeStep === 1" class="step-content">
      <h3>人岗匹配度分析</h3>
      <el-row :gutter="20">
        <el-col :span="16">
          <RadarChart :data="matchRadarData" />
        </el-col>
        <el-col :span="8">
          <el-card>
            <template #header>综合匹配度</template>
            <el-progress type="dashboard" :percentage="matchScore" :color="colors" />
          </el-card>
        </el-col>
      </el-row>
      <el-table :data="matchDetails" style="margin-top:20px">
        <el-table-column prop="dimension" label="维度" />
        <el-table-column prop="student" label="学生得分" />
        <el-table-column prop="position" label="岗位要求" />
        <el-table-column prop="gap" label="差距" />
        <el-table-column prop="suggestion" label="建议" />
      </el-table>
      <div class="step-actions">
        <el-button @click="prevStep">上一步</el-button>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </div>
    </div>

    <div v-else-if="activeStep === 2" class="step-content">
      <h3>职业发展路径</h3>
      <RelationGraph :nodes="graph.nodes" :links="graph.links" />
      <el-descriptions title="行业趋势" :column="1" border>
        <el-descriptions-item label="社会需求">未来5年需求增长20%</el-descriptions-item>
        <el-descriptions-item label="薪资趋势">平均每年涨幅8%</el-descriptions-item>
      </el-descriptions>
      <div class="step-actions">
        <el-button @click="prevStep">上一步</el-button>
        <el-button type="primary" @click="nextStep">下一步</el-button>
      </div>
    </div>

    <div v-else-if="activeStep === 3" class="step-content">
      <h3>个性化行动计划</h3>
      <el-timeline>
        <el-timeline-item timestamp="短期 (1年内)" placement="top">
          <el-card>
            <p>学习路径：完成Java进阶课程，掌握Spring Cloud</p>
            <p>实践安排：参与开源项目或找一份后端实习</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="中期 (2-3年)" placement="top">
          <el-card>
            <p>学习路径：学习系统设计、分布式架构</p>
            <p>实践安排：争取成为项目核心开发，考取相关证书</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <h4>评估周期与指标</h4>
      <p>每季度复盘：技能掌握度、项目经验、面试表现</p>
      <el-button type="primary" @click="showReportDialog = true">生成完整报告</el-button>
    </div>

    <el-dialog v-model="showReportDialog" title="职业生涯发展报告" width="60%">
      <div id="reportContent" ref="reportContent">
        <h2>职业生涯发展报告</h2>
        <p>生成时间：{{ new Date().toLocaleDateString() }}</p>
        <h3>一、职业目标</h3>
        <p>目标岗位：{{ targetPosition?.name }}</p>
        <h3>二、人岗匹配分析</h3>
        <p>综合匹配度：{{ matchScore }}%</p>
        <h3>三、发展路径</h3>
        <ul>
          <li>初级 → 高级 → 技术主管</li>
          <li>可转换方向：大数据开发、前端开发</li>
        </ul>
        <h3>四、行动计划</h3>
        <p>短期：... 中期：...</p>
      </div>
      <template #footer>
        <el-button @click="showReportDialog = false">取消</el-button>
        <el-button type="primary" @click="exportPDF">导出PDF</el-button>
        <el-button type="success" @click="smartPolish">智能润色</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { positions, getPositionById } from '@/mock/positions'
import { graphData } from '@/mock/graph'
import { useUserStore } from '@/store'
import RadarChart from '@/components/RadarChart.vue'
import RelationGraph from '@/components/RelationGraph.vue'
import html2pdf from 'html2pdf.js' // 需要安装：npm install html2pdf.js

const activeStep = ref(0)
const selectedPositionId = ref('')
const userStore = useUserStore()
const studentProfile = userStore.studentProfile
const targetPosition = computed(() => getPositionById(selectedPositionId.value))

// 模拟匹配得分
const matchScore = ref(78)
const colors = [{ color: '#f56c6c', percentage: 60 }, { color: '#e6a23c', percentage: 80 }, { color: '#5cb87a', percentage: 100 }]

const matchRadarData = computed(() => {
  if (!studentProfile || !targetPosition.value) return { indicator: [], series: [] }
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
    series: [
      { name: '学生', value: Object.values(studentProfile.dimensions) },
      { name: targetPosition.value.name, value: Object.values(targetPosition.value.dimensions) },
    ],
  }
})

const matchDetails = computed(() => {
  if (!studentProfile || !targetPosition.value) return []
  const dims = ['professional', 'certificate', 'innovation', 'learning', 'stress', 'communication', 'internship']
  const dimNames = ['专业技能', '证书', '创新能力', '学习能力', '抗压能力', '沟通能力', '实习经验']
  return dims.map((d, idx) => {
    const s = studentProfile.dimensions[d as keyof typeof studentProfile.dimensions] || 0
    const p = targetPosition.value.dimensions[d as keyof typeof targetPosition.value.dimensions] || 0
    const gap = p - s
    return {
      dimension: dimNames[idx],
      student: s,
      position: p,
      gap: gap > 0 ? `缺${gap}` : '满足',
      suggestion: gap > 0 ? `建议提升${gap}分` : '继续保持',
    }
  })
})

const nextStep = () => {
  if (activeStep.value < 3) activeStep.value++
}
const prevStep = () => {
  if (activeStep.value > 0) activeStep.value--
}

// 报告相关
const showReportDialog = ref(false)
const reportContent = ref<HTMLElement>()
const exportPDF = () => {
  if (reportContent.value) {
    html2pdf().from(reportContent.value).save('职业发展报告.pdf')
  }
}
const smartPolish = () => {
  // 调用大模型API润色报告内容，这里模拟
  alert('已调用AI润色，报告语言更精炼！')
}
</script>

<style scoped>
.step-content {
  margin-top: 30px;
  min-height: 400px;
}
.step-actions {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>