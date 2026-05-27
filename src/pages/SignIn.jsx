import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../lib/useAuth'
import {
  Mail, Lock, User, Building2, ArrowLeft, LogIn, UserPlus, AlertCircle, CheckCircle
} from 'lucide-react'

const DEPARTMENTS = [
  'Operations', 'Customer Success', 'Engineering', 'Sales',
  'Marketing', 'Finance', 'Human Resources', 'Executive', 'Unassigned'
]

export default function SignIn() {
  const [mode, setMode] = useState('signin') // signin | signup
  const [form, setForm] = useState({
    email: '', password: '',
    full_name: '', department: 'Unassigned',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError(''); setSuccess('')

    if (mode === 'signup') {
      const { error } = await signUp(form.email, form.password, {
        full_name: form.full_name,
        department: form.department,
      })
      if (error) { setError(error.message); setLoading(false); return }
      setSuccess('Account created. Signing you in...')
      const { error: siErr } = await signIn(form.email, form.password)
      setLoading(false)
      if (siErr) {
        setError('Account created. Please check your email to confirm, then sign in.')
        setMode('signin')
        return
      }
      navigate('/dashboard')
      return
    }

    const { error } = await signIn(form.email, form.password)
    setLoading(false)
    if (error) { setError(error.message); return }
    navigate('/dashboard')
  }

  const inputCls = 'w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent transition-all placeholder:text-[#94A3B8]'
  const labelCls = 'flex items-center gap-1.5 text-sm font-medium text-[#0F172A] mb-2'

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B1D3A] via-[#142952] to-[#1A56DB] flex items-center justify-center px-4 py-10 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#F59E0B]/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-up" style={{ opacity: 0 }}>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to home
        </Link>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#0B1D3A] px-8 py-7 text-center">
            <div className="w-14 h-14 bg-[#1A56DB] rounded-xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow ring-1 ring-white/10">
              <svg viewBox="0 0 32 32" width="26" height="26">
                <path d="M9 22 L16 8 L23 22 M11.5 17.5 H20.5"
                      stroke="#F59E0B" strokeWidth="2.6"
                      strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <h1 className="text-white text-2xl font-extrabold font-[Playfair_Display]">
              {mode === 'signin' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-blue-300 text-sm mt-1">
              Arus Expense Management
            </p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" /> {error}
              </div>
            )}
            {success && (
              <div className="mb-5 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
                <CheckCircle size={16} className="mt-0.5 flex-shrink-0" /> {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <>
                  <div>
                    <label className={labelCls}>
                      <User size={14} className="text-[#64748B]" /> Full Name
                    </label>
                    <input
                      type="text" required
                      value={form.full_name}
                      onChange={(e) => update('full_name', e.target.value)}
                      placeholder="Jane Doe"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>
                      <Building2 size={14} className="text-[#64748B]" /> Department
                    </label>
                    <select
                      value={form.department}
                      onChange={(e) => update('department', e.target.value)}
                      className={inputCls + ' text-[#0F172A]'}
                    >
                      {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </>
              )}

              <div>
                <label className={labelCls}>
                  <Mail size={14} className="text-[#64748B]" /> Email
                </label>
                <input
                  type="email" required
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  placeholder="you@arus.com"
                  className={inputCls}
                />
              </div>

              <div>
                <label className={labelCls}>
                  <Lock size={14} className="text-[#64748B]" /> Password
                </label>
                <input
                  type="password" required minLength={6}
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  placeholder="••••••••"
                  className={inputCls}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1A56DB] hover:bg-[#1E40AF] text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-blue-500/20 mt-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {mode === 'signin'
                      ? <><LogIn size={18} /> Sign In</>
                      : <><UserPlus size={18} /> Create Account</>}
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 text-center text-sm text-[#64748B]">
              {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setSuccess('') }}
                className="text-[#1A56DB] hover:underline font-semibold cursor-pointer"
              >
                {mode === 'signin' ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-blue-400/60 text-xs mt-5">
          Secured by Supabase Auth · © {new Date().getFullYear()} Arus
        </p>
      </div>
    </div>
  )
}
