import { useState, useEffect, useCallback, useRef } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { sql } from '@codemirror/lang-sql'
import './SqlPlayground.css'

interface SqlPlaygroundProps {
  initialCode?: string
  setupSql?: string
}

interface QueryResult {
  columns: string[]
  rows: Record<string, string>[]
}

interface SqlJsDatabase {
  run(sql: string): void
  exec(sql: string): { columns: string[]; values: unknown[][] }[]
  close(): void
}

interface SqlJsModule {
  Database: new () => SqlJsDatabase
}

let sqlJsPromise: Promise<SqlJsModule> | null = null

async function loadSqlJs(): Promise<SqlJsModule> {
  if (sqlJsPromise) return sqlJsPromise

  sqlJsPromise = (async () => {
    try {
      // @ts-expect-error no declaration file for sql-wasm-browser
      const mod = await import('sql.js/dist/sql-wasm-browser.js')
      const initFn = mod.default || mod
      const SQL = await initFn({
        locateFile: (file: string) => {
          // Vite配置了base: '/data_assitant_web/'，需要加上base路径
          const basePath = import.meta.env.BASE_URL || '/'
          const fullPath = `${basePath}${file}`
          console.log('Loading SQL.js file:', fullPath)
          return fullPath
        },
      })
      return SQL
    } catch (err) {
      console.error('Failed to load SQL.js:', err)
      throw err
    }
  })()

  return sqlJsPromise
}

/**
 * MySQL → SQLite 查询语法转换
 * 处理日期函数、字符串函数等 MySQL 特有语法
 */
