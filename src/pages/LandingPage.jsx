import { Link } from 'react-router-dom'
import { useAuth } from '../lib/useAuth'
import {
  ArrowRight, Send, ShieldCheck, BarChart3,
  Receipt, Globe2, CheckCircle2, Building2
} from 'lucide-react'

const FEATURES = [
  {
    icon: Send,
    iconBg: 'bg-[#1A56DB]',
    title: 'Submit in seconds',
    desc: 'Snap a receipt, set a category, and you’re done. No paperwork, no email chains, no spreadsheets.',
  },
  {
    icon: ShieldCheck,
    iconBg: 'bg-[#F59E0B]',
    title: 'Role-based approval',
    desc: 'Approvers and admins review, approve, or reject from one streamlined, audit-ready dashboard.',
  },
  {
    icon: BarChart3,
    iconBg: 'bg-[#10B981]',
    title: 'Real-time analytics',
    desc: 'Live charts of spend by category, department, and month — powered by Recharts.',
  },
  {
    icon: Globe2,
    iconBg: 'bg-[#3B82F6]',
    title: 'Multi-currency',
    desc: 'Submit in USD, COP, EUR, or GBP. Every transaction is captured and fully auditable.',
  },
]

const STATS = [
  { value: '99.9%', label: 'Uptime' },
  { value: '<2s',   label: 'Submit time' },
  { value: '4',     label: 'Currencies' },
  { value: '10+',   label: 'Categories' },
]

const STEPS = [
  { title: 'Submit',  desc: 'Fill out the form, attach a receipt link, and submit. Takes under a minute.' },
  { title: 'Approve', desc: 'Approvers see new submissions instantly and act with a single click.' },
  { title: 'Analyze', desc: 'Admins track spend across departments, categories, and months in real time.' },
]

export default function LandingPage() {
  const { user } = useAuth()
  const ctaTarget = user ? '/dashboard' : '/signin'

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* ============== NAVBAR (fixed) ============== */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#0B1D3A] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 ring-1 ring-white/20 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 32 32" width="18" height="18">
                <path d="M9 22 L16 8 L23 22 M11.5 17.5 H20.5"
                      stroke="#F59E0B" strokeWidth="2.6"
                      strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <span className="text-lg font-extrabold tracking-tight font-[Playfair_Display]">Arus</span>
            <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F59E0B] bg-white/5 ring-1 ring-white/10 rounded-full px-2.5 py-1">
              Expense CRM
            </span>
          </Link>

          <Link
            to={ctaTarget}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
          >
            {user ? 'Dashboard' : 'Sign In'} <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      {/* ============== HERO ============== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1D3A] via-[#142952] to-[#1A56DB] text-white">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#3B82F6] rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-20 w-[28rem] h-[28rem] bg-[#F59E0B] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-8 py-20 text-center">
          <h1
            className="text-5xl font-extrabold leading-tight text-white mb-4 font-[Playfair_Display] animate-fade-up"
            style={{ animationDelay: '50ms', opacity: 0 }}
          >
            Expense management,
            <br />
            <span className="text-[#F59E0B]">re-imagined</span> for Arus.
          </h1>

          <p
            className="text-lg text-blue-200 leading-relaxed max-w-2xl mx-auto mb-8 animate-fade-up"
            style={{ animationDelay: '150ms', opacity: 0 }}
          >
            One portal for employees to submit travel and business expenses, and for
            approvers to review, approve, and analyze — in real time.
          </p>

          <div
            className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up"
            style={{ animationDelay: '250ms', opacity: 0 }}
          >
            <Link
              to={ctaTarget}
              className="inline-flex items-center justify-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1D3A] font-bold rounded-xl px-6 py-3 shadow-lg shadow-amber-500/30 transition-all"
            >
              <Send size={18} /> Submit an Expense
            </Link>
            <Link
              to="/signin"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur ring-1 ring-white/20 text-white font-semibold rounded-xl px-6 py-3 transition-all"
            >
              <ShieldCheck size={18} /> Sign In
            </Link>
          </div>

          {/* Stats inside hero */}
          <div
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto animate-fade-up"
            style={{ animationDelay: '350ms', opacity: 0 }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-white/10 backdrop-blur ring-1 ring-white/15 rounded-xl p-4 text-center"
              >
                <div className="text-2xl md:text-3xl font-extrabold text-[#F59E0B] leading-tight">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-blue-200 mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== FEATURES ============== */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-[#F59E0B] text-xs font-bold uppercase tracking-[0.18em] mb-2">
            Why Arus
          </p>
          <h2 className="text-3xl font-bold text-center text-[#0B1D3A] leading-tight mb-4 font-[Playfair_Display]">
            Everything finance teams actually need.
          </h2>
          <p className="text-center text-gray-500 leading-relaxed mb-12 max-w-xl mx-auto">
            Built end-to-end on Supabase — secure, fast, and audit-ready from day one.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-8 hover:shadow-lg transition-all animate-fade-up"
                style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
              >
                <div className={`w-12 h-12 rounded-full ${f.iconBg} flex items-center justify-center mb-4 shadow-md`}>
                  <f.icon size={20} className="text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#0B1D3A] leading-tight mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== HOW IT WORKS ============== */}
      <section className="bg-[#F8FAFC] py-20">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-[#F59E0B] text-xs font-bold uppercase tracking-[0.18em] mb-2">
            How it works
          </p>
          <h2 className="text-3xl font-bold text-center text-[#0B1D3A] leading-tight mb-4 font-[Playfair_Display]">
            Three steps, start to finish.
          </h2>
          <p className="text-center text-gray-500 leading-relaxed mb-12 max-w-xl mx-auto">
            From submission to approval to insight — the entire workflow in one place.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all animate-fade-up"
                style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}
              >
                <div className="w-8 h-8 rounded-full bg-[#1A56DB] text-white flex items-center justify-center text-sm font-bold mb-4 shadow-sm">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-[#0B1D3A] leading-tight mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to={ctaTarget}
              className="inline-flex items-center gap-2 bg-[#1A56DB] hover:bg-[#1E40AF] text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all"
            >
              Get Started <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============== CTA BANNER ============== */}
      <section className="bg-[#0B1D3A] py-16 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-[#F59E0B] opacity-10 blur-3xl rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="inline-flex items-center gap-2 text-[#F59E0B] text-xs uppercase tracking-[0.18em] font-bold mb-3">
                <Building2 size={14} /> For Arus Employees
              </p>
              <h2 className="text-3xl font-bold text-white leading-tight mb-2 font-[Playfair_Display]">
                Ready to submit your next expense?
              </h2>
              <p className="text-blue-300 leading-relaxed">
                Sign in with your work credentials and get started in under a minute.
              </p>
            </div>

            <Link
              to={ctaTarget}
              className="inline-flex items-center justify-center gap-2 bg-[#F59E0B] hover:bg-[#D97706] text-[#0B1D3A] font-bold rounded-xl px-8 py-4 shadow-lg shadow-amber-500/30 whitespace-nowrap transition-all"
            >
              <CheckCircle2 size={18} /> Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* ============== FOOTER ============== */}
      <footer className="bg-[#0B1D3A] border-t border-white/10 py-6">
        <div className="max-w-7xl mx-auto px-8 text-center text-blue-400 text-sm">
          © {new Date().getFullYear()} Arus — Expense Management CRM ·
          <span className="ml-1">Built on Supabase</span>
        </div>
      </footer>
    </div>
  )
}
