import { useState, useEffect, useCallback, useMemo } from 'react'
import Skeleton from './Skeleton'
import CodeMirror from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python'
import './PythonPlayground.css'
interface PythonPlaygroundProps {
  initialCode?: string
}
// 鍏ㄥ眬 Pyodide 瀹炰緥缂撳瓨
let pyodidePromise: Promise<any> | null = null
async function loadPyodideRuntime(): Promise<any> {
  if (pyodidePromise) return pyodidePromise
  pyodidePromise = (async () => {
    // 妫€鏌ユ槸鍚﹀凡鍔犺浇
    if ((window as any).pyodide) {
      return (window as any).pyodide
    }
    // 鍔犺浇 Pyodide - 浠?CDN 鍔犺浇
    if (!(window as any).loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement('script')
        // 浠?jsdelivr CDN 鍔犺浇 Pyodide锛堝浗鍐呭彲璁块棶锛?
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.js'
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Failed to load Pyodide from CDN'))
        document.head.appendChild(script)
      })
    }
    // 浣跨敤 CDN 鍔犺浇 Pyodide锛堟牳蹇冩枃浠跺拰鍖呴兘浠?CDN锛?
    const pyodide = await (window as any).loadPyodide({
      indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.27.0/full/',
    })
    // 缂撳瓨鍒板叏灞€
    ;(window as any).pyodide = pyodide
    return pyodide
  })()
  return pyodidePromise
}
// 鏈€灏忓寲鍖呭姞杞?- 鍙姞杞藉繀闇€鐨勫寘锛屽叾浠栨寜闇€鍔犺浇
async function loadMinimalPackages(pyodide: any) {
  // 鍙姞杞?micropip 鐢ㄤ簬鍚庣画鎸夐渶瀹夎
  await pyodide.loadPackage(['micropip'])
  // 棰勯厤缃幆澧冿紝浣嗕笉鍔犺浇閲嶅寘
  await pyodide.runPythonAsync(`
import warnings
import io
import base64
import logging
import os
# 预置虚拟文件系统
os.makedirs("/home/pyodide/data", exist_ok=True)
os.makedirs("/home/pyodide/output", exist_ok=True)
with open("/home/pyodide/report.txt", "w", encoding="utf-8") as f:
    f.write("销售数据分析报告\\n")
    f.write("=" * 30 + "\\n")
    f.write("生成时间：2024-01-15\\n")
    f.write("总销售金额：1,000,000元\\n")
    f.write("平均订单：500元\\n")
with open("/home/pyodide/sales.csv", "w", encoding="utf-8") as f:
    f.write("月份,销售额,利润,区域\\n")
    f.write("1月,12000,3000,华东\\n")
    f.write("2月,15000,4000,华东\\n")
    f.write("3月,18000,5000,华南\\n")
with open("/home/pyodide/config.json", "w", encoding="utf-8") as f:
    f.write("{\\n")
    f.write("  \\"app_name\\": \\"数据分析工具\\",\\n")
    f.write("  \\"version\\": \\"1.0.0\\",\\n")
    f.write("  \\"database\\": {\\n")
    f.write("    \\"host\\": \\"localhost\\",\\n")
    f.write("    \\"port\\": 3306,\\n")
    f.write("    \\"name\\": \\"sales_db\\"\\n")
    f.write("  },\\n")
    f.write("  \\"features\\": [\\"数据清洗\\", \\"统计分析\\", \\"报告生成\\"],\\n")
    f.write("  \\"debug\\": true\\n")
    f.write("}\\n")
with open("/home/pyodide/old_data.txt", "w", encoding="utf-8") as f:
    f.write("这是老系统的数据\\n")
    f.write("包含一些历史记录\\n")
with open("/home/pyodide/data.txt", "w", encoding="utf-8") as f:
    f.write("这是一份测试数据\\n")
    f.write("用于文件读取练习\\n")
os.chdir("/home/pyodide")
print("虚拟文件系统已就绪")
  `)
  pyodide._minimalLoaded = true
}
// 按需加载数据分析包
async function loadDataPackages(pyodide: any) {
  if (pyodide._dataPackagesLoaded) return
  console.log('Loading data packages...')
  await pyodide.loadPackage(['numpy', 'pandas'])
  pyodide._dataPackagesLoaded = true
  console.log('Data packages loaded')
}
// 按需加载绘图包（包含 matplotlib 和 seaborn）
async function loadPlottingPackages(pyodide: any) {
  if (pyodide._plottingPackagesLoaded) return
  console.log('Loading plotting packages...')
  await pyodide.runPythonAsync(`
import micropip\\n
await micropip.install('matplotlib')\\n
await micropip.install('seaborn')\\n
import matplotlib\\n
import matplotlib.pyplot as plt\\n
matplotlib.use('AGG')\\n
import seaborn as sns\\n
warnings.filterwarnings('ignore')\\n
logging.getLogger('matplotlib').setLevel(logging.ERROR)\\n
matplotlib.rcParams['font.family'] = 'DejaVu Sans'\\n
matplotlib.rcParams['axes.unicode_minus'] = False\\n
def _show_plot():\\n
    buf = io.BytesIO()\\n
    plt.savefig(buf, format='png', dpi=100, bbox_inches='tight')\\n
    buf.seek(0)\\n
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')\\n
    print(f'<img src="data:image/png;base64,{img_base64}" />')\\n
    plt.close('all')\\n
plt.show = _show_plot\\n
import builtins\\n
builtins._show_plot = _show_plot
  `)
  pyodide._plottingPackagesLoaded = true
  console.log('Plotting packages loaded (matplotlib + seaborn)')
}
// 涓嶆敮鎸佺殑鍖呭垪琛紙娴忚鍣ㄧ幆澧冮檺鍒讹級
const UNSUPPORTED_PACKAGES = [
  'mysql', 'psycopg2', 'sqlalchemy', 'pymongo', 'redis', 'requests', 'selenium',
  'beautifulsoup4', 'bs4', 'lxml', 'pillow', 'cv2', 'opencv', 'nltk', 'spacy',
  'tensorflow', 'torch', 'keras'
]
// 妫€娴嬩笉鏀寔鐨勫寘
function detectUnsupportedPackages(code: string): string[] {
  const detected: string[] = []
  for (const pkg of UNSUPPORTED_PACKAGES) {
    const patterns = [
      new RegExp(`import\\s+${pkg}`, 'i'),
      new RegExp(`from\\s+${pkg}`, 'i'),
      new RegExp(`import\\s+\\w+\\s+as\\s+${pkg}`, 'i'),
    ]
    if (patterns.some(p => p.test(code))) {
      detected.push(pkg)
    }
  }
  return detected
}
// 智能检测娴嬩唬鐮侀渶瑕佺殑鍖呭苟鑷姩鍔犺浇
async function smartLoadPackages(pyodide: any, code: string): Promise<string | null> {
  // 妫€娴嬩笉鏀寔鐨勫寘
  const unsupported = detectUnsupportedPackages(code)
  if (unsupported.length > 0) {
    return `Browser not supported: ${unsupported.join(', ')}. Supported: numpy, pandas, matplotlib, seaborn. Run locally.`;
  }
  // 妫€娴嬫槸鍚﹂渶瑕?numpy/pandas
  if (/import\s+(numpy|np|pandas|pd)/.test(code) || /from\s+(numpy|pandas)/.test(code)) {
    await loadDataPackages(pyodide)
  }
  // 妫€娴嬫槸鍚﹂渶瑕?matplotlib/seaborn
  if (/import\s+(matplotlib|plt|seaborn|sns)/.test(code) || /from\s+(matplotlib|seaborn)/.test(code) || /\.plot\(|plt\.|sns\./.test(code)) {
    await loadPlottingPackages(pyodide)
  }
  return null
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
  // 缂撳瓨 Python 鎵╁睍
  const pythonExtension = useMemo(() => python(), [])
  useEffect(() => {
    let cancelled = false
    const init = async () => {
      try {
        const pyodide = (window as any).pyodide
        // 宸插畬鍏ㄥ姞杞?
        if (pyodide?._minimalLoaded) {
          if (!cancelled) {
            setPyodideReady(true)
            setLoadingProgress('')
          }
          return
        }
        // 加载核心
        setLoadingProgress('加载 Python 环境...')
        const loadedPyodide = await loadPyodideRuntime()
        if (cancelled) return
        // 鍔犺浇鏈€灏忓寘
        if (!loadedPyodide._minimalLoaded) {
          setLoadingProgress('初始化环境...')
          await loadMinimalPackages(loadedPyodide)
        }
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
        // 智能检测娴嬪苟鍔犺浇闇€瑕佺殑鍖?
        setLoadingProgress('检测依赖...')
        const unsupportedError = await smartLoadPackages(pyodide, code)
        setLoadingProgress('')
        // 濡傛灉鏈変笉鏀寔鐨勫寘锛屾樉绀哄弸濂芥彁绀?
        if (unsupportedError) {
          setError(unsupportedError)
          setIsLoading(false)
          return
        }
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
        setLoadingProgress('')
      }
    })
  }, [code, pyodideReady])
  if (pyodideError) {
    return (
      <div className="python-playground python-playground--loading">
        <div className="python-playground__error-box">
          <p className="python-playground__error-msg">{pyodideError}</p>
          <button className="python-playground__retry-btn" onClick={() => window.location.reload()}>
            刷新重试
          </button>
        </div>
      </div>
    )
  }
  if (!pyodideReady) {
    return (
      <div className="python-playground python-playground--loading">
        <div className="python-playground__skeleton-editor">
          <Skeleton variant="rect" height="200px" />
        </div>
        <div className="python-playground__skeleton-toolbar">
          <Skeleton variant="text" width="100px" />
        </div>
        <div className="python-playground__skeleton-status">
          <div className="python-playground__loading-text">
            <span className="python-playground__loading-dot" />
            {loadingProgress || '正在加载 Python 运行环境...'}
          </div>
          <p className="python-playground__loading-hint">首次加载约5-10秒</p>
        </div>
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
          {isLoading ? (loadingProgress || '运行中...') : '▶ 运行'}
        </button>
      </div>
      {hasRun && !output && !error && !isLoading && (
        <div className="python-playground__result python-playground__result--success">
          <p className="python-playground__empty">代码执行成功（无输出）</p>
        </div>
      )}
      {output && (
        <div className="python-playground__result python-playground__result--success">
          <div
            className="python-playground__output"
            dangerouslySetInnerHTML={{ __html: output.replace(/<img /g, '<img style="max-width:100%;height:auto;" ') }}
          />
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