function convertQueryToSqlite(sql: string): string {
  let s = sql

  // DATE_ADD(date, INTERVAL n UNIT) → date(date, '+n unit')
  // 支持 DAY/DAYS, MONTH/MONTHS, YEAR/YEARS
  s = s.replace(
    /DATE_ADD\s*\(\s*([^,]+?)\s*,\s*INTERVAL\s+(\d+)\s+(DAY|DAYS|MONTH|MONTHS|YEAR|YEARS)\s*\)/gi,
    (_match, dateExpr: string, num: string, unit: string) => {
      const u = unit.toUpperCase().startsWith('MONTH') ? 'months'
        : unit.toUpperCase().startsWith('YEAR') ? 'years' : 'days'
      return `date(${dateExpr}, '+${num} ${u}')`
    }
  )

  // DATE_SUB(date, INTERVAL n UNIT) → date(date, '-n unit')
  s = s.replace(
    /DATE_SUB\s*\(\s*([^,]+?)\s*,\s*INTERVAL\s+(\d+)\s+(DAY|DAYS|MONTH|MONTHS|YEAR|YEARS)\s*\)/gi,
    (_match, dateExpr: string, num: string, unit: string) => {
      const u = unit.toUpperCase().startsWith('MONTH') ? 'months'
        : unit.toUpperCase().startsWith('YEAR') ? 'years' : 'days'
      return `date(${dateExpr}, '-${num} ${u}')`
    }
  )

  // DATE_FORMAT(date, fmt) → strftime(sqliteFmt, date)
  s = s.replace(
    /DATE_FORMAT\s*\(\s*([^,]+?)\s*,\s*'([^']+)'\s*\)/gi,
    (_match, dateExpr: string, fmt: string) => {
      const sqliteFmt = convertMySqlDateFormat(fmt)
      return `strftime('${sqliteFmt}', ${dateExpr})`
    }
  )

  // DATEDIFF(d1, d2) → (julianday(d1) - julianday(d2))
  s = s.replace(
    /DATEDIFF\s*\(\s*([^,]+?)\s*,\s*([^)]+?)\s*\)/gi,
    (_match, d1: string, d2: string) => {
      return `CAST(julianday(${d1}) - julianday(${d2}) AS INTEGER)`
    }
  )

  // CURDATE() → date('now')
  s = s.replace(/\bCURDATE\s*\(\s*\)/gi, "date('now')")

  // NOW() → datetime('now')
  s = s.replace(/\bNOW\s*\(\s*\)/gi, "datetime('now')")

  // CURTIME() → time('now')
  s = s.replace(/\bCURTIME\s*\(\s*\)/gi, "time('now')")

  // YEAR(date_expr) → cast(strftime('%Y', date_expr) as integer)
  s = replaceDateFunc(s, 'YEAR', '%Y')

  // MONTH(date_expr) → cast(strftime('%m', date_expr) as integer)
  s = replaceDateFunc(s, 'MONTH', '%m')

  // DAY(date_expr) → cast(strftime('%d', date_expr) as integer)
  s = replaceDateFunc(s, 'DAY', '%d')

  // DAYOFWEEK(date_expr) → cast(strftime('%w', date_expr) as integer) + 1
  s = s.replace(
    /\bDAYOFWEEK\s*\(\s*([^)]+?)\s*\)/gi,
    (_match, expr: string) => `(cast(strftime('%w', ${expr}) as integer) + 1)`
  )

  // DAYNAME(date_expr) → 用 CASE 模拟（简化为空字符串，SQLite 无法本地化）
  s = s.replace(
    /\bDAYNAME\s*\(\s*([^)]+?)\s*\)/gi,
    (_match, expr: string) =>
      `CASE cast(strftime('%w', ${expr}) as integer) WHEN 0 THEN 'Sunday' WHEN 1 THEN 'Monday' WHEN 2 THEN 'Tuesday' WHEN 3 THEN 'Wednesday' WHEN 4 THEN 'Thursday' WHEN 5 THEN 'Friday' WHEN 6 THEN 'Saturday' END`
  )

  // QUARTER(date_expr) → CASE 模拟
  s = s.replace(
    /\bQUARTER\s*\(\s*([^)]+?)\s*\)/gi,
    (_match, expr: string) =>
      `CASE WHEN cast(strftime('%m', ${expr}) as integer) <= 3 THEN 1 WHEN cast(strftime('%m', ${expr}) as integer) <= 6 THEN 2 WHEN cast(strftime('%m', ${expr}) as integer) <= 9 THEN 3 ELSE 4 END`
  )

  // YEARWEEK(date, mode) → 简化为 strftime('%Y%W', date)
  s = s.replace(
    /\bYEARWEEK\s*\(\s*([^,)]+)(?:\s*,\s*\d+)?\s*\)/gi,
    (_match, expr: string) => `cast(strftime('%Y%W', ${expr}) as integer)`
  )

  // DATE(expr) 在 SQLite 原生支持，不需要转换

  // CONCAT(a, b, c) → a || b || c
  // 需要递归处理嵌套的 CONCAT
  s = convertConcat(s)

  // CONCAT_WS(sep, a, b) → 用 || 拼接，并用 CASE 处理 NULL
  // 简化处理：只处理简单情况
  s = s.replace(
    /CONCAT_WS\s*\(\s*'([^']+)'\s*,\s*([^)]+)\s*\)/gi,
    (_match, sep: string, rest: string) => {
      const parts = rest.split(',').map(p => p.trim())
      return parts.join(` || '${sep}' || `)
    }
  )

  // LENGTH() 在 SQLite 中原生支持
  // CHAR_LENGTH(expr) → length(expr) （SQLite 的 length 对文本按字符数）
  s = s.replace(/\bCHAR_LENGTH\s*\(/gi, 'length(')

  // LOCATE(substr, str) → instr(str, substr)（注意参数顺序反转）
  s = s.replace(
    /\bLOCATE\s*\(\s*([^,]+?)\s*,\s*([^)]+?)\s*\)/gi,
    (_match, substr: string, str: string) => `instr(${str}, ${substr})`
  )

  // INSTR 在 SQLite 中原生支持

  // IFNULL(expr, default) → COALESCE(expr, default)
  // SQLite也支持IFNULL,但COALESCE更标准且支持多参数
  s = s.replace(/\bIFNULL\s*\(/gi, 'COALESCE(')

  // SUBSTRING(str, start, len) → substr(str, start, len)
  // SUBSTRING(str, start) → substr(str, start)
  s = s.replace(/\bSUBSTRING\s*\(/gi, 'substr(')

  // RPAD(str, len, pad) → 用 || 和 substr 实现
  // 简化处理:假设pad长度为1,重复填充
  s = s.replace(
    /\bRPAD\s*\(\s*([^,]+?)\s*,\s*(\d+)\s*,\s*'([^']+)'\s*\)/gi,
    (_match, str: string, len: string, pad: string) => {
      // 生成填充字符串(假设最多填充20个字符)
      const padStr = pad.repeat(20)
      return `substr(${str} || '${padStr}', 1, ${len})`
    }
  )

  // TIMESTAMPDIFF(unit, d1, d2) → julianday差值
  // 支持 DAY/HOUR/MINUTE/SECOND
  s = s.replace(
    /TIMESTAMPDIFF\s*\(\s*(DAY|HOUR|MINUTE|SECOND)\s*,\s*([^,]+?)\s*,\s*([^)]+?)\s*\)/gi,
    (_match, unit: string, d1: string, d2: string) => {
      const multiplier = unit.toUpperCase() === 'DAY' ? 1
                      : unit.toUpperCase() === 'HOUR' ? 24
                      : unit.toUpperCase() === 'MINUTE' ? 24 * 60
                      : 24 * 60 * 60
      return `CAST((julianday(${d2}) - julianday(${d1})) * ${multiplier} AS INTEGER)`
    }
  )

  // IF(cond, true_val, false_val) → CASE WHEN cond THEN true_val ELSE false_val END
  s = s.replace(
    /\bIF\s*\(\s*([^,]+?)\s*,\s*([^,]+?)\s*,\s*([^)]+?)\s*\)/gi,
    (_match, cond: string, trueVal: string, falseVal: string) =>
      `CASE WHEN ${cond} THEN ${trueVal} ELSE ${falseVal} END`
  )

  // LPAD(str, len, pad) → 简化：用 printf
  s = s.replace(
    /\bLPAD\s*\(\s*([^,]+?)\s*,\s*(\d+)\s*,\s*'([^']+)'\s*\)/gi,
    (_match, str: string, len: string, _pad: string) =>
      `printf('%${len}s', ${str})`
  )

  // 去掉单独的 INTERVAL 表达式（如果上面 DATE_ADD/DATE_SUB 没匹配到）
  s = s.replace(/\bINTERVAL\s+\d+\s+(DAY|DAYS|MONTH|MONTHS|YEAR|YEARS)\b/gi, '')

  return s
}

