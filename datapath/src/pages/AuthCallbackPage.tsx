import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AuthCallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // 处理 Supabase 认证回调（邮箱验证、密码重置等）
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error('[AuthCallback] Error:', error)
          navigate('/')
          return
        }

        // 检查 URL 参数判断回调类型
        const params = new URLSearchParams(window.location.search)
        const type = params.get('type')

        if (type === 'recovery') {
          // 密码重置回调
          console.log('[AuthCallback] Password recovery callback')
          // 可以跳转到重置密码页面
          navigate('/?reset=true')
        } else if (type === 'signup') {
          // 邮箱验证回调
          console.log('[AuthCallback] Email confirmation callback')
          navigate('/?confirmed=true')
        } else {
          // 其他情况
          console.log('[AuthCallback] Session:', data.session)
          navigate('/')
        }
      } catch (err) {
        console.error('[AuthCallback] Unexpected error:', err)
        navigate('/')
      }
    }

    handleCallback()
  }, [navigate])

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '1.2rem',
      color: '#666'
    }}>
      正在处理验证...
    </div>
  )
}
