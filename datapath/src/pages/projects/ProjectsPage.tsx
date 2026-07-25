import { Link, useNavigate } from 'react-router-dom'
import { dataProjects, DIFFICULTY_LABEL, DIFFICULTY_COLOR, FREE_PROJECT_IDS } from '../../data/dataProjects'
import { isUnlocked } from '../../utils/access'
import './Projects.css'

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate()

  const handleProjectClick = (isFree: boolean, unlocked: boolean, e: React.MouseEvent) => {
    // 如果项目被锁定且未解锁，阻止跳转，显示付费提示
    if (!isFree && !unlocked) {
      e.preventDefault()
      navigate('/purchase')
    }
  }

  return (
    <div className="projects-page">
      <div className="projects-page__header">
        <div className="projects-page__breadcrumb">
          <Link to="/">首页</Link>
          <span className="projects-page__sep">/</span>
          <span>实战项目</span>
        </div>
        <h1 className="projects-page__title">实战项目</h1>
        <p className="projects-page__desc">
          真实业务场景 + 完整数据 + 完整代码，从分析思路到可视化报告，手把手带你做出项目级作品
        </p>
      </div>

      <div className="projects-page__grid">
        {dataProjects.map((project, idx) => {
          const isFree = FREE_PROJECT_IDS.includes(project.id)
          const unlocked = isUnlocked() || isFree

          return (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="project-card"
              style={{ '--card-delay': `${idx * 0.08}s` } as React.CSSProperties}
              onClick={(e) => handleProjectClick(isFree, unlocked, e)}
            >
              <div className="project-card__cover">
                {project.coverImage ? (
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="project-card__cover-img"
                    loading="lazy"
                  />
                ) : project.coverHtml ? (
                  <iframe
                    src={project.coverHtml}
                    className="project-card__iframe"
                    title={project.title}
                    loading="lazy"
                  />
                ) : (
                  <div className="project-card__gradient-cover">
                    <div className="project-card__hero-emoji">{project.emoji}</div>
                  </div>
                )}
                <span
                  className="project-card__diff"
                  style={{ background: DIFFICULTY_COLOR[project.difficulty] }}
                >
                  {DIFFICULTY_LABEL[project.difficulty]}
                </span>
                <span className="project-card__order">#{idx + 1}</span>
                {!unlocked && <span className="project-card__lock">🔒</span>}
                {unlocked && !isFree && <span className="project-card__unlocked-badge">✓</span>}
              </div>
              <div className="project-card__body">
                <h3 className="project-card__title">
                  {project.title}
                </h3>
                <p className="project-card__desc">{project.description}</p>
                <div className="project-card__tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="project-card__tag">{tag}</span>
                  ))}
                </div>
                <div className="project-card__meta">
                  <span className="project-card__chart-count">{project.charts.length} 张图表</span>
                  <span className="project-card__arrow">&rarr;</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default ProjectsPage
