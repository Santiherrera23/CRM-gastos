import { Link } from 'react-router-dom'
import {
  Sparkles, ArrowRight, Send, Shield, BarChart3, Globe,
  Star, CheckCircle, TrendingUp,
} from 'lucide-react'

const FEATURES = [
  {
    icon: Send,
    title: 'Submit in Seconds',
    desc: 'Fill the form, pick a category, attach a receipt. Done in under a minute — no paperwork, no email chains.',
    bg: '#EFF6FF',
    iconColor: '#1A56DB',
  },
  {
    icon: Shield,
    title: 'Role-Based Approval',
    desc: 'Approvers and admins review, approve, or reject from one streamlined, audit-ready dashboard.',
    bg: '#FEF3C7',
    iconColor: '#D97706',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    desc: 'Live charts of spend by category, department, and month — always up to date and exportable.',
    bg: '#D1FAE5',
    iconColor: '#059669',
  },
  {
    icon: Globe,
    title: 'Multi-Currency',
    desc: 'Submit in USD, COP, EUR, or GBP. Every transaction is captured and fully auditable in one ledger.',
    bg: '#EDE9FE',
    iconColor: '#7C3AED',
  },
]

const STEPS = [
  {
    icon: Send,
    title: 'Submit',
    desc: 'Fill out the form, attach a receipt link, and submit. Takes under a minute.',
    bg: '#EFF6FF',
    iconColor: '#1A56DB',
  },
  {
    icon: CheckCircle,
    title: 'Review',
    desc: 'Approvers see new submissions instantly and can act with a single click.',
    bg: '#FEF3C7',
    iconColor: '#D97706',
  },
  {
    icon: TrendingUp,
    title: 'Analyze',
    desc: 'Admins track spend across departments, categories, and months in real time.',
    bg: '#D1FAE5',
    iconColor: '#059669',
  },
]

const STATS = [
  { value: '99.9%', label: 'Uptime' },
  { value: '<2s',   label: 'Submit Time' },
  { value: '4',     label: 'Currencies' },
  { value: '10+',   label: 'Categories' },
]

const AVATAR_COLORS = ['#1A56DB', '#F59E0B', '#10B981', '#8B5CF6']

