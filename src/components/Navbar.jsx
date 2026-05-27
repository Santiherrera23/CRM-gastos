import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/useAuth'
import { LayoutDashboard, FilePlus2, ShieldCheck, LogOut, Menu, X } from 'lucide-react'

function ArusMark({ size = 36 }) {
  return (
    <div
      className="bg-[#0B1D3A] rounded-lg flex items-center justify-center shadow-md ring-1 ring-white/10"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 32 32" width={size * 0.62} height={size * 0.62} aria-hidden="true">
        <path d="M9 22 L16 8 L23 22 M11.5 17.5 H20.5"
              stroke="#F59E0B" strokeWidth="2.6"
              strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </div>
  )
}

export default function Navbar() {
  const { user, profile, isStaff, signOut } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
      isActive
        ? 'bg-[#1A56DB] text-white shadow-md'
        : 'text-blue-100 hover:bg-white/10 hover:text-white'
    }`

  return (
    <nav className="bg-[#0B1D3A] text-white sticky top-0 z-50 shadow-lg border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-3 group">
            <ArusMark size={38} />
            <div className="leading-tight">
              <div className="font-extrabold text-lg tracking-tight font-[Playfair_Display]">
                Arus
              </div>
              <div className="text-[10px] text-blue-300 uppercase tracking-[0.18em] -mt-0.5">
                Expense CRM
              </div>
            </div>
          </Link>

          {user && (
            <>
              <div className="hidden md:flex items-center gap-1">
                <NavLink to="/dashboard" className={linkClass}>
                  <LayoutDashboard size={16} /> Dashboard
                </NavLink>
                <NavLink to="/expenses/new" className={linkClass}>
                  <FilePlus2 size={16} /> Submit Expense
                </NavLink>
                {isStaff && (
                  <NavLink to="/admin" className={linkClass}>
                    <ShieldCheck size={16} /> Admin
                  </NavLink>
                )}
              </div>

              <div className="hidden md:flex items-center gap-3">
                <div className="text-right leading-tight">
                  <div className="text-xs text-blue-300">{user.email}</div>
                  {profile?.role && (
                    <div className="text-[10px] uppercase tracking-wider text-[#F59E0B] font-bold">
                      {profile.role}
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>

              <button
                onClick={() => setOpen((v) => !v)}
                className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20"
                aria-label="Toggle menu"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </>
          )}

          {!user && (
            <Link
              to="/signin"
              className="bg-[#1A56DB] hover:bg-[#1E40AF] px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-md"
            >
              Sign In
            </Link>
          )}
        </div>

        {user && open && (
          <div className="md:hidden pb-4 space-y-1 animate-slide-in">
            <NavLink to="/dashboard" onClick={() => setOpen(false)} className={linkClass}>
              <LayoutDashboard size={16} /> Dashboard
            </NavLink>
            <NavLink to="/expenses/new" onClick={() => setOpen(false)} className={linkClass}>
              <FilePlus2 size={16} /> Submit Expense
            </NavLink>
            {isStaff && (
              <NavLink to="/admin" onClick={() => setOpen(false)} className={linkClass}>
                <ShieldCheck size={16} /> Admin
              </NavLink>
            )}
            <div className="pt-3 border-t border-white/10 mt-3 flex items-center justify-between">
              <div className="text-xs text-blue-300">{user.email}</div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm font-medium"
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
