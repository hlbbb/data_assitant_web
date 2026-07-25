import { useState, useEffect, useCallback, useMemo, type ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import 'highlight.js/styles/atom-one-dark.css'
import FunnelChart from './FunnelChart'
import './TutorialRenderer.css'

export interface Heading {
  id: string
  text: string
  level: number
}

interface TutorialRendererProps {
  content: string
  onHeadingsChange?: (headings: Heading[]) => void
  onTryCode?: (code: string) => void
  codeDifficulty?: string
}

function mysqlToSqlite(sql: string): string {
  return sql
    .split('\n')
    .map(line => {
      return line
        .replace(/\s*AUTO_INCREMENT\s*/gi, ' ')
        .replace(/\s*COMMENT\s+('[^']*'|"[^"]*")/gi, '')
        .replace(/DECIMAL\s*\(\s*\d+\s*,\s*\d+\s*\)/gi, 'REAL')
        .replace(/INT\s+PRIMARY\s+KEY\s+AUTOINCREMENT/gi, 'INTEGER PRIMARY KEY AUTOINCREMENT')
        .replace(/\s+,/g, ',')
        .trimEnd()
    })
    .join('\n')
    .replace(/\s*ENGINE\s*=\s*\w+/gi, '')
    .replace(/\s*DEFAULT\s+CHARSET\s*=\s*\w+/gi, '')
    .replace(/\s*CHARACTER\s+SET\s+\w+/gi, '')
    .replace(/\s*COLLATE\s+\w+/gi, '')
    .replace(/\s*ROW_FORMAT\s*=\s*\w+/gi, '')
    .replace(/,\s*\n\)/g, '\n)')
    .trim()
}

export function extractSetupSql(content: string): string {
  const sqlBlockRegex = /```sql\r?\n([\s\S]*?)```/g
  const blocks: string[] = []
  let match: RegExpExecArray | null
  while ((match = sqlBlockRegex.exec(content)) !== null) {
    const sql = match[1]
    if (sql.includes('CREATE TABLE') || sql.includes('INSERT INTO')) {
      blocks.push(mysqlToSqlite(sql.trim()))
    }
  }
  return blocks.join('\n\n')
}

// 全局状态存储折叠状态，避免重新渲染时丢失
const collapseState: Record<string, boolean> = {}

// 缓存hash计算结果
const hashCache = new Map<string, string>()

// 使用内容hash作为稳定的blockId（带缓存）
function getStableBlockId(codeText: string): string {
  const cached = hashCache.get(codeText)
  if (cached) return cached

  let hash = 0
  for (let i = 0; i < codeText.length; i++) {
    const char = codeText.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  const id = `block-${Math.abs(hash)}`
  hashCache.set(codeText, id)
  return id
}

// 提取代码块文本的缓存（使用WeakMap避免内存泄漏）
const textCache = new WeakMap<object, string>()

function extractText(children: ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(extractText).join('')
  if (children && typeof children === 'object' && 'props' in children) {
    const cached = textCache.get(children)
    if (cached) return cached
    const text = extractText((children as { props: { children: ReactNode } }).props.children)
    textCache.set(children, text)
    return text
  }
  return ''
}

function extractHeadingsFromMd(content: string): Heading[] {
  const headings: Heading[] = []
  const lines = content.split('\n')
  let inCodeBlock = false
  const idCounts: Record<string, number> = {}

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) continue
    const m = line.match(/^(#{1,4})\s+(.+)/)
    if (m) {
      const level = m[1].length
      const text = m[2].replace(/\*\*/g, '').replace(/`[^`]+`/g, '').trim()
      if (text) {
        const baseId = text.replace(/\s+/g, '-').replace(/[^\w一-鿿-]/g, '').toLowerCase()
        const count = idCounts[baseId] || 0
        idCounts[baseId] = count + 1
        const id = count > 0 ? `${baseId}-${count}` : baseId
        headings.push({ id, text, level })
      }
    }
  }
  return headings
}

const TutorialRenderer: React.FC<TutorialRendererProps> = ({
  content,
  onHeadingsChange,
  onTryCode,
  codeDifficulty = '进阶'
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [, forceUpdate] = useState(0)

  const headings = useMemo(() => extractHeadingsFromMd(content), [content])

  useEffect(() => {
    onHeadingsChange?.(headings)
  }, [headings, onHeadingsChange])

  const handleCopy = useCallback(async (code: string, id: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }, [])

  const handleTry = useCallback((code: string) => {
    onTryCode?.(code)
  }, [onTryCode])

  const toggleCollapse = useCallback((blockId: string) => {
    collapseState[blockId] = !collapseState[blockId]
    forceUpdate(n => n + 1)
  }, [])

  const getHeadingId = useCallback((text: string) => {
    const heading = headings.find(h => {
      const hText = h.text.replace(/\*\*/g, '').replace(/`[^`]+`/g, '').trim()
      const inputText = text.replace(/\*\*/g, '').replace(/`[^`]+`/g, '').trim()
      return hText === inputText
    })
    return heading?.id || text.replace(/\s+/g, '-').replace(/[^\w一-鿿-]/g, '').toLowerCase()
  }, [headings])

  // 使用useMemo缓存ReactMarkdown的components配置，避免每次渲染重新创建
  const markdownComponents = useMemo(() => ({
    code({ className, children, ...rest }: { className?: string; children?: ReactNode }) {
      const match = /language-(\w+)/.exec(className || '')
      const lang = match ? match[1] : ''
      const codeText = extractText(children).replace(/\n$/, '')

      const tableMatch = codeText.match(/^--\s*(.+?)\s*表/m)
      const isDataSource = tableMatch && (codeText.includes('CREATE TABLE') || codeText.includes('INSERT INTO'))

      if (lang === 'funnel') {
        return <FunnelChart />
      }

      if (!className) {
        return <code className="tutorial-inline-code" {...rest}>{children}</code>
      }

      const blockId = getStableBlockId(codeText)

      // 数据源代码块使用折叠显示
      if (isDataSource && tableMatch) {
        const tableName = tableMatch[1]
        const isOpen = collapseState[blockId] || false

        return (
          <div className="collapsible-code-block">
            <div
              className="collapsible-code-block__summary"
              onClick={() => toggleCollapse(blockId)}
              style={{ cursor: 'pointer' }}
            >
              <span className="collapsible-code-block__icon">{isOpen ? '▼' : '▶'}</span>
              <span className="collapsible-code-block__title">📋 {tableName}表</span>
            </div>
            {isOpen && (
              <div className="collapsible-code-block__content">
                <div className="code-block-wrapper">
                  <div className="code-block-header">
                    <div className="code-block-header-left">
                      <span className="code-block-lang">{lang.toUpperCase()}</span>
                      <span className={`code-block-difficulty code-block-difficulty--${codeDifficulty === '入门' ? 'basic' : codeDifficulty === '实战' ? 'advanced' : 'intermediate'}`}>
                        {codeDifficulty}
                      </span>
                    </div>
                    <div className="code-block-header-right">
                      {onTryCode && (lang === 'sql' || lang === 'python') && (
                        <button
                          className="code-block-try-btn"
                          onClick={() => handleTry(codeText)}
                        >
                          在练习区运行
                        </button>
                      )}
                      <button className="code-block-copy-btn" onClick={() => handleCopy(codeText, blockId)}>
                        {copiedId === blockId ? '已复制 ✓' : '复制'}
                      </button>
                    </div>
                  </div>
                  <code className={className} {...rest}>{children}</code>
                </div>
              </div>
            )}
          </div>
        )
      }

      return (
        <div className="code-block-wrapper">
          <div className="code-block-header">
            <div className="code-block-header-left">
              <span className="code-block-lang">{lang.toUpperCase()}</span>
              <span className={`code-block-difficulty code-block-difficulty--${codeDifficulty === '入门' ? 'basic' : codeDifficulty === '实战' ? 'advanced' : 'intermediate'}`}>
                {codeDifficulty}
              </span>
            </div>
            <div className="code-block-header-right">
              {onTryCode && (lang === 'sql' || lang === 'python') && (
                <button
                  className="code-block-try-btn"
                  onClick={() => handleTry(codeText)}
                >
                  在练习区运行
                </button>
              )}
              <button className="code-block-copy-btn" onClick={() => handleCopy(codeText, blockId)}>
                {copiedId === blockId ? '已复制 ✓' : '复制'}
              </button>
            </div>
          </div>
          <code className={className} {...rest}>{children}</code>
        </div>
      )
    },
    h1({ children, ...rest }: { children?: ReactNode }) {
      const id = getHeadingId(extractText(children))
      return <h1 id={id} {...rest}>{children}</h1>
    },
    h2({ children, ...rest }: { children?: ReactNode }) {
      const id = getHeadingId(extractText(children))
      return <h2 id={id} {...rest}>{children}</h2>
    },
    h3({ children, ...rest }: { children?: ReactNode }) {
      const id = getHeadingId(extractText(children))
      return <h3 id={id} {...rest}>{children}</h3>
    },
  }), [codeDifficulty, copiedId, handleCopy, handleTry, onTryCode, toggleCollapse, getHeadingId])

  return (
    <div className="tutorial-content">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={markdownComponents}
      />
    </div>
  )
}

export default TutorialRenderer