function replaceDateFunc(s: string, funcName: string, sqliteFmt: string): string {
  const re = new RegExp(`\\b${funcName}\\s*\\(\\s*([^)]+?)\\s*\\)`, 'gi')
  return s.replace(re, (_match, expr: string) => `cast(strftime('${sqliteFmt}', ${expr}) as integer)`)
}

function convertMySqlDateFormat(mysqlFmt: string): string {
  return mysqlFmt
    .replace(/%Y/g, '%Y')
    .replace(/%m/g, '%m')
    .replace(/%d/g, '%d')
    .replace(/%H/g, '%H')
    .replace(/%i/g, '%M')
    .replace(/%s/g, '%S')
    .replace(/%U/g, '%W')
    .replace(/%u/g, '%W')
}

function convertConcat(s: string): string {
  let result = s
  let maxIter = 10
  while (maxIter-- > 0 && /CONCAT\s*\(/gi.test(result)) {
    result = convertConcatOnce(result)
  }
  return result
}

function convertConcatOnce(s: string): string {
  const upper = s.toUpperCase()
  const idx = upper.lastIndexOf('CONCAT(')
  if (idx === -1) return s

  let depth = 0
  let end = -1
  for (let i = idx + 7; i < s.length; i++) {
    if (s[i] === '(') depth++
    else if (s[i] === ')') {
      if (depth === 0) { end = i; break }
      depth--
    }
  }
  if (end === -1) return s

  const inner = s.slice(idx + 7, end)
  const args = splitTopLevel(inner, ',')
  const joined = args.map(a => a.trim()).join(' || ')

  return s.slice(0, idx) + `(${joined})` + s.slice(end + 1)
}

function splitTopLevel(s: string, sep: string): string[] {
  const parts: string[] = []
  let depth = 0
  let current = ''
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') depth++
    else if (s[i] === ')') depth--
    if (s[i] === sep && depth === 0) {
      parts.push(current)
      current = ''
    } else {
      current += s[i]
    }
  }
  parts.push(current)
  return parts
}

