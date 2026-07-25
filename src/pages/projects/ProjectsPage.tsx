import { Link } from 'react-router-dom'
import { dataProjects, DIFFICULTY_LABEL, DIFFICULTY_COLOR, FREE_PROJECT_IDS } from '../../data/dataProjects'
import { isUnlocked } from '../../utils/access'
import './Projects.css'

const ProjectsPage: React.FC = () => {
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
            >
              <div className="project-card__cover">
                <img
                  src={project.charts[0]?.src}
                  alt={project.charts[0]?.caption}
                  className="project-card__img"
                  loading="lazy"
                />
                <span
                  className="project-card__diff"
                  style={{ background: DIFFICULTY_COLOR[project.difficulty] }}
                >
                  {DIFFICULTY_LABEL[project.difficulty]}
                </span>
                <span className="project-card__order">#{idx + 1}</span>
                {!unlocked && <span className="project-card__lock">🔒</span>}
              </div>
              <div className="project-card__body">
                <h3 className="project-card__title">
                  <span className="project-card__emoji">{project.emoji}</span>
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
