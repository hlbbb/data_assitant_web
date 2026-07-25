<template>
  <div class="practice-page">
    <div class="practice-container" v-if="!loading && currentQuestion">
      <!-- 进度条 -->
      <div class="progress-section">
        <div class="progress-info">
          <span class="progress-text">{{ currentIndex + 1 }} / {{ questionList.length || 1 }}</span>
          <span class="progress-percent">{{ Math.round(((currentIndex + 1) / (questionList.length || 1)) * 100) }}%</span>
        </div>
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: ((currentIndex + 1) / (questionList.length || 1)) * 100 + '%' }"
          ></div>
        </div>
      </div>

      <!-- 题目信息 -->
      <div class="question-meta">
        <span class="tag" :class="`tag-${currentQuestion.difficulty}`">
          {{ getDifficultyLabel(currentQuestion.difficulty) }}
        </span>
        <span
          v-for="(tag, index) in currentQuestion.tags.slice(0, 2)"
          :key="index"
          class="tag tag-category"
        >
          {{ tag }}
        </span>
      </div>

      <!-- 题干 -->
      <div class="question-stem card">
        <p>{{ currentQuestion.stem }}</p>
      </div>

      <!-- 选项 -->
      <div class="options-area">
        <div
          v-for="option in currentQuestion.options"
          :key="option.label"
          class="option-card"
          :class="{
            selected: selectedOption === option.label && !showResult,
            correct: showResult && option.correct,
            wrong: showResult && selectedOption === option.label && !option.correct
          }"
          @click="onSelectOption(option)"
        >
          <div class="option-label">{{ option.label }}</div>
          <div class="option-text">{{ option.text }}</div>
          <div class="option-icon" v-if="showResult">
            <span v-if="option.correct" class="icon-correct">✓</span>
            <span v-else-if="selectedOption === option.label" class="icon-wrong">✗</span>
          </div>
        </div>
      </div>

      <!-- 答案解析 -->
      <div class="explanation card" v-if="showResult">
        <div class="result-banner" :class="isCorrect ? 'correct' : 'wrong'">
          <span class="result-icon">{{ isCorrect ? '🎉' : '😔' }}</span>
          <span class="result-text">{{ isCorrect ? '回答正确！' : '回答错误' }}</span>
        </div>
        <div class="explanation-content">
          <h4 class="explanation-title">答案解析</h4>
          <p class="explanation-text">{{ currentQuestion.explanation }}</p>
        </div>
      </div>

      <!-- 底部操作 -->
      <div class="bottom-actions" v-if="showResult">
        <button
          v-if="currentIndex + 1 < questionList.length"
          class="btn-primary next-btn"
          @click="onNext"
        >
          下一题
        </button>
        <button
          v-else
          class="btn-primary next-btn"
          @click="onFinish"
        >
          完成练习
        </button>
      </div>
    </div>

    <!-- 加载中 -->
    <div class="loading-page" v-if="loading">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>

    <!-- 导航栏 -->
    <div class="nav-bar" v-if="!loading">
      <router-link to="/" class="nav-item">
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuestionStore } from '../stores/question'

const router = useRouter()
const route = useRoute()
const store = useQuestionStore()

const loading = ref(true)
const currentQuestion = ref(null)
const selectedOption = ref(null)
const showResult = ref(false)
const isCorrect = ref(false)
const questionList = ref([])
const currentIndex = ref(0)
const mode = ref('single')

onMounted(async () => {
  store.loadRecords()

  // 判断模式
  if (route.query.mode === 'random') {
    mode.value = 'random'
    await loadRandomQuestions()
  } else if (route.params.id) {
    mode.value = 'single'
    await loadSingleQuestion(route.params.id)
  } else {
    // 默认随机练习
    mode.value = 'random'
    await loadRandomQuestions()
  }
})

// 监听路由变化
watch(() => route.params.id, async (newId) => {
  if (newId) {
    await loadSingleQuestion(newId)
  }
})