const SqlPlayground: React.FC<SqlPlaygroundProps> = ({ initialCode, setupSql }) => {
  const [code, setCode] = useState(initialCode || '')
  const [result, setResult] = useState<QueryResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [dbReady, setDbReady] = useState(false)
  const dbRef = useRef<SqlJsDatabase | null>(null)

  useEffect(() => {
    let cancelled = false
    const initDb = async () => {
      try {
        const SQL = await loadSqlJs()
        if (cancelled) return
        if (dbRef.current) {
          try { dbRef.current.close() } catch { /* ignore */ }
        }
        const db = new SQL.Database()
        if (setupSql) {
          const statements = setupSql
            .split(';')
            .map(s => s.trim().replace(/^--.*$/gm, '').trim())
            .filter(s => s.length > 0)
          for (const stmt of statements) {
            try {
              db.run(stmt)
            } catch (stmtErr) {
              console.warn('[SQL] 跳过语句:', stmt.substring(0, 80), String(stmtErr))
            }
          }
        }
        dbRef.current = db
        setDbReady(true)
      } catch (err) {
        console.error('SQL.js init failed:', err)
        setError('数据库加载失败，请刷新重试')
      }
    }
    initDb()
    return () => {
      cancelled = true
      if (dbRef.current) {
        try { dbRef.current.close() } catch { /* ignore */ }
        dbRef.current = null
      }
    }
  }, [setupSql])

  const runQuery = useCallback(() => {
    const db = dbRef.current
    if (!db) return
    setIsLoading(true)
    setError(null)
    setResult(null)

    Promise.resolve().then(() => {
      try {
        const converted = convertQueryToSqlite(code)
        const statements = converted
          .split(';')
          .map(s => s.trim())
          .filter(s => s.length > 0)

        let lastResult: { columns: string[]; values: unknown[][] } | null = null
        for (const stmt of statements) {
          const results = db.exec(stmt)
          if (results.length > 0) {
            lastResult = results[results.length - 1]
          }
        }

        if (!lastResult || lastResult.columns.length === 0) {
          setResult({ columns: [], rows: [] })
          return
        }

        const MAX_ROWS = 500
        const slicedValues = lastResult.values.slice(0, MAX_ROWS)
        const rows = slicedValues.map((vals: unknown[]) => {
          const row: Record<string, string> = {}
          lastResult!.columns.forEach((col: string, i: number) => {
            row[col] = vals[i] === null ? 'NULL' : String(vals[i])
          })
          return row
        })
        setResult({ columns: lastResult.columns, rows })
      } catch (err) {
        setError(String(err))
      } finally {
        setIsLoading(false)
      }
    })
  }, [code])

  if (!dbReady && !error) {
    return (
      <div className="sql-playground sql-playground--loading">
        <div className="sql-playground__spinner" />
        <p>正在加载数据库引擎...</p>
      </div>
    )
  }

  if (error && !dbReady) {
    return (
      <div className="sql-playground sql-playground--loading">
        <p className="sql-playground__error-msg">{error}</p>
      </div>
    )
  }

  return (
    <div className="sql-playground">
      <div className="sql-playground__editor-area">
        <CodeMirror
          value={code}
          height="200px"
          theme="dark"
          extensions={[sql()]}
          onChange={(value) => setCode(value)}
          className="sql-playground__editor"
          basicSetup={{ lineNumbers: true, highlightActiveLine: true, bracketMatching: true }}
        />
        <button className="sql-playground__run-btn" onClick={runQuery} disabled={isLoading}>
          {isLoading ? '运行中...' : '▶ 运行'}
        </button>
      </div>

      {error && (
        <div className="sql-playground__result sql-playground__result--error">
          <p className="sql-playground__error-msg">{error}</p>
        </div>
      )}

      {result && (
        <div className="sql-playground__result sql-playground__result--success">
          {result.columns.length === 0 ? (
            <p className="sql-playground__empty">查询执行成功（无结果返回）</p>
          ) : (
            <div className="sql-playground__table-wrap">
              <table className="sql-playground__table">
                <thead>
                  <tr>{result.columns.map((col) => <th key={col}>{col}</th>)}</tr>
                </thead>
                <tbody>
                  {result.rows.map((row, i) => (
                    <tr key={i}>
                      {result.columns.map((col) => <td key={col}>{row[col]}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="sql-playground__row-count">共 {result.rows.length} 条记录</p>
        </div>
      )}
    </div>
  )
}

export default SqlPlayground
