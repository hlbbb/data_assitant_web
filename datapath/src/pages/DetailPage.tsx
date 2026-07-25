import { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { extractSetupSql, default as TutorialRenderer, type Heading } from '../components/TutorialRenderer'
import SqlPlayground from '../components/SqlPlayground'
import PythonPlayground from '../components/PythonPlayground'
import PaywallOverlay from '../components/PaywallOverlay'
import { useProgress } from '../hooks/useProgress'
import { getStage, getCourse } from '../data/courses'
import { isStageAccessible } from '../utils/access'
import { getIcon } from '../utils/iconMap'
import Skeleton from '../components/Skeleton'
import './DetailPage.css'

interface DetailPageProps {
  type: 'sql' | 'python' | 'thinking'
}

const sqlModules = import.meta.glob('../../../sql_learning/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const pyModules = import.meta.glob('../../../python_learning/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const thinkingModules = import.meta.glob('../../../data_tk_learning/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function findModuleContent(
  modules: Record<string, string>,
  pattern: string
): string | null {
  for (const path of Object.keys(modules)) {
    if (path.includes(pattern)) return modules[path]
  }
  return null
}

// 从 MD 内容中提取学习目标
function extractLearningGoals(content: string): string[] {
  const goals: string[] = []
  const lines = content.split('\n')
  let inGoalsSection = false

  for (const line of lines) {
    // 匹配 "瀛﹀畬浣犺兘鍋? 鎴?"学习目标" 绛夋爣棰?    
    if (/^##?\s*(学完你能做|学习目标|本节要点)/.test(line)) {
      inGoalsSection = true
      continue
    }
    // 遇到下一个标题则停止
    if (inGoalsSection && /^##?\s+/.test(line)) {
      break
    }
    // 提取列表项
    if (inGoalsSection && /^[-*]\s+/.test(line)) {
      const goal = line.replace(/^[-*]\s+/, '').replace(/\*\*/g, '').trim()
      if (goal) goals.push(goal)
    }
  }
  return goals
}

// 从 MD 内容中提取核心知识点
function extractKeyPoints(content: string): string[] {
  const points: string[] = []
  const lines = content.split('\n')
  let inPointsSection = false

  for (const line of lines) {
    // 匹配 "鏍稿績鐭ヨ瘑鐐? 鎴?"鐭ヨ瘑鐐? 鏍囬
    if (/^##?\s*(核心知识|重点内容)/.test(line)) {
      inPointsSection = true
      continue
    }
    if (inPointsSection && /^##?\s+/.test(line)) {
      break
    }
    if (inPointsSection && /^[-*]\s+/.test(line)) {
      const point = line.replace(/^[-*]\s+/, '').replace(/\*\*/g, '').trim()
      if (point) points.push(point)
    }
  }

  // 濡傛灉没有专门的知识点部分,浠?h2 鏍囬涓彁鍙?  
  if (points.length === 0) {
    for (const line of lines) {
      if (/^##\s+(?!学完|学习|核心|重点|本节)/.test(line)) {
        const point = line.replace(/^##\s+/, '').replace(/\*\*/g, '').trim()
        if (point && point.length < 30) {
          points.push(point)
        }
      }
      if (points.length >= 5) break
    }
  }

  return points.slice(0, 5)
}

// 根据阶段 ID 判断难度等级
function getDifficultyLevel(type: string, stageId: string): { level: string; color: string } {
  const id = parseInt(stageId) || 0

  if (type === 'sql') {
    if (id <= 2) return { level: '入门', color: '#22c55e' }
    if (id <= 5) return { level: '进阶', color: '#f59e0b' }
    return { level: '实战', color: '#ef4444' }
  }

  if (type === 'python') {
    if (id <= 2) return { level: '入门', color: '#22c55e' }
    if (id <= 4) return { level: '进阶', color: '#f59e0b' }
    return { level: '实战', color: '#ef4444' }
  }

  // thinking
  if (id <= 2) return { level: '入门', color: '#22c55e' }
  if (id <= 8) return { level: '进阶', color: '#f59e0b' }
  return { level: '实战', color: '#ef4444' }
}

const DetailPage: React.FC<DetailPageProps> = ({ type }) => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const progress = useProgress()
  const [showConfetti, setShowConfetti] = useState(false)
  const [dbKey, setDbKey] = useState(0)
  const [practiceOpen, setPracticeOpen] = useState(false)
  const [tocOpen, setTocOpen] = useState(false)
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [mdContent, setMdContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [showPaywall, setShowPaywall] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [initialCode, setInitialCode] = useState('')

  const contentRef = useRef<HTMLDivElement>(null)

  const stage = id ? getStage(type, id) : undefined
  const course = getCourse(type)
  const setupSql = extractSetupSql(mdContent)
  const stageProgress = id ? progress.getStageStatus(type, id) : null

  const tocHeadings = useMemo(() => headings.filter(h => h.level >= 2 && h.level <= 3), [headings])

  // 提取的学习信息
  const learningGoals = useMemo(() => extractLearningGoals(mdContent), [mdContent])
  const keyPoints = useMemo(() => extractKeyPoints(mdContent), [mdContent])
  const difficulty = useMemo(() => getDifficultyLevel(type, id || '1'), [type, id])

  const handleHeadingsChange = useCallback((h: Heading[]) => {
    setHeadings(h)
  }, [])

  // 阅读进度追踪
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return

      const tutorialEl = contentRef.current.querySelector('.detail-page__tutorial')
      if (!tutorialEl) return

      const rect = tutorialEl.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const contentHeight = tutorialEl.scrollHeight

      // 计算阅读进度
      const scrolled = -rect.top + windowHeight * 0.3
      const progress = Math.min(100, Math.max(0, (scrolled / contentHeight) * 100))
      setReadingProgress(Math.round(progress))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!id) {
      setMdContent('# 未选择阶段')
      setLoading(false)
      return
    }
    if (!isStageAccessible(type, id)) {
      setShowPaywall(true)
      setLoading(false)
      return
    }
    setShowPaywall(false)
    setLoading(true)
    let modules: Record<string, string>
    let pattern: string
    if (type === 'sql') {
      modules = sqlModules
      pattern = `/${id.padStart(2, '0')}_`
    } else if (type === 'python') {
      modules = pyModules
      // 使用 courses.ts 中配置的 mdFile 路径
      const stage = id ? getStage('python', id) : undefined
      if (stage) {
        const mdFileName = stage.mdFile.split('/').pop() ?? ''
        pattern = `/${mdFileName}`
      } else {
        pattern = `/module${id.padStart(2, '0')}_`
      }
    } else {
      modules = thinkingModules
      const stage = id ? getStage('thinking', id) : undefined
      if (stage) {
        const mdFileName = stage.mdFile.split('/').pop() ?? ''
        pattern = `/${mdFileName}`
      } else {
        pattern = `/${id} `
      }
    }
    const content = findModuleContent(modules, pattern)
    if (content) {
      setMdContent(content)
      setLoading(false)
    } else {
      setMdContent('# 未选择阶段')
      setLoading(false)
    }
  }, [id, type])

  useEffect(() => {
    if (id) {
      progress.recordVisit(type, id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, type])

  useEffect(() => {
    setDbKey((k) => k + 1)
  }, [id])

  useEffect(() => {
    if (tocHeadings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    const timer = setTimeout(() => {
      tocHeadings.forEach(h => {
        const el = document.getElementById(h.id)
        if (el) observer.observe(el)
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [tocHeadings])

  const scrollToHeading = useCallback((headingId: string) => {
    const el = document.getElementById(headingId)
    if (el) {
      // 获取元素位置
      const rect = el.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop

      // 顶部导航栏高度约80px，额外留20px间距
      const navbarHeight = 100

      // 计算目标位置
      const targetPosition = rect.top + scrollTop - navbarHeight

      // 平滑滚动到目标位置      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })

      setActiveId(headingId)
    }
  }, [])

  const handleMarkComplete = useCallback(() => {
    if (!id) return
    progress.markStage(type, id, 'completed')
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, type])

  const handleTryCode = useCallback((code: string) => {
    setInitialCode(code)
    setPracticeOpen(true)
  }, [])

  const currentIndex = course?.stages.findIndex((s) => s.id === id) ?? -1
  const prevStage = currentIndex > 0 ? course?.stages[currentIndex - 1] : null
  const nextStage =
    currentIndex >= 0 && currentIndex < (course?.stages.length ?? 0) - 1
      ? course?.stages[currentIndex + 1]
      : null

  return (
    <div className="detail-page">
      {/* 阅读进度条*/}
      <div className="detail-page__progress-bar">
        <div
          className="detail-page__progress-fill"
          style={{ width: `${readingProgress}%` }}
        />
        <span className="detail-page__progress-text">{readingProgress}%</span>
      </div>

      {/* 面包屑*/}
      <div className="detail-page__breadcrumb">
        <Link to="/">棣栭〉</Link>
        <span className="detail-page__breadcrumb-sep">/</span>
        <Link to={`/${type}`}>{type === 'sql' ? 'SQL' : type === 'python' ? 'Python' : '思维模型'}</Link>
        <span className="detail-page__breadcrumb-sep">/</span>
        <span>{stage?.title ?? id}</span>
      </div>

      {/* 本节要点卡片 */}
      {!loading && !showPaywall && (
        <div className="detail-page__overview">
          <div className="detail-page__overview-header">
            <h3 className="detail-page__overview-title">📚 本节要点</h3>
            <div className="detail-page__overview-meta">
              <span
                className="detail-page__difficulty"
                style={{ backgroundColor: difficulty.color }}
              >
                {difficulty.level}
              </span>
            </div>
          </div>

          <div className="detail-page__overview-body">
            {learningGoals.length > 0 && (
              <div className="detail-page__goals">
                <h4 className="detail-page__goals-title">🎯 学习目标</h4>
                <ul className="detail-page__goals-list">
                  {learningGoals.slice(0, 4).map((goal, i) => (
                    <li key={i}>{goal}</li>
                  ))}
                </ul>
              </div>
            )}

            {keyPoints.length > 0 && (
              <div className="detail-page__points">
                <h4 className="detail-page__points-title">📕 核心知识点</h4>
                <div className="detail-page__points-tags">
                  {keyPoints.map((point, i) => (
                    <span key={i} className="detail-page__point-tag">{point}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 涓诲唴瀹瑰尯 */}
      <div className="detail-page__content" ref={contentRef}>
        <div className="detail-page__main">
          {/* 顶部操作栏?*/}
          <div className="detail-page__header">
            <h2 className="detail-page__title">
              <span className="detail-page__icon">
                {(() => {
                  const IconComponent = getIcon(type, id);
                  return <IconComponent size={32} />;
                })()}
              </span>
              {stage?.title ?? '未知阶段'}
            </h2>
            <div className="detail-page__actions">
              <button
                className={`detail-page__complete-btn ${
                  stageProgress?.status === 'completed' ? 'detail-page__complete-btn--done' : ''
                }`}
                onClick={handleMarkComplete}
              >
                {stageProgress?.status === 'completed' ? '✅ 已完成' : '标记完成'}
              </button>
              <div className="detail-page__nav">
                {prevStage && (
                  <Link to={`/${type}/${prevStage.id}`} className="detail-page__nav-btn detail-page__nav-btn--prev">
                    ←{prevStage.title}
                  </Link>
                )}
                {nextStage && (
                  <Link to={`/${type}/${nextStage.id}`} className="detail-page__nav-btn detail-page__nav-btn--next">
                    {nextStage.title} 鈫?                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="detail-page__tutorial">
            {loading ? (
              <div className="detail-page__loading">
                <Skeleton variant="title" width="70%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="85%" />
                <Skeleton variant="code" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="90%" />
                <Skeleton variant="text" width="65%" />
              </div>
            ) : (
              <TutorialRenderer
                content={mdContent}
                onHeadingsChange={handleHeadingsChange}
                onTryCode={type !== 'thinking' ? handleTryCode : undefined}
                codeDifficulty={difficulty.level}
              />
            )}
            <PaywallOverlay
              visible={showPaywall}
              stageTitle={stage?.title ?? ''}
              onClose={() => navigate(-1)}
              onPurchase={() => navigate('/purchase')}
              onActivate={() => navigate('/purchase')}
            />
          </div>

          {/* 搴曢儴瀵艰埅 */}
          {!loading && !showPaywall && (
            <div className="detail-page__bottom-nav">
              {prevStage ? (
                <Link to={`/${type}/${prevStage.id}`} className="detail-page__bottom-nav-btn detail-page__bottom-nav-btn--prev" onClick={() => window.scrollTo(0, 0)}>
                  <span className="detail-page__bottom-nav-label">上一节</span>
                  <span className="detail-page__bottom-nav-title">←{prevStage.title}</span>
                </Link>
              ) : (
                <div className="detail-page__bottom-nav-btn detail-page__bottom-nav-btn--disabled" />
              )}
              {nextStage ? (
                <Link to={`/${type}/${nextStage.id}`} className="detail-page__bottom-nav-btn detail-page__bottom-nav-btn--next" onClick={() => window.scrollTo(0, 0)}>
                  <span className="detail-page__bottom-nav-label">下一节</span>
                  <span className="detail-page__bottom-nav-title">{nextStage.title} →</span>
                </Link>
              ) : (
                <div className="detail-page__bottom-nav-btn detail-page__bottom-nav-btn--disabled" />
              )}
            </div>
          )}
        </div>

        {/* 悬浮目录按钮 */}
        {tocHeadings.length > 0 && !tocOpen && (
          <button
            className="detail-page__toc-fab"
            onClick={() => setTocOpen(true)}
            title="打开目录"
          >
            📋
          </button>
        )}

        {/* 目录面板 */}
        {tocOpen && (
          <div className="detail-page__toc-panel">
            <div className="detail-page__toc-panel-header">
              <h3 className="detail-page__toc-title">📋 目录</h3>
              <button
                className="detail-page__toc-close"
                onClick={() => setTocOpen(false)}
              >
                ✕</button>
            </div>
            <nav className="detail-page__toc-list">
              {tocHeadings.map(h => (
                <a
                  key={h.id}
                  className={`detail-page__toc-item detail-page__toc-item--h${h.level} ${activeId === h.id ? 'detail-page__toc-item--active' : ''}`}
                  onClick={(e) => { e.preventDefault(); scrollToHeading(h.id); setTocOpen(false) }}
                  href={`#${h.id}`}
                >
                  {h.text}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* 鎮诞缁冧範鎸夐挳 */}
      {!practiceOpen && type !== 'thinking' && (
        <button
          className={`detail-page__fab ${type === 'python' ? 'detail-page__fab--python' : ''}`}
          onClick={() => setPracticeOpen(true)}
        >
          <span className="detail-page__fab-icon">▶</span>
          <span className="detail-page__fab-label">{type === 'sql' ? 'SQL 练习' : 'Python 练习'}</span>
        </button>
      )}

      {/* 弹出练习面板 */}
      {type !== 'thinking' && practiceOpen && (
        <div className="detail-page__practice-panel">
          <div className="detail-page__practice-panel-header">
            <span className="detail-page__practice-panel-title">{type === 'sql' ? 'SQL 练习区' : 'Python 练习区'}</span>
            <button className="detail-page__practice-panel-close" onClick={() => setPracticeOpen(false)}>✕</button>
          </div>
          <div className="detail-page__practice-panel-body">
            {type === 'sql' ? (
              <SqlPlayground
                key={dbKey}
                initialCode={initialCode || '-- 在这里写 SQL 练习'}
                setupSql={setupSql}
              />
            ) : (
              <PythonPlayground
                key={dbKey}
                initialCode={initialCode || "# 在这里写 Python 浠ｇ爜\nprint('Hello, Python!')"}
              />
            )}
          </div>
        </div>
      )}

      {showConfetti && <div className="confetti-overlay" />}
    </div>
  )
}

export default DetailPage

