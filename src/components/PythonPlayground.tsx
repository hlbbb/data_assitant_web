import { useState, useEffect, useCallback, useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import './PythonPlayground.css'

interface PythonPlaygroundProps {
  initialCode?: string
}

// 全局 Pyodide 实例缓存
let pyodidePromise: Promise<any> | null = null
let pyodideLoaded = false
let packagesLoaded = false

async function loadPyodideRuntime(): Promise<any> {
  if (pyodidePromise) return pyodidePromise

  pyodidePromise = (async () => {
    // 检查是否已加载
    if ((window as any).pyodide) {
      pyodideLoaded = true
      return (window as any).pyodide
    }

    // 加载 Pyodide
    if (!(window as any).loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js'
        script.crossOrigin = 'anonymous'
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Failed to load Pyodide'))
        document.head.appendChild(script)
      })
    }

    const pyodide = await (window as any).loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/',
    })

    // 缓存到全局
    ;(window as any).pyodide = pyodide
    pyodideLoaded = true

    return pyodide
  })()

  return pyodidePromise
}

// 加载 Python 包
export async function preloadPackages() {
  if (packagesLoaded) return

  try {
    const pyodide = await loadPyodideRuntime()
    if (!pyodide._packagesLoaded) {
      console.log('Loading Python packages...')

      // 加载包
      await pyodide.loadPackage(['micropip', 'numpy', 'pandas', 'matplotlib'])

      // 配置环境
      await pyodide.runPythonAsync(`
import micropip
import warnings
import matplotlib
import matplotlib.pyplot as plt
import io
import base64
import logging

# 安装 requests
await micropip.install('requests')

# 配置 matplotlib
matplotlib.use('AGG')
warnings.filterwarnings('ignore')
logging.getLogger('matplotlib').setLevel(logging.ERROR)
logging.getLogger('matplotlib.font_manager').setLevel(logging.ERROR)

matplotlib.rcParams['font.family'] = 'DejaVu Sans'
matplotlib.rcParams['axes.unicode_minus'] = False

# 显示图表函数
def show_plot():
    buf = io.BytesIO()
    plt.savefig(buf, format='png', dpi=100, bbox_inches='tight')
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    print(f'<img src="data:image/png;base64,{img_base64}" />')
    plt.close()

import builtins
builtins.show_plot = show_plot
      `)

      pyodide._packagesLoaded = true
      packagesLoaded = true
      console.log('Python packages loaded successfully')
    }
  } catch (e) {
    console.warn('Package preload failed:', e)
  }
}

const PythonPlayground: React.FC<PythonPlaygroundProps> = ({ initialCode }) => {
  const [code, setCode] = useState(initialCode || '')
  const [output, setOutput] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [pyodideReady, setPyodideReady] = useState(false)
  const [pyodideError, setPyodideError] = useState<string>('')
  const [hasRun, setHasRun] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState<string>('')

  // 缓存 Python 扩展,避免每次重新创建
  const pythonExtension = useMemo(() => python(), [])

  useEffect(() => {
    let cancelled = false

    const init = async () => {
      try {
        // 如果已经完全加载过,直接使用
        if (pyodideLoaded && packagesLoaded && (window as any).pyodide) {
          if (!cancelled) {
            setPyodideReady(true)
            setLoadingProgress('')
          }
          return
        }

        setLoadingProgress('加载 Python 环境...')
        const pyodide = await loadPyodideRuntime()

        if (cancelled) return

        // 如果包已加载,直接完成
        if (pyodide._packagesLoaded) {
          if (!cancelled) {
            setPyodideReady(true)
            setLoadingProgress('')
          }
          return
        }

        setLoadingProgress('安装依赖包...')
        await preloadPackages()

        if (!cancelled) {
          setPyodideReady(true)
          setLoadingProgress('')
        }
      } catch (err) {
        if (!cancelled) {
          setPyodideError(String(err))
          setLoadingProgress('')
        }
      }
    }

    init()

    return () => {
      cancelled = true
    }
  }, [])

  const runCode = useCallback(() => {
    if (!pyodideReady) return
    setIsLoading(true)
    setOutput('')
    setError('')
    setHasRun(true)

    Promise.resolve().then(async () => {
      try {
        const pyodide = await loadPyodideRuntime()
        pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
`)
        try {
          pyodide.runPython(code)
          const stdout = pyodide.runPython('sys.stdout.getvalue()')
          const stderr = pyodide.runPython('sys.stderr.getvalue()')
          setOutput(stdout || '')
          if (stderr) setError(stderr)
        } catch (execErr) {
          setError(String(execErr))
        } finally {
          pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`)
        }
      } catch (err) {
        setError(String(err))
      } finally {
        setIsLoading(false)
      }
    })
  }, [code, pyodideReady])

  if (pyodideError) {
    return (
      <div className="python-playground python-playground--loading">
        <p className="python-playground__error-msg">{pyodideError}</p>
      </div>
    )
  }

  if (!pyodideReady) {
    return (
      <div className="python-playground python-playground--loading">
        <div className="python-playground__spinner" />
        <p>{loadingProgress || '正在加载 Python 运行环境...'}</p>
        <p className="python-playground__loading-hint">
          首次加载约 10-20 秒，请耐心等待
        </p>
      </div>
    )
  }

  return (
    <div className="python-playground">
      <div className="python-playground__editor-area">
        <CodeMirror
          value={code}
          height="200px"
          theme="dark"
          extensions={[pythonExtension]}
          onChange={(value) => setCode(value)}
          className="python-playground__editor"
          basicSetup={{ lineNumbers: true, highlightActiveLine: true, bracketMatching: true }}
        />
        <button
          className="python-playground__run-btn"
          onClick={runCode}
          disabled={isLoading || !pyodideReady}
        >
          {isLoading ? '运行中...' : '▶ 运行'}
        </button>
      </div>

      {hasRun && !output && !error && !isLoading && (
        <div className="python-playground__result python-playground__result--success">
          <p className="python-playground__empty">代码执行成功（无输出）</p>
        </div>
      )}

      {output && (
        <div className="python-playground__result python-playground__result--success">
          <pre className="python-playground__output">{output}</pre>
        </div>
      )}

      {error && (
        <div className="python-playground__result python-playground__result--error">
          <p className="python-playground__error-msg">{error}</p>
        </div>
      )}
    </div>
  )
}

export default PythonPlayground