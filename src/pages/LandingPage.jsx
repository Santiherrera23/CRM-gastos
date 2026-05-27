import { Link } from 'react-router-dom'
import {
  Sparkles, ArrowRight, LogIn, Send, Shield, BarChart3, Globe,
  CheckCircle, TrendingUp,
} from 'lucide-react'

const FEATURES = [
  {
    icon: Send,
    title: 'Envío en Segundos',
    desc: 'Llena el formulario, selecciona la categoría y listo. Sin papeleo ni cadenas de correo.',
    bg: '#EFF6FF',
    iconColor: '#1A56DB',
  },
  {
    icon: Shield,
    title: 'Aprobación por Roles',
    desc: 'Los aprobadores y administradores revisan y aprueban desde un solo panel.',
    bg: '#FEF3C7',
    iconColor: '#D97706',
  },
  {
    icon: BarChart3,
    title: 'Analítica en Tiempo Real',
    desc: 'Gráficos de gasto por categoría, departamento y mes — siempre actualizados.',
    bg: '#D1FAE5',
    iconColor: '#059669',
  },
  {
    icon: Globe,
    title: 'Soporte Multi-Moneda',
    desc: 'Registra en USD, COP, EUR o GBP. Cada transacción queda registrada.',
    bg: '#EDE9FE',
    iconColor: '#7C3AED',
  },
]

const STEPS = [
  {
    icon: Send,
    title: 'Registrar',
    desc: 'Llena el formulario de gastos y adjunta el recibo. Toma menos de un minuto.',
    bg: '#EFF6FF',
    iconColor: '#1A56DB',
  },
  {
    icon: CheckCircle,
    title: 'Revisar',
    desc: 'Los aprobadores ven los envíos al instante y pueden aprobar o rechazar con un clic.',
    bg: '#FEF3C7',
    iconColor: '#D97706',
  },
  {
    icon: TrendingUp,
    title: 'Analizar',
    desc: 'Los administradores hacen seguimiento del gasto por departamento y categoría.',
    bg: '#D1FAE5',
    iconColor: '#059669',
  },
]

const STATS = [
  { value: '99.9%', label: 'Disponibilidad' },
  { value: '<2s',   label: 'Tiempo de envío' },
  { value: '4',     label: 'Monedas' },
  { value: '10+',   label: 'Categorías' },
]

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

          <Link to="/signin" style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: '#0B1D3A', color: '#FFFFFF',
            padding: '10px 20px', borderRadius: '10px',
            fontSize: '14px', fontWeight: 600, textDecoration: 'none',
          }}>
            Iniciar Sesión <ArrowRight size={14} />
          </Link>
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
            Portal de Gastos Corporativos
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 3.8rem)',
            fontWeight: 800, lineHeight: 1.1,
            color: '#0B1D3A', letterSpacing: '-0.03em',
            marginBottom: '24px',
            fontFamily: "'Playfair Display', serif",
          }}>
            Registra tus gastos
            <br />
            <span style={{ color: '#1A56DB' }}>de viaje y empresa</span>
          </h1>

          <p style={{
            fontSize: '1.1rem', lineHeight: 1.75, color: '#64748B',
            maxWidth: '540px', margin: '0 auto 40px',
          }}>
            Ingresa, consulta y haz seguimiento a tus gastos de viaje y eventos
            corporativos. Tu equipo de finanzas se encarga del resto.
          </p>

          <Link to="/signin" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '16px 36px', borderRadius: '14px',
            background: '#0B1D3A', color: '#FFFFFF',
            fontSize: '16px', fontWeight: 600, textDecoration: 'none',
            boxShadow: '0 10px 30px rgba(11,29,58,0.18)',
          }}>
            <LogIn size={18} /> Iniciar Sesión
          </Link>
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
              Funcionalidades
            </p>
            <h2 style={{
              color: '#0B1D3A', fontSize: '2.2rem', fontWeight: 800,
              letterSpacing: '-0.02em', marginBottom: '16px',
              fontFamily: "'Playfair Display', serif",
            }}>
              Todo lo que necesitas para gestionar gastos
            </h2>
            <p style={{
              color: '#64748B', fontSize: '1rem', lineHeight: 1.6,
              maxWidth: '460px', margin: '0 auto',
            }}>
              Una plataforma segura, rápida y lista para auditoría.
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
              Cómo funciona
            </p>
            <h2 style={{
              color: '#0B1D3A', fontSize: '2.2rem', fontWeight: 800,
              letterSpacing: '-0.02em', marginBottom: '16px',
              fontFamily: "'Playfair Display', serif",
            }}>
              Tres pasos, de inicio a fin
            </h2>
            <p style={{
              color: '#64748B', fontSize: '1rem', lineHeight: 1.6,
              maxWidth: '460px', margin: '0 auto',
            }}>
              Desde el registro hasta la aprobación — todo en un solo lugar.
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
                  Paso {i + 1}
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
            Para Empleados de Arus
          </p>
          <h2 style={{
            color: '#FFFFFF', fontSize: '2rem', fontWeight: 800,
            letterSpacing: '-0.02em', marginBottom: '16px',
            fontFamily: "'Playfair Display', serif",
          }}>
            ¿Listo para registrar tu próximo gasto?
          </h2>
          <p style={{
            color: 'rgba(147,187,252,0.6)', fontSize: '1rem', lineHeight: 1.6,
            marginBottom: '32px',
            maxWidth: '460px', marginLeft: 'auto', marginRight: 'auto',
          }}>
            Inicia sesión con tus credenciales corporativas.
          </p>
          <Link to="/signin" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#F59E0B', color: '#0B1D3A',
            padding: '14px 32px', borderRadius: '12px',
            fontSize: '15px', fontWeight: 700, textDecoration: 'none',
          }}>
            <LogIn size={16} /> Iniciar Sesión
          </Link>
        </div>
      </div>

      {/* ============== FOOTER ============== */}
      <footer style={{
        borderTop: '1px solid #F1F5F9', padding: '32px',
        textAlign: 'center', color: '#94A3B8', fontSize: '0.85rem',
      }}>
        © {new Date().getFullYear()} Arus — Portal de Gestión de Gastos · Desarrollado con Supabase
      </footer>
    </div>
  )
}
