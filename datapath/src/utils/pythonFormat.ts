/** Python 语法高亮 */

export function highlightPython(text: string): string {
  // 1. 转义 HTML 特殊字符
  let s = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  // 2. 占位符系统，防止正则重叠
  const slots: string[] = []
  function slot(html: string): string {
    slots.push(html)
    return '\x01' + (slots.length - 1) + '\x01'
  }

  // 保护字符串和注释
  s = s.replace(/(f?)("""|''')(?:(?!\2)[\s\S])*?\2/g, m => slot('<span class="py-str">' + m + '</span>'))
  s = s.replace(/(f?)("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g, m => slot('<span class="py-str">' + m + '</span>'))
  s = s.replace(/(#.*$)/gm, m => slot('<span class="py-comment">' + m + '</span>'))

  // 库 API
  s = s.replace(
    /\b(np|numpy|pd|pandas|plt|sns|seaborn)(\.\w+)/g,
    (_, lib, attr) => slot('<span class="py-lib">' + lib + '</span><span class="py-attr">' + attr + '</span>')
  )

  // 关键词
  s = s.replace(
    /\b(def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|raise|with|yield|lambda|pass|break|continue|and|or|not|in|is|True|False|None|global|nonlocal|assert|del|async|await)\b/g,
    (_, w) => slot('<span class="py-kw">' + w + '</span>')
  )

  // 内置函数
  s = s.replace(
    /\b(print|len|range|type|isinstance|input|int|float|str|bool|list|dict|set|tuple|open|super|property|staticmethod|classmethod|enumerate|zip|map|filter|sorted|reversed|any|all|min|max|sum|abs|round|hasattr|getattr|setattr|iter|next|id|hex|bin|oct|chr|ord|self)\b/g,
    (_, w) => slot('<span class="py-builtin">' + w + '</span>')
  )

  // 3. 替换占位符
  s = s.replace(/\x01(\d+)\x01/g, (_, i) => slots[parseInt(i)])

  return s
}

export function formatPythonContent(text: string): string {
  if (!text) return ''
  const lines = text.split('\n')
  return lines
    .map((line) => {
      const isPython =
        /^(def|class|import|from|if|for|while|with|try|return|print|#|@|\.\w+\(|np\.|pd\.|plt\.|sns\.|df\.)/.test(line.trim()) ||
        (/[=<>!\+\-\*\/%]/.test(line) && /\b(print|def|for|if|return|import)\b/.test(line))
      const highlighted = highlightPython(line)
      if (!isPython) return highlighted
      return '<code class="code-inline">' + highlighted + '</code>'
    })
    .join('<br>')
}
