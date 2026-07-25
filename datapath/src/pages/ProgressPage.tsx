/**
 * 学习进度页
 * 环形进度图 + 阶段状态列表 + 统计
 */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import { courses } from '../data/courses'
import { getIcon } from '../utils/iconMap'
import './ProgressPage.css'

const ProgressPage: React.FC = () => {
  const progress = useProgress()
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const overall = progress.getOverallProgress()
  const totalStages = overall.sqlTotal + overall.pythonTotal
  const completedStages = overall.sqlCompleted + overall.pythonCompleted
  const percent = totalStages > 0 ? Math.round((completedStages / totalStages) * 100) : 0

  // 环形进度 SVG 参数
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  const handleReset = () => {
    if (!showResetConfirm) {
      setShowResetConfirm(true)
      return
    }
    progress.resetProgress()
    setShowResetConfirm(false)
  }

  return (
    <div className="progress-page">
      {/* 简约进度 */}
      <div className="progress-page__ring-section">
        <div className="progress-page__ring-svg">
          <svg width="160" height="160" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="3"
            />
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="var(--color-sql)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 80 80)"
              className="progress-page__ring-circle"
            />
            <text
              x="80"
              y="74"
              textAnchor="middle"
              dominantBaseline="central"
              className="progress-page__ring-text"
            >
              {percent}%
            </text>
            <text
              x="80"
              y="96"
              textAnchor="middle"
              dominantBaseline="central"
              className="progress-page__ring-sub"
            >
              总体完成度
            </text>
          </svg>
        </div>
        <p className="progress-page__days">已学习 {overall.totalDays} 天</p>
      </div>

      {/* SQL 阶段列表 */}
      <div className="progress-page__section">
        <h3 className="progress-page__section-title progress-page__section-title--sql">
          SQL 数据查询
        </h3>
        <div className="progress-page__list">
          {courses[0].stages.map((stage) => {
            const sp = progress.getStageStatus('sql', stage.id)
            return (
              <Link
                key={stage.id}
                to={`/sql/${stage.id}`}
                className={`progress-page__item progress-page__item--${sp.status}`}
              >
                <span className="progress-page__item-icon">
                  {(() => {
                    const IconComponent = getIcon('sql', stage.id);
                    return <IconComponent size={20} />;
                  })()}
                </span>
                <span className="progress-page__item-name">{stage.title}</span>
                <span className={`progress-page__badge progress-page__badge--${sp.status}`}>
                  {sp.status === 'completed'
                    ? '✓ 完成'
                    : sp.status === 'in_progress'
                    ? '进行中'
                    : '未开始'}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Python 阶段列表 */}
      <div className="progress-page__section">
        <h3 className="progress-page__section-title progress-page__section-title--python">
          Python 数据分析
        </h3>
        <div className="progress-page__list">
          {courses[1].stages.map((stage) => {
            const sp = progress.getStageStatus('python', stage.id)
            return (
              <Link
                key={stage.id}
                to={`/python/${stage.id}`}
                className={`progress-page__item progress-page__item--${sp.status}`}
              >
                <span className="progress-page__item-icon">
                  {(() => {
                    const IconComponent = getIcon('python', stage.id);
                    return <IconComponent size={20} />;
                  })()}
                </span>
                <span className="progress-page__item-name">{stage.title}</span>
                <span className={`progress-page__badge progress-page__badge--${sp.status}`}>
                  {sp.status === 'completed'
                    ? '✓ 完成'
                    : sp.status === 'in_progress'
                    ? '进行中'
                    : '未开始'}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* 重新开始按钮 */}
      <div className="progress-page__reset">
        {showResetConfirm && (
          <p className="progress-page__reset-warning">确定要重置所有学习进度吗？此操作不可恢复。</p>
        )}
        <button className="progress-page__reset-btn" onClick={handleReset}>
          {showResetConfirm ? '确认重置' : '重新开始'}
        </button>
      </div>

    </div>
  )
}

export default ProgressPage
