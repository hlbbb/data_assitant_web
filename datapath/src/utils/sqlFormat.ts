/** SQL 语法高亮 */

const SQL_KEYWORDS = /\b(SELECT|FROM|WHERE|AND|OR|NOT|IN|BETWEEN|LIKE|IS|NULL|ORDER\s+BY|GROUP\s+BY|HAVING|LIMIT|OFFSET|AS|ON|JOIN|INNER\s+JOIN|LEFT\s+JOIN|RIGHT\s+JOIN|FULL\s+JOIN|CROSS\s+JOIN|SELF\s+JOIN|UNION|ALL|EXCEPT|INTERSECT|INSERT\s+INTO|UPDATE|DELETE\s+FROM|SET|VALUES|CREATE|ALTER|DROP|TABLE|INDEX|VIEW|DISTINCT|CASE|WHEN|THEN|ELSE|END|EXISTS|ASC|DESC|WITH|RECURSIVE|OVER|PARTITION\s+BY|ROW_NUMBER|RANK|DENSE_RANK|LAG|LEAD|SUM|COUNT|AVG|MIN|MAX|COALESCE|IFNULL|CAST|CONCAT|SUBSTRING|TRIM|UPPER|LOWER|LENGTH|ROUND|FETCH|NEXT|ROWS|ONLY|PRIMARY\s+KEY|FOREIGN\s+KEY|REFERENCES|UNIQUE|CHECK|DEFAULT|CONSTRAINT|GRANT|REVOKE|BEGIN|COMMIT|ROLLBACK)\b/gi

export function highlightSQL(text: string): string {
  return text.replace(SQL_KEYWORDS, '<span class="sql-kw">$1</span>')
}

export function formatLongSQL(sql: string): string | null {
  const breakPoints = [
    /\b(LEFT\s+JOIN|RIGHT\s+JOIN|INNER\s+JOIN|FULL\s+JOIN|CROSS\s+JOIN|JOIN)\b/gi,
    /\b(WHERE)\b/gi,
    /\b(AND|OR)\b/gi,
    /\b(GROUP\s+BY)\b/gi,
    /\b(HAVING)\b/gi,
    /\b(ORDER\s+BY)\b/gi,
    /\b(LIMIT|OFFSET)\b/gi,
    /\b(UNION|EXCEPT|INTERSECT)\b/gi,
    /\b(ON)\b/gi,
    /\b(SET)\b/gi,
    /\b(VALUES)\b/gi,
    /\b(FROM)\b/gi,
  ]

  let parts = [sql]
  for (const re of breakPoints) {
    const next: string[] = []
    for (const part of parts) {
      const match = part.search(re)
      if (match > 0) {
        next.push(part.slice(0, match))
        next.push(part.slice(match))
      } else {
        next.push(part)
      }
    }
    parts = next
  }

  if (parts.length <= 1) return null

  return parts
    .map((p, i) => {
      const indented = i > 0 ? '  ' + p.trim() : p.trim()
      return highlightSQL(indented)
    })
    .join('<br>')
}

export function formatSQLContent(text: string): string {
  if (!text) return ''
  const lines = text.split('\n')
  return lines
    .map((line) => {
      const isSQL =
        /^(SELECT|INSERT|UPDATE|DELETE|WITH)\b/i.test(line.trim()) ||
        /\bSELECT\b.+\bFROM\b/i.test(line)
      if (!isSQL) return highlightSQL(line)
      const formatted = formatLongSQL(line)
      if (formatted) return '<code class="sql-block">' + formatted + '</code>'
      return '<code class="sql-inline">' + highlightSQL(line) + '</code>'
    })
    .join('<br>')
}
