/** 格式化内容：自动检测 SQL 或 Python 并高亮 */
import { formatSQLContent } from './sqlFormat'
import { formatPythonContent } from './pythonFormat'

export function formatContent(text: string, subject: 'sql' | 'python'): string {
  if (subject === 'sql') return formatSQLContent(text)
  return formatPythonContent(text)
}
