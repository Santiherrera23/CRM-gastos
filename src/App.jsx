import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './lib/useAuth'
import LandingPage from './pages/LandingPage'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import NewExpense from './pages/NewExpense'
import Admin from './pages/Admin'

function LoadingScreen({ label = 'Loading...' }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F5F9]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#1A56DB] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#64748B] text-sm">{label}</p>
      </div>
    </div>
  )
}

function RequireAuth({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/signin" replace />
  return children
}

function RequireStaff({ children }) {
  const { user, profile, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/signin" replace />
  const isStaff = profile?.role === 'approver' || profile?.role === 'admin'
  if (!isStaff) return <Navigate to="/dashboard" replace />
  return children
}

function PublicOnly({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (user) return <Navigate to="/dashboard" replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/"        element={<LandingPage />} />
      <Route path="/signin"  element={<PublicOnly><SignIn /></PublicOnly>} />
      <Route path="/dashboard"    element={<RequireAuth><Dashboard /></RequireAuth>} />
      <Route path="/expenses/new" element={<RequireAuth><NewExpense /></RequireAuth>} />
      <Route path="/admin"        element={<RequireStaff><Admin /></RequireStaff>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
