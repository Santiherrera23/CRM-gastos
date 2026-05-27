import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import React from 'react'
import { supabase } from './supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async (uid) => {
    if (!uid) { setProfile(null); return }
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', uid)
      .maybeSingle()
    if (error) {
      console.warn('profile load error', error)
      setProfile(null)
      return
    }
    setProfile(data)
  }, [])

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!mounted) return
      setSession(session)
      setUser(session?.user ?? null)
      await loadProfile(session?.user?.id)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!mounted) return
      setSession(session)
      setUser(session?.user ?? null)
      await loadProfile(session?.user?.id)
    })

    return () => { mounted = false; subscription?.unsubscribe() }
  }, [loadProfile])

  const refreshProfile = useCallback(async () => {
    if (user?.id) await loadProfile(user.id)
  }, [user?.id, loadProfile])

  const signIn = useCallback(async (email, password) => {
    return await supabase.auth.signInWithPassword({ email, password })
  }, [])

  const signUp = useCallback(async (email, password, meta = {}) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: { data: meta }
    })
  }, [])

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    setProfile(null)
    return { error }
  }, [])

  const value = {
    session,
    user,
    profile,
    loading,
    isStaff: profile?.role === 'approver' || profile?.role === 'admin',
    isAdmin: profile?.role === 'admin',
    signIn,
    signUp,
    signOut,
    refreshProfile,
  }

  return React.createElement(AuthContext.Provider, { value }, children)
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
