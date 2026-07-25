<template>
  <div class="profile-page">
    <div class="profile-header">
      <div class="avatar">👤</div>
      <h2 class="user-name">学习者</h2>
      <p class="join-date">加入时间: {{ joinDate }}</p>
    </div>

    <div class="stats-section card">
      <h3 class="section-title">学习统计</h3>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{{ stats.total }}</div>
          <div class="stat-label">总答题数</div>
        </div>
        <div class="stat-card">
          <div class="stat-value correct">{{ stats.correct }}</div>
          <div class="stat-label">答对数</div>
        </div>
        <div class="stat-card">
          <div class="stat-value wrong">{{ stats.wrong }}</div>
          <div class="stat-label">答错数</div>
        </div>
        <div class="stat-card">
          <div class="stat-value accuracy">{{ stats.accuracy }}%</div>
          <div class="stat-label">正确率</div>
        </div>
      </div>
    </div>

    <div class="difficulty-section card">
      <h3 class="section-title">按难度统计</h3>
      <div class="difficulty-stats">
        <div class="difficulty-item">
          <div class="difficulty-header">
            <span class="difficulty-label">简单</span>
            <span class="difficulty-rate">
              {{ statsByDifficulty.easy.correct }}/{{ statsByDifficulty.easy.total }}
            </span>
          </div>
          <div class="progress-bar">
            <div
              class="progress-fill easy"
              :style="{ width: getProgressWidth('easy') }"
            ></div>
          </div>
        </div>

        <div class="difficulty-item">
          <div class="difficulty-header">
            <span class="difficulty-label">中等</span>
            <span class="difficulty-rate">
              {{ statsByDifficulty.medium.correct }}/{{ statsByDifficulty.medium.total }}
            </span>
          </div>
          <div class="progress-bar">
            <div
              class="progress-fill medium"
              :style="{ width: getProgressWidth('medium') }"
            ></div>
          </div>
        </div>

        <div class="difficulty-item">
          <div class="difficulty-header">
            <span class="difficulty-label">困难</span>
            <span class="difficulty-rate">
              {{ statsByDifficulty.hard.correct }}/{{ statsByDifficulty.hard.total }}
            </span>
          </div>
          <div class="progress-bar">
            <div
              class="progress-fill hard"
              :style="{ width: getProgressWidth('hard') }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="category-section card">
      <h3 class="section-title">按分类统计</h3>
      <div class="category-stats">
        <div
          v-for="(data, category) in statsByCategory"
          :key="category"
          class="category-item"
        >
          <div class="category-header">
            <span class="category-label">{{ getCategoryLabel(category) }}</span>
            <span class="category-rate">{{ data.correct }}/{{ data.total }}</span>
          </div>
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: getCategoryProgressWidth(data) }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="recent-section card">
      <h3 class="section-title">最近答题记录</h3>
      <div class="record-list" v-if="recentRecords.length > 0">
        <div
          v-for="record in recentRecords"
          :key="record.id"
          class="record-item"
          @click="goToQuestion(record.questionId)"
        >
          <div class="record-status" :class="record.isCorrect ? 'correct' : 'wrong'">
            {{ record.isCorrect ? '✓' : '✗' }}
          </div>
          <div class="record-info">
            <div class="record-title">{{ getQuestionStem(record.questionId) }}</div>
            <div class="record-time">{{ formatTime(record.timestamp) }}</div>
          </div>
        </div>
      </div>
      <div class="empty-state" v-else>
        <p>暂无答题记录</p>
        <button class="btn-primary" @click="startPractice">开始练习</button>
      </div>
    </div>

    <div class="actions-section card">
      <button class="clear-btn" @click="confirmClear">
        清空答题记录
      </button>
    </div>

    <div class="nav-bar">
      <router-link to="/" class="nav-item">
        <span class="nav-icon">🏠</span>
        <span>首页</span>
      </router-link>
      <router-link to="/list" class="nav-item">
        <span class="nav-icon">📋</span>
        <span>题库</span>
      </router-link>
      <router-link to="/profile" class="nav-item active">
        <span class="nav-icon">👤</span>
        <span>我的</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuestionStore } from '../stores/question'

