import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useAuth } from '../contexts/AuthContext'
import './AuthModal.css'

interface AuthModalProps {
  visible: boolean
  onClose: () => void
}

type Mode = 'login' | 'register' | 'forgot'

// 友好的错误提示映射
const getFriendlyError = (error: string): string => {
  if (error.includes('Invalid login credentials')) {
    return '邮箱或密码错误，请检查后重试'
  }
  if (error.includes('Email not confirmed')) {
    return '邮箱未验证，请查收验证邮件'
  }
  if (error.includes('Password should be at least')) {
    return '密码至少需要6位字符'
  }
  if (error.includes('Invalid email')) {
    return '请输入有效的邮箱地址'
  }
  if (error.includes('User already registered')) {
    return '该邮箱已注册，请直接登录'
  }
  if (error.includes('Unable to validate email address')) {
    return '邮箱格式不正确'
  }
  return error || '操作失败，请稍后重试'
}

export default function AuthModal({ visible, onClose }: AuthModalProps) {
  const { signIn, signUp, resetPassword } = useAuth()
  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!visible) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    try {
      if (mode === 'login') {
        const result = await signIn(email, password)
        if (result.error) {
          setError(getFriendlyError(result.error))
        } else {
          onClose()
        }
      } else if (mode === 'register') {
        const result = await signUp(email, password)
        if (result.error) {
          setError(getFriendlyError(result.error))
        } else {
          setSuccess(true)
        }
      } else if (mode === 'forgot') {
        const result = await resetPassword(email)
        if (result.error) {
          setError(getFriendlyError(result.error))
        } else {
          setSuccess(true)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const switchMode = (newMode: Mode) => {
    setMode(newMode)
    setError(null)
    setSuccess(false)
  }

  return createPortal(
    <div className="auth-modal" onClick={onClose}>
      <div className="auth-modal__card" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal__close" onClick={onClose}>
          &times;
        </button>

        <h2 className="auth-modal__title">
          {mode === 'login' ? '登录' : mode === 'register' ? '注册' : '重置密码'}
        </h2>

        {success && (
          <div className="auth-modal__success">
            {mode === 'forgot' ? '重置邮件已发送，请查收邮箱' : '注册成功！请查收验证邮件'}
          </div>
        )}

        <form className="auth-modal__form" onSubmit={handleSubmit}>
          <input
            className="auth-modal__input"
            type="email"
            placeholder="邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          {mode !== 'forgot' && (
            <input
              className="auth-modal__input"
              type="password"
              placeholder="密码（至少6位）"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
            />
          )}

          {mode === 'login' && (
            <div
              className="auth-modal__forgot"
              onClick={() => switchMode('forgot')}
              style={{ cursor: 'pointer' }}
            >
              忘记密码？
            </div>
          )}

          {error && <div className="auth-modal__error">{error}</div>}

          <button
            className="auth-modal__submit"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <span className="auth-modal__loading">
                <span className="auth-modal__spinner"></span>
                处理中...
              </span>
            ) : (
              mode === 'login' ? '登录' : mode === 'register' ? '注册' : '发送重置邮件'
            )}
          </button>
        </form>

        <div className="auth-modal__switch">
          {mode === 'login' ? (
            <span>没有账号？<button onClick={() => switchMode('register')}>注册</button></span>
          ) : mode === 'register' ? (
            <span>已有账号？<button onClick={() => switchMode('login')}>登录</button></span>
          ) : (
            <span>想起密码了？<button onClick={() => switchMode('login')}>返回登录</button></span>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}