const loadSingleQuestion = async (id) => {
  loading.value = true
  const question = store.getQuestionById(id)
  if (question) {
    currentQuestion.value = question
    questionList.value = [question]
    resetState()
  }
  loading.value = false
}

const loadRandomQuestions = async () => {
  loading.value = true
  const allQuestions = [...store.questions]

  // 打乱顺序
  const shuffled = shuffleArray(allQuestions)

  // 取前20题
  questionList.value = shuffled.slice(0, 20)

  if (questionList.value.length > 0) {
    currentQuestion.value = questionList.value[0]
    currentIndex.value = 0
  }

  resetState()
  loading.value = false
}

const shuffleArray = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const resetState = () => {
  selectedOption.value = null
  showResult.value = false
  isCorrect.value = false
}

const getDifficultyLabel = (difficulty) => {
  const map = { easy: '简单', medium: '中等', hard: '困难' }
  return map[difficulty] || difficulty
}

const onSelectOption = (option) => {
  if (showResult.value) return

  selectedOption.value = option.label
  const correctOption = currentQuestion.value.options.find(o => o.correct)
  isCorrect.value = option.label === correctOption.label
  showResult.value = true

  // 提交答案
  store.submitAnswer(currentQuestion.value.id, option.label, isCorrect.value)

  // 震动反馈
  if (navigator.vibrate) {
    navigator.vibrate(isCorrect.value ? 50 : 100)
  }
}

const onNext = () => {
  const nextIndex = currentIndex.value + 1
  if (nextIndex < questionList.value.length) {
    currentIndex.value = nextIndex
    currentQuestion.value = questionList.value[nextIndex]
    resetState()
  }
}

const onFinish = () => {
  router.push('/profile')
}
</script>

<style scoped>
.practice-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 80px;
}

.practice-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.progress-section {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.progress-text {
  font-size: 14px;
  color: #666;
}

.progress-percent {
  font-size: 14px;
  font-weight: 600;
  color: #667eea;
}

.question-meta {
  margin-bottom: 16px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.question-stem {
  font-size: 16px;
  line-height: 1.8;
  color: #333;
}

.question-stem p {
  margin: 0;
}

.options-area {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.option-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.option-card:hover:not(.correct):not(.wrong) {
  border-color: #667eea;
  transform: translateX(4px);
}

.option-card.selected {
  border-color: #667eea;
  background: #f0f4ff;
}

.option-card.correct {
  border-color: #4caf50;
  background: #e8f5e9;
}

.option-card.wrong {
  border-color: #f44336;
  background: #ffebee;
}

.option-label {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #667eea;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.option-card.correct .option-label {
  background: #4caf50;
}

.option-card.wrong .option-label {
  background: #f44336;
}

.option-text {
  flex: 1;
  font-size: 15px;
  color: #333;
  line-height: 1.6;
}

.option-icon {
  font-size: 24px;
}

.icon-correct {
  color: #4caf50;
}

.icon-wrong {
  color: #f44336;
}

.explanation {
  margin-bottom: 16px;
}

.result-banner {
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.result-banner.correct {
  background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
  color: white;
}

.result-banner.wrong {
  background: linear-gradient(135deg, #f44336 0%, #ef5350 100%);
  color: white;
}

.result-icon {
  font-size: 24px;
}

.result-text {
  font-size: 18px;
  font-weight: 600;
}

.explanation-content {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.explanation-title {
  font-size: 14px;
  font-weight: 600;
  color: #666;
  margin-bottom: 8px;
}

.explanation-text {
  font-size: 14px;
  color: #333;
  line-height: 1.8;
  margin: 0;
}

.bottom-actions {
  display: flex;
  justify-content: center;
}

.next-btn {
  min-width: 200px;
  padding: 16px 40px;
  font-size: 18px;
}

.loading-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: white;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
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
  .practice-container {
    padding: 12px;
  }

  .question-stem {
    font-size: 15px;
  }

  .option-text {
    font-size: 14px;
  }
}
</style>
