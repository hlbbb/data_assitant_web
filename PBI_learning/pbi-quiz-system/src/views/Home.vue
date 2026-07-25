<template>
  <div class="home-page">
    <div class="header">
      <h1 class="title">Power BI 刷题练习系统</h1>
      <p class="subtitle">掌握 Power BI 核心技能，提升数据分析能力</p>
    </div>

    <div class="stats-overview card">
      <div class="stat-item">
        <div class="stat-value">{{ stats.total }}</div>
        <div class="stat-label">已答题数</div>
      </div>
      <div class="stat-item">
        <div class="stat-value correct">{{ stats.correct }}</div>
        <div class="stat-label">正确数</div>
      </div>
      <div class="stat-item">
        <div class="stat-value wrong">{{ stats.wrong }}</div>
        <div class="stat-label">错误数</div>
      </div>
      <div class="stat-item">
        <div class="stat-value accuracy">{{ stats.accuracy }}%</div>
        <div class="stat-label">正确率</div>
      </div>
    </div>

    <div class="action-buttons">
      <button class="btn-primary action-btn" @click="startRandomPractice">
        <span class="btn-icon">🎲</span>
        <span>随机练习</span>
      </button>
      <button class="btn-secondary action-btn" @click="goToQuestionList">
        <span class="btn-icon">📋</span>
        <span>题库列表</span>
      </button>
    </div>

    <div class="category-section card">
      <h3 class="section-title">按分类练习</h3>
      <div class="category-grid">
        <div
          v-for="cat in categories"
          :key="cat.key"
          class="category-card"
          @click="goToCategory(cat.key)"
        >
          <div class="category-icon">{{ cat.icon }}</div>
          <div class="category-name">{{ cat.label }}</div>
          <div class="category-count">{{ getCategoryCount(cat.key) }} 题</div>
        </div>
      </div>
    </div>

    <div class="difficulty-section card">
      <h3 class="section-title">按难度练习</h3>
      <div class="difficulty-grid">
        <div
          v-for="diff in difficulties"
          :key="diff.key"
          class="difficulty-card"
          :class="`difficulty-${diff.key}`"
          @click="goToDifficulty(diff.key)"
        >
          <div class="difficulty-name">{{ diff.label }}</div>
          <div class="difficulty-count">{{ getDifficultyCount(diff.key) }} 题</div>
        </div>
      </div>
    </div>

    <div class="nav-bar">
      <router-link to="/" class="nav-item active">
        <span class="nav-icon">🏠</span>
        <span>首页</span>
      </router-link>
      <router-link to="/list" class="nav-item">
        <span class="nav-icon">📋</span>
        <span>题库</span>
      </router-link>
      <router-link to="/profile" class="nav-item">
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

const stats = computed(() => store.stats)

const categories = [
  { key: 'basic', label: '基础操作', icon: '🎯' },
  { key: 'dax', label: 'DAX 函数', icon: '📊' },
  { key: 'datamodel', label: '数据模型', icon: '🔗' },
  { key: 'powerquery', label: 'Power Query', icon: '⚙️' },
  { key: 'visual', label: '可视化', icon: '📈' },
  { key: 'service', label: 'Power BI Service', icon: '☁️' },
  { key: 'dataconnect', label: '数据连接', icon: '🔌' },
  { key: 'security', label: '安全权限', icon: '🔒' }
]

const difficulties = [
  { key: 'easy', label: '简单' },
  { key: 'medium', label: '中等' },
  { key: 'hard', label: '困难' }
]

const getCategoryCount = (category) => {
  return store.questions.filter(q => q.category === category).length
}

const getDifficultyCount = (difficulty) => {
  return store.questions.filter(q => q.difficulty === difficulty).length
}

const startRandomPractice = () => {
  router.push('/practice?mode=random')
}

const goToQuestionList = () => {
  router.push('/list')
}

const goToCategory = (category) => {
  router.push(`/list?category=${category}`)
}

const goToDifficulty = (difficulty) => {
  router.push(`/list?difficulty=${difficulty}`)
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  padding-bottom: 80px;
}

.header {
  text-align: center;
  padding: 40px 20px;
  color: white;
}

.title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
}

.subtitle {
  font-size: 16px;
  opacity: 0.9;
}

.stats-overview {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin: 0 20px 24px;
}

.stat-item {
  text-align: center;
  padding: 16px 0;
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
  color: #999;
}

.action-buttons {
  display: flex;
  gap: 16px;
  margin: 0 20px 24px;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  font-size: 16px;
}

.btn-icon {
  font-size: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.category-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.category-card:hover {
  background: #667eea;
  color: white;
  transform: translateY(-2px);
}

.category-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.category-name {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.category-count {
  font-size: 12px;
  opacity: 0.7;
}

.difficulty-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.difficulty-card {
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  color: white;
}

.difficulty-easy {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
}

.difficulty-medium {
  background: linear-gradient(135deg, #ff9800 0%, #ffb74d 100%);
}

.difficulty-hard {
  background: linear-gradient(135deg, #f44336 0%, #ef5350 100%);
}

.difficulty-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.difficulty-name {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.difficulty-count {
  font-size: 14px;
  opacity: 0.9;
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
  transition: color 0.3s;
}

.nav-item.active {
  color: #667eea;
}

.nav-icon {
  font-size: 20px;
  margin-bottom: 4px;
}

@media (max-width: 768px) {
  .stats-overview {
    grid-template-columns: repeat(2, 1fr);
  }

  .category-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .difficulty-grid {
    grid-template-columns: 1fr;
  }
}
</style>
