import { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { dataProjects, DIFFICULTY_LABEL, DIFFICULTY_COLOR, FREE_PROJECT_IDS } from '../../data/dataProjects'
import { isUnlocked } from '../../utils/access'
import PaywallOverlay from '../../components/PaywallOverlay'
import './ProjectDetail.css'

// Glob import all md files from data_project
const projectModules = import.meta.glob('../../../../data_project/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

// Glob import data files (csv) as raw text — only available in local dev with data_project present
const dataFileModules = import.meta.glob('../../../../data_project/**/data/**/*.{csv,db}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

// Glob import python source files
const sourceFileModules = import.meta.glob('../../../../data_project/**/*.{py}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function loadMd(projectId: string, filePattern: string): string {
  for (const path of Object.keys(projectModules)) {
    if (path.includes(projectId) && path.includes(filePattern)) {
      return projectModules[path]
    }
  }
  return ''
}

function loadProjectContent(projectId: string): {
  background: string
  report: string
  upper: string
  lower: string
} {
  return {
    background: loadMd(projectId, '项目方案'),
    report: loadMd(projectId, '分析报告'),
    upper: loadMd(projectId, '深度剖析（上）') || loadMd(projectId, '项目方案'),
    lower: loadMd(projectId, '深度剖析（下）'),
  }
}

/** Get all downloadable files for a project */
function getProjectFiles(projectId: string) {
  const dataFiles: { name: string; content: string }[] = []
  const sourceFiles: { name: string; content: string }[] = []

  for (const [path, content] of Object.entries(dataFileModules)) {
    if (path.includes(`/${projectId}/`)) {
      // Extract relative path: data_project/projectId/data/xxx.csv → data/xxx.csv
      const idx = path.indexOf(`/${projectId}/`)
      const relative = path.slice(idx + `/${projectId}/`.length)
      dataFiles.push({ name: relative, content })
    }
  }

  for (const [path, content] of Object.entries(sourceFileModules)) {
    if (path.includes(`/${projectId}/`) && !path.includes('__pycache__')) {
      const idx = path.indexOf(`/${projectId}/`)
      const relative = path.slice(idx + `/${projectId}/`.length)
      sourceFiles.push({ name: relative, content })
    }
  }

  return { dataFiles, sourceFiles }
}

async function buildAndDownloadZip(
  projectId: string
): Promise<void> {
  const { dataFiles, sourceFiles } = getProjectFiles(projectId)
  const zip = new JSZip()
  const root = zip.folder(projectId)!

  // Add data files
  const dataFolder = root.folder('data')!
  for (const f of dataFiles) {
    dataFolder.file(f.name, f.content)
  }

  // Add source code files
  for (const f of sourceFiles) {
    root.file(f.name, f.content)
  }

  // Add markdown docs
  for (const [path, content] of Object.entries(projectModules)) {
    if (path.includes(`/${projectId}/`)) {
      const idx = path.indexOf(`/${projectId}/`)
      const relative = path.slice(idx + `/${projectId}/`.length)
      root.file(relative, content)
    }
  }

  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, `${projectId}.zip`)
}

/** Replace `charts/xxx.png` with `/data_assitant_web/projects/{projectId}/xxx.png` */
function rewriteImagePaths(md: string, projectId: string): string {
  // 先替换 charts/xxx.png 为 xxx.png，再添加完整路径
  return md
    .replace(/(!\[[^\]]*\]\()charts\/([^)]+)\)/g, `$1$2)`)
    .replace(/(!\[[^\]]*\]\()(?!\/)([^)]+\.png\))/g, `$1/data_assitant_web/projects/${projectId}/$2`)
}

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project = dataProjects.find(p => p.id === id)
  const [content, setContent] = useState<{
    background: string
    report: string
    upper: string
    lower: string
  } | null>(null)
  const [showPaywall, setShowPaywall] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['upper'])
  )
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)
  const [downloading, setDownloading] = useState(false)

  // 检查项目是否解锁：已激活 或 在免费列表中
  const unlocked = isUnlocked() || (project ? FREE_PROJECT_IDS.includes(project.id) : false)

  // Pre-compute file lists for the downloads section
  const projectFiles = useMemo(() => {
    if (!project) return { dataFiles: [] as { name: string; content: string }[], sourceFiles: [] as { name: string; content: string }[] }
    return getProjectFiles(project.id)
  }, [project])

  const handleDownload = useCallback(async () => {
    if (!project) return
    setDownloading(true)
    try {
      await buildAndDownloadZip(project.id)
    } finally {
      setDownloading(false)
    }
  }, [project])

  useEffect(() => {
    if (!project) {
      navigate('/projects')
      return
    }
    setContent(loadProjectContent(project.id))
    setExpandedSections(new Set(['upper']))
    window.scrollTo(0, 0)
  }, [id, project, navigate])

  useEffect(() => {
    if (!lightboxImg) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxImg(null)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxImg])

  // Rewrite image paths in markdown content
  const rewrittenContent = useMemo(() => {
    if (!content || !project) return null
    return {
      background: rewriteImagePaths(content.background, project.id),
      report: rewriteImagePaths(content.report, project.id),
      upper: rewriteImagePaths(content.upper, project.id),
      lower: rewriteImagePaths(content.lower, project.id),
    }
  }, [content, project])

  if (!project || !rewrittenContent) return null

  const toggleSection = (key: string) => {
    if (key === 'lower' && !unlocked) {
      setShowPaywall(true)
      return
    }
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const handleReportExpand = () => {
    if (!unlocked) {
      setShowPaywall(true)
      return
    }
    toggleSection('report')
  }

  // Custom ReactMarkdown components to handle images
  const mdComponents: Components = {
    img: ({ src, alt, ...props }) => (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onClick={() => {
          if (!unlocked) {
            setShowPaywall(true)
            return
          }
          setLightboxImg(src || null)
        }}
        style={{ cursor: unlocked ? 'zoom-in' : 'pointer' }}
        {...props}
      />
    ),
  }

  const prevProject = (() => {
    const idx = dataProjects.findIndex(p => p.id === id)
    return idx > 0 ? dataProjects[idx - 1] : null
  })()
  const nextProject = (() => {
    const idx = dataProjects.findIndex(p => p.id === id)
    return idx < dataProjects.length - 1 ? dataProjects[idx + 1] : null
  })()

  return (
    <div className="project-detail">
      {/* Breadcrumb */}
      <div className="project-detail__breadcrumb">
        <Link to="/">首页</Link>
        <span className="project-detail__sep">/</span>
        <Link to="/projects">实战项目</Link>
        <span className="project-detail__sep">/</span>
        <span>{project.title}</span>
      </div>

      {/* Hero */}
      <div className="project-detail__hero">
        <div className="project-detail__hero-left">
          <span className="project-detail__emoji">{project.emoji}</span>
          <div>
            <h1 className="project-detail__title">{project.title}</h1>
            <div className="project-detail__tags">
              <span
                className="project-detail__diff"
                style={{ background: DIFFICULTY_COLOR[project.difficulty] }}
              >
                {DIFFICULTY_LABEL[project.difficulty]}
              </span>
              {project.tags.map(tag => (
                <span key={tag} className="project-detail__tag">{tag}</span>
              ))}
              <span className="project-detail__meta-tag">{project.charts.length} 张图表</span>
            </div>
          </div>
        </div>
        <p className="project-detail__desc">{project.description}</p>
      </div>

      {/* Section 1: 项目背景 */}
      {rewrittenContent.background && (
        <section className="project-detail__section project-detail__section--expanded">
          <div className="project-detail__section-header" onClick={() => toggleSection('background')}>
            <span className="project-detail__section-header-left">
              <span className="project-detail__section-num">01</span>
              <span className="project-detail__section-title-text">项目背景</span>
            </span>
            <span className={`project-detail__section-toggle ${expandedSections.has('background') ? 'project-detail__section-toggle--open' : ''}`}>
              ▼
            </span>
          </div>
          {expandedSections.has('background') && (
            <div className="project-detail__md project-detail__section-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={mdComponents}
              >
                {rewrittenContent.background}
              </ReactMarkdown>
            </div>
          )}
        </section>
      )}

      {/* Section 2: 分析报告 */}
      <section className={`project-detail__section ${expandedSections.has('report') ? 'project-detail__section--expanded' : 'project-detail__section--collapsed'}`}>
        <div className="project-detail__section-header" onClick={handleReportExpand}>
          <span className="project-detail__section-header-left">
            <span className="project-detail__section-num">02</span>
            <span className="project-detail__section-title-text">分析报告</span>
            {!unlocked && <span className="project-detail__step-lock">🔒</span>}
          </span>
          <span className={`project-detail__section-toggle ${expandedSections.has('report') ? 'project-detail__section-toggle--open' : ''}`}>
            ▼
          </span>
        </div>
        {expandedSections.has('report') && unlocked && rewrittenContent.report && (
          <div className="project-detail__md project-detail__section-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={mdComponents}
            >
              {rewrittenContent.report}
            </ReactMarkdown>
          </div>
        )}
        {expandedSections.has('report') && !unlocked && (
          <div className="project-detail__locked-placeholder">
            <p>🔒 解锁后查看完整分析报告</p>
            <button
              className="project-detail__unlock-btn"
              onClick={() => navigate('/purchase')}
            >
              立即解锁
            </button>
          </div>
        )}
      </section>

      {/* Section 3: 项目深度剖析 */}
      <section className={`project-detail__section ${expandedSections.has('upper') || expandedSections.has('lower') ? 'project-detail__section--expanded' : 'project-detail__section--collapsed'}`}>
        <div className="project-detail__section-header" onClick={() => toggleSection('upper')}>
          <span className="project-detail__section-header-left">
            <span className="project-detail__section-num">03</span>
            <span className="project-detail__section-title-text">项目深度剖析</span>
          </span>
          <span className={`project-detail__section-toggle ${expandedSections.has('upper') ? 'project-detail__section-toggle--open' : ''}`}>
            ▼
          </span>
        </div>

        {/* 上篇 */}
        {expandedSections.has('upper') && rewrittenContent.upper && (
          <div className="project-detail__md project-detail__section-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={mdComponents}
            >
              {rewrittenContent.upper}
            </ReactMarkdown>
          </div>
        )}

        {/* 下篇 toggle (inside the expanded section) */}
        {expandedSections.has('upper') && rewrittenContent.lower && (
          <div className="project-detail__subsection">
            <button
              className="project-detail__subsection-header"
              onClick={() => toggleSection('lower')}
            >
              <span className="project-detail__section-header-left">
                <span className="project-detail__section-num">下篇</span>
                <span className="project-detail__section-title-text">
                  图表剖析 · 策略推导 · 结论溯源
                </span>
                {!unlocked && <span className="project-detail__step-lock">🔒</span>}
              </span>
              <span className={`project-detail__section-toggle ${expandedSections.has('lower') ? 'project-detail__section-toggle--open' : ''}`}>
                ▼
              </span>
            </button>
            {expandedSections.has('lower') && unlocked && (
              <div className="project-detail__md project-detail__subsection-body">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={mdComponents}
                >
                  {rewrittenContent.lower}
                </ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Section 4: 数据与源码 */}
      <section className="project-detail__section project-detail__section--expanded">
        <div className="project-detail__section-header" onClick={() => toggleSection('download')}>
          <span className="project-detail__section-header-left">
            <span className="project-detail__section-num">04</span>
            <span className="project-detail__section-title-text">数据与源码</span>
            {!unlocked && <span className="project-detail__step-lock">🔒</span>}
          </span>
          <span className={`project-detail__section-toggle ${expandedSections.has('download') ? 'project-detail__section-toggle--open' : ''}`}>
            ▼
          </span>
        </div>
        {expandedSections.has('download') && (
          <div className="project-detail__section-body project-detail__download">
            {unlocked ? (
              <>
                <div className="project-detail__download-desc">
                  下载项目完整资源包：数据源（CSV）、分析源码（Python）、可视化代码及项目文档。
                </div>

                <div className="project-detail__file-groups">
                  {/* Data files */}
                  <div className="project-detail__file-group">
                    <h4 className="project-detail__file-group-title">
                      <span className="project-detail__file-icon">📊</span> 数据源
                      <span className="project-detail__file-count">{projectFiles.dataFiles.length} 个文件</span>
                    </h4>
                    <ul className="project-detail__file-list">
                      {projectFiles.dataFiles.map(f => (
                        <li key={f.name}>
                          <span className="project-detail__file-name">{f.name}</span>
                          <span className="project-detail__file-ext">CSV</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Source code */}
                  <div className="project-detail__file-group">
                    <h4 className="project-detail__file-group-title">
                      <span className="project-detail__file-icon">🐍</span> 源代码
                      <span className="project-detail__file-count">{projectFiles.sourceFiles.length} 个文件</span>
                    </h4>
                    <ul className="project-detail__file-list">
                      {projectFiles.sourceFiles.map(f => (
                        <li key={f.name}>
                          <span className="project-detail__file-name">{f.name}</span>
                          <span className="project-detail__file-ext">PY</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  className="project-detail__download-btn"
                  onClick={handleDownload}
                  disabled={downloading}
                >
                  {downloading ? '正在打包...' : '⬇ 一键打包下载全部文件'}
                </button>
              </>
            ) : (
              <div className="project-detail__locked-placeholder">
                <p>🔒 解锁后可下载项目数据与源码</p>
                <button
                  className="project-detail__unlock-btn"
                  onClick={() => navigate('/purchase')}
                >
                  立即解锁
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Navigation between projects */}
      <div className="project-detail__nav">
        {prevProject && (
          <Link to={`/projects/${prevProject.id}`} className="project-detail__nav-btn project-detail__nav-btn--prev">
            <span className="project-detail__nav-dir">← 上一个</span>
            <span className="project-detail__nav-title">{prevProject.emoji} {prevProject.title}</span>
          </Link>
        )}
        {nextProject && (
          <Link to={`/projects/${nextProject.id}`} className="project-detail__nav-btn project-detail__nav-btn--next">
            <span className="project-detail__nav-dir">下一个 →</span>
            <span className="project-detail__nav-title">{nextProject.emoji} {nextProject.title}</span>
          </Link>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div className="project-detail__lightbox" onClick={() => setLightboxImg(null)}>
          <img src={lightboxImg} alt="放大查看" />
          <button className="project-detail__lightbox-close" onClick={() => setLightboxImg(null)}>✕</button>
        </div>
      )}

      <PaywallOverlay
        visible={showPaywall}
        stageTitle={project.title}
        onClose={() => setShowPaywall(false)}
        onPurchase={() => navigate('/purchase')}
        onActivate={() => navigate('/purchase')}
      />
    </div>
  )
}

export default ProjectDetailPage