const SECTION_CONTAINER = { maxWidth: '1140px', margin: '0 auto', padding: '0 40px' }

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', overflow: 'visible', background: '#FFFFFF' }}>

      {/* ============== NAVBAR ============== */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid #F1F5F9',
      }}>
        <div style={{
          maxWidth: '1140px', margin: '0 auto', padding: '0 40px',
          height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '8px',
              background: '#0B1D3A',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#F59E0B', fontWeight: 800, fontSize: '18px',
              fontFamily: "'Playfair Display', serif",
            }}>
              A
            </div>
            <span style={{ fontWeight: 700, fontSize: '18px', color: '#0B1D3A', letterSpacing: '-0.01em' }}>
              Arus
            </span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link to="/signin" style={{
              fontSize: '14px', color: '#64748B', textDecoration: 'none', fontWeight: 500,
            }}>
              Iniciar sesión
            </Link>
            <Link to="/signin" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#0B1D3A', color: '#FFFFFF',
              padding: '10px 20px', borderRadius: '10px',
              fontSize: '14px', fontWeight: 600, textDecoration: 'none',
            }}>
              Get Started <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ============== HERO ============== */}
      <section style={{
        paddingTop: '160px', paddingBottom: '100px',
        background: '#FFFFFF', textAlign: 'center',
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#F8FAFC', border: '1px solid #E2E8F0',
            borderRadius: '100px', padding: '6px 16px',
            fontSize: '13px', color: '#1A56DB', fontWeight: 500,
            marginBottom: '32px',
          }}>
            <Sparkles size={14} style={{ color: '#F59E0B' }} />
            Built for the modern finance team
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 3.8rem)',
            fontWeight: 800, lineHeight: 1.1,
            color: '#0B1D3A', letterSpacing: '-0.03em',
            marginBottom: '24px',
            fontFamily: "'Playfair Display', serif",
          }}>
            Manage your expenses
            <br />
            <span style={{ color: '#1A56DB' }}>smarter &amp; faster</span>
          </h1>

          <p style={{
            fontSize: '1.1rem', lineHeight: 1.75, color: '#64748B',
            maxWidth: '540px', margin: '0 auto 40px',
          }}>
            One portal for employees to submit travel and business expenses,
            and for approvers to review, approve, and analyze — in real time.
          </p>

          <Link to="/signin" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '16px 36px', borderRadius: '14px',
            background: '#0B1D3A', color: '#FFFFFF',
            fontSize: '16px', fontWeight: 600, textDecoration: 'none',
            boxShadow: '0 10px 30px rgba(11,29,58,0.18)',
          }}>
            Get Started <ArrowRight size={18} />
          </Link>

          <p style={{
            marginTop: '16px', fontSize: '13px', color: '#94A3B8',
          }}>
            No credit card required • Free for all employees
          </p>

          {/* Social proof row */}
          <div style={{
            marginTop: '48px',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            gap: '20px', flexWrap: 'wrap',
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {AVATAR_COLORS.map((c, i) => (
                <div key={i} style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: c, border: '2px solid #FFFFFF',
                  marginLeft: i === 0 ? 0 : '-8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[0,1,2,3,4].map(i => (
                <Star key={i} size={14} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
              ))}
            </div>
            <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 500 }}>
              Used by 50+ employees at Arus
            </span>
          </div>
        </div>
      </section>

      {/* ============== STATS BAR ============== */}
      <div style={{ marginTop: 0, marginBottom: '80px', padding: '0 40px' }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px',
          background: '#E2E8F0',
          borderRadius: '20px', overflow: 'hidden',
          border: '1px solid #E2E8F0',
        }}>
          {STATS.map((s) => (
            <div key={s.label} style={{
              background: '#FAFBFC', padding: '28px 16px', textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0B1D3A', lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{
                fontSize: '0.75rem', color: '#94A3B8',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                fontWeight: 600, marginTop: '8px',
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ============== FEATURES ============== */}
      <section style={{ padding: '80px 0', background: '#FAFBFC' }}>
        <div style={SECTION_CONTAINER}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{
              color: '#1A56DB', textTransform: 'uppercase',
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em',
              marginBottom: '12px',
            }}>
              Features
            </p>
            <h2 style={{
              color: '#0B1D3A', fontSize: '2.2rem', fontWeight: 800,
              letterSpacing: '-0.02em', marginBottom: '16px',
              fontFamily: "'Playfair Display', serif",
            }}>
              Everything finance teams need
            </h2>
            <p style={{
              color: '#64748B', fontSize: '1rem', lineHeight: 1.6,
              maxWidth: '460px', margin: '0 auto',
            }}>
              Built end-to-end on Supabase — secure, fast, and audit-ready from day one.
            </p>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px',
          }}>
            {FEATURES.map((f) => (
              <div key={f.title} style={{
                background: '#FFFFFF', border: '1px solid #E2E8F0',
                borderRadius: '20px', padding: '36px 32px',
              }}>
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: f.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px',
                }}>
                  <f.icon size={22} style={{ color: f.iconColor }} />
                </div>
                <h3 style={{
                  fontSize: '1.1rem', fontWeight: 700,
                  color: '#0B1D3A', marginBottom: '10px',
                }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.7 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== HOW IT WORKS ============== */}
      <section style={{ padding: '100px 0', background: '#FFFFFF' }}>
        <div style={SECTION_CONTAINER}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{
              color: '#F59E0B', textTransform: 'uppercase',
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em',
              marginBottom: '12px',
            }}>
              How it works
            </p>
            <h2 style={{
              color: '#0B1D3A', fontSize: '2.2rem', fontWeight: 800,
              letterSpacing: '-0.02em', marginBottom: '16px',
              fontFamily: "'Playfair Display', serif",
            }}>
              Three steps, start to finish
            </h2>
            <p style={{
              color: '#64748B', fontSize: '1rem', lineHeight: 1.6,
              maxWidth: '460px', margin: '0 auto',
            }}>
              From submission to approval to insight — the entire workflow in one place.
            </p>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px',
          }}>
            {STEPS.map((s, i) => (
              <div key={s.title} style={{
                textAlign: 'center', padding: '40px 28px',
                borderRadius: '20px', background: '#FAFBFC',
                border: '1px solid #F1F5F9',
              }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '20px',
                  background: s.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <s.icon size={26} style={{ color: s.iconColor }} />
                </div>
                <p style={{
                  fontSize: '12px', color: '#94A3B8',
                  textTransform: 'uppercase', letterSpacing: '0.12em',
                  fontWeight: 700, marginBottom: '10px',
                }}>
                  Step {i + 1}
                </p>
                <h3 style={{
                  fontSize: '1.1rem', fontWeight: 700,
                  color: '#0B1D3A', marginBottom: '10px',
                }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748B', lineHeight: 1.7 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== CTA BANNER ============== */}
      <div style={{ padding: '0 40px', marginBottom: '80px' }}>
        <div style={{
          maxWidth: '1000px', margin: '0 auto',
          borderRadius: '24px', background: '#0B1D3A',
          padding: '64px 48px', textAlign: 'center',
        }}>
          <p style={{
            color: '#F59E0B', textTransform: 'uppercase',
            fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em',
            marginBottom: '16px',
          }}>
            For Arus Employees
          </p>
          <h2 style={{
            color: '#FFFFFF', fontSize: '2rem', fontWeight: 800,
            letterSpacing: '-0.02em', marginBottom: '16px',
            fontFamily: "'Playfair Display', serif",
          }}>
            Ready to submit your next expense?
          </h2>
          <p style={{
            color: 'rgba(147,187,252,0.6)', fontSize: '1rem', lineHeight: 1.6,
            marginBottom: '32px',
            maxWidth: '460px', marginLeft: 'auto', marginRight: 'auto',
          }}>
            Sign in with your work credentials and get started in under a minute.
          </p>
          <Link to="/signin" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#F59E0B', color: '#0B1D3A',
            padding: '14px 32px', borderRadius: '12px',
            fontSize: '15px', fontWeight: 700, textDecoration: 'none',
          }}>
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* ============== FOOTER ============== */}
      <footer style={{
        borderTop: '1px solid #F1F5F9', padding: '32px',
        textAlign: 'center', color: '#94A3B8', fontSize: '0.85rem',
      }}>
        © {new Date().getFullYear()} Arus — Expense Management CRM · Built on Supabase
      </footer>
    </div>
  )
}
