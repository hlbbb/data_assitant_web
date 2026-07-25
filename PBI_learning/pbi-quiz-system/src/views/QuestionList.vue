<template>
  <div class="question-list-page">
    <div class="page-header">
      <button class="back-btn" @click="goBack">← 返回</button>
      <h2 class="page-title">题库列表</h2>
    </div>

    <div class="filters card">
      <div class="filter-group">
        <label class="filter-label">难度筛选</label>
        <div class="filter-options">
          <span
            v-for="(diff, index) in difficulties"
            :key="diff.key"
            class="filter-tag"
            :class="{ active: currentDifficulty === diff.key }"
            @click="onDifficultyChange(diff.key)"
          >
            {{ diff.label }}
          </span>
        </div>
      </div>

      <div class="filter-group">
        <label class="filter-label">分类筛选</label>
        <div class="filter-options">
          <span
            v-for="cat in categories"
            :key="cat.key"
            class="filter-tag"
            :class="{ active: currentCategory === cat.key }"
            @click="onCategoryChange(cat.key)"
          >
            {{ cat.label }}
          </span>
        </div>
      </div>

      <div class="search-box">
        <input
          v-model="keyword"
          type="text"
          placeholder="搜索题目..."
          class="search-input"
          @keyup.enter="onSearch"
        />
        <button class="search-btn" @click="onSearch">搜索</button>
      </div>
    </div>

    <div class="question-count">
      共 <strong>{{ filteredQuestions.length }}</strong> 道题目
    </div>

    <div class="question-list">
      <div
        v-for="(question, index) in filteredQuestions"
        :key="question.id"
        class="question-item card"
        @click="goToPractice(question.id)"
      >
        <div class="question-header">
          <span class="question-number">{{ index + 1 }}</span>
          <span class="tag" :class="`tag-${question.difficulty}`">
            {{ getDifficultyLabel(question.difficulty) }}
          </span>
          <span class="tag tag-category">{{ getCategoryLabel(question.category) }}</span>
        </div>
        <div class="question-stem">{{ question.stem }}</div>
        <div class="question-tags">
          <span v-for="tag in question.tags" :key="tag" class="mini-tag">{{ tag }}</span>
        </div>
        <div class="question-status" v-if="getQuestionStatus(question.id)">
          <span class="status-correct" v-if="getQuestionStatus(question.id).isCorrect">✓ 已答对</span>
          <span class="status-wrong" v-else>✗ 已答错</span>
        </div>
      </div>
    </div>

    <div class="nav-bar">
      <router-link to="/" class="nav-item">
        <span class="nav-icon">🏠</span>
        <span>首页</span>
      </router-link>
      <router-link to="/list" class="nav-item active">
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
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuestionStore } from '../stores/question'

const router = useRouter()
const route = useRoute()
const store = useQuestionStore()

const currentDifficulty = ref('')
const currentCategory = ref('')
const keyword = ref('')

onMounted(() => {
  if (route.query.difficulty) {
    currentDifficulty.value = route.query.difficulty
  }
  if (route.query.category) {
    currentCategory.value = route.query.category
  }
  store.loadRecords()
})

const difficulties = [
  { key: '', label: '全部' },
  { key: 'easy', label: '简单' },
  { key: 'medium', label: '中等' },
  { key: 'hard', label: '困难' }
]

const categories = [
  { key: '', label: '全部' },
  { key: 'basic', label: '基础操作' },
  { key: 'dax', label: 'DAX 函数' },
  { key: 'datamodel', label: '数据模型' },
  { key: 'powerquery', label: 'Power Query' },
  { key: 'visual', label: '可视化' },
  { key: 'service', label: 'Power BI Service' },
  { key: 'dataconnect', label: '数据连接' },
  { key: 'security', label: '安全权限' },
  { key: 'datarefresh', label: '数据刷新' }
]

const filteredQuestions = computed(() => {
  return store.getQuestionList({
    difficulty: currentDifficulty.value,
    category: currentCategory.value,
    keyword: keyword.value
  })
})

const getDifficultyLabel = (difficulty) => {
  const map = { easy: '简单', medium: '中等', hard: '困难' }
  return map[difficulty] || difficulty
}

const getCategoryLabel = (category) => {
  const cat = categories.find(c => c.key === category)
  return cat ? cat.label : category
}

const getQuestionStatus = (questionId) => {
  return store.records.find(r => r.questionId === questionId)
}

const onDifficultyChange = (key) => {
  currentDifficulty.value = key
}

const onCategoryChange = (key) => {
  currentCategory.value = key
}

const onSearch = () => {
  // 搜索逻辑已通过 computed 自动处理
}

const goToPractice = (id) => {
  router.push(`/practice/${id}`)
}

const goBack = () => {
  router.push('/')
}
</script>

<style scoped>
.question-list-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 80px;
}

.page-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
}

.page-title {
  color: white;
  font-size: 20px;
  font-weight: 600;
}

.filters {
  margin: 16px;
}

.filter-group {
  margin-bottom: 16px;
}

.filter-label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-tag {
  display: inline-block;
  padding: 6px 16px;
  background: #f0f0f0;
  border-radius: 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-tag.active {
  background: #667eea;
  color: white;
}

.search-box {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}

.search-input {
  flex: 1;
  padding: 10px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
}

.search-btn {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.question-count {
  padding: 0 16px;
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.question-list {
  padding: 0 16px;
}

.question-item {
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.question-item:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.question-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.question-number {
  background: #667eea;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.question-stem {
  font-size: 15px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 8px;
}

.question-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.mini-tag {
  padding: 2px 8px;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
}

.question-status {
  margin-top: 8px;
  font-size: 12px;
}

.status-correct {
  color: #4caf50;
}

.status-wrong {
  color: #f44336;
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
</style>
