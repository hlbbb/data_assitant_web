import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { syncAccessFromCloud, resetAccess } from '../utils/access'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: string | null }>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
      if (session?.user) {
        syncAccessFromCloud(session.user.id)
      }
    }).catch(() => setLoading(false))

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) {
          syncAccessFromCloud(session.user.id)
        } else {
          // 用户退出登录时清除本地访问权限
          resetAccess()
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!isSupabaseConfigured) return { error: '登录服务未配置' }
    console.log('[Auth] Attempting sign in for:', email)
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    console.log('[Auth] Sign in result:', { data, error })
    return { error: error?.message ?? null }
  }

  const signUp = async (email: string, password: string) => {
    if (!isSupabaseConfigured) return { error: '登录服务未配置' }
    console.log('[Auth] Attempting sign up for:', email)
    const { data, error } = await supabase.auth.signUp({ email, password })
    console.log('[Auth] Sign up result:', { data, error })
    return { error: error?.message ?? null }
  }

  const signOut = async () => {
    if (!isSupabaseConfigured) return
    await supabase.auth.signOut()
  }

  const resetPassword = async (email: string) => {
    if (!isSupabaseConfigured) return { error: '登录服务未配置' }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + window.location.pathname
    })
    return { error: error?.message ?? null }
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