const router = useRouter()
const store = useQuestionStore()

onMounted(() => {
  store.loadRecords()
})

const joinDate = computed(() => {
  const saved = localStorage.getItem('pbi-quiz-join-date')
  if (saved) return saved

  const now = new Date().toLocaleDateString('zh-CN')
  localStorage.setItem('pbi-quiz-join-date', now)
  return now
})

const stats = computed(() => store.stats)
const statsByDifficulty = computed(() => store.statsByDifficulty)
const statsByCategory = computed(() => store.statsByCategory)

const recentRecords = computed(() => {
  return [...store.records]
    .reverse()
    .slice(0, 10)
})

const getProgressWidth = (difficulty) => {
  const data = statsByDifficulty.value[difficulty]
  if (data.total === 0) return '0%'
  return Math.round((data.correct / data.total) * 100) + '%'
}

const getCategoryProgressWidth = (data) => {
  if (data.total === 0) return '0%'
  return Math.round((data.correct / data.total) * 100) + '%'
}

const getCategoryLabel = (category) => {
  const map = {
    basic: '基础操作',
    dax: 'DAX 函数',
    datamodel: '数据模型',
    powerquery: 'Power Query',
    visual: '可视化',
    service: 'Power BI Service',
    dataconnect: '数据连接',
    security: '安全权限',
    datarefresh: '数据刷新'
  }
  return map[category] || category
}

const getQuestionStem = (questionId) => {
  const question = store.getQuestionById(questionId)
  if (!question) return '题目已删除'
  return question.stem.slice(0, 50) + (question.stem.length > 50 ? '...' : '')
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now - date

  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return Math.floor(diff / 60000) + ' 分钟前'
  if (diff < 86400000) return Math.floor(diff / 3600000) + ' 小时前'
  return date.toLocaleDateString('zh-CN')
}

const goToQuestion = (questionId) => {
  router.push(`/practice/${questionId}`)
}

const startPractice = () => {
  router.push('/practice?mode=random')
}

const confirmClear = () => {
  if (confirm('确定要清空所有答题记录吗？此操作不可恢复。')) {
    store.clearRecords()
  }
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 80px;
}

.profile-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
  text-align: center;
  color: white;
}

.avatar {
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin: 0 auto 16px;
}

.user-name {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
}

.join-date {
  font-size: 14px;
  opacity: 0.8;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.stat-card {
  text-align: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 12px;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
}

.stat-value.correct {
  color: #4caf50;
}

.stat-value.wrong {
  color: #f44336;
}

.stat-value.accuracy {
  color: #667eea;
}

.stat-label {
  font-size: 12px;
  color: #666;
}

.difficulty-item,
.category-item {
  margin-bottom: 16px;
}

.difficulty-header,
.category-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.difficulty-label,
.category-label {
  font-size: 14px;
  color: #333;
}

.difficulty-rate,
.category-rate {
  font-size: 14px;
  color: #666;
}

.progress-fill.easy {
  background: linear-gradient(90deg, #4caf50 0%, #66bb6a 100%);
}

.progress-fill.medium {
  background: linear-gradient(90deg, #ff9800 0%, #ffb74d 100%);
}

.progress-fill.hard {
  background: linear-gradient(90deg, #f44336 0%, #ef5350 100%);
}

.record-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.record-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.record-item:hover {
  background: #f0f0f0;
}

.record-status {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.record-status.correct {
  background: #e8f5e9;
  color: #4caf50;
}

.record-status.wrong {
  background: #ffebee;
  color: #f44336;
}

.record-info {
  flex: 1;
}

.record-title {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
}

.record-time {
  font-size: 12px;
  color: #999;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
}

.empty-state p {
  color: #999;
  margin-bottom: 16px;
}

.actions-section {
  text-align: center;
}

.clear-btn {
  background: white;
  color: #f44336;
  border: 1px solid #f44336;
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.clear-btn:hover {
  background: #f44336;
  color: white;
}

.nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.08);
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #999;
  font-size: 12px;
}

.nav-item.active {
  color: #667eea;
}

.nav-icon {
  font-size: 20px;
  margin-bottom: 4px;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
