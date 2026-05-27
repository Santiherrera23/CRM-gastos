import { useState, useEffect, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../lib/useAuth'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import StatsCard from '../components/StatsCard'
import StatusBadge from '../components/StatusBadge'
import Modal from '../components/Modal'
import ExpenseTable, { formatAmount, formatDate } from '../components/ExpenseTable'
import {
  Receipt, Clock, CheckCircle, XCircle, Plus, RefreshCw,
  FileText, Tag, Calendar, DollarSign, Link2, AlignLeft, User
} from 'lucide-react'

export default function Dashboard() {
  const { user, profile } = useAuth()
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selected, setSelected] = useState(null)

  const fetchExpenses = useCallback(async () => {
    if (!user?.id) return
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    if (!error) setExpenses(data || [])
    setLoading(false)
    setRefreshing(false)
  }, [user?.id])

  useEffect(() => { fetchExpenses() }, [fetchExpenses])

  const handleRefresh = () => { setRefreshing(true); fetchExpenses() }

  const stats = useMemo(() => {
    const total    = expenses.reduce((s, e) => s + Number(e.amount), 0)
    const pending  = expenses.filter((e) => e.status === 'pending')
    const approved = expenses.filter((e) => e.status === 'approved')
    const rejected = expenses.filter((e) => e.status === 'rejected')
    return {
      total,
      count: expenses.length,
      pending: pending.length,
      approved: approved.length,
      rejected: rejected.length,
      approvedTotal: approved.reduce((s, e) => s + Number(e.amount), 0),
    }
  }, [expenses])

  const fmt = (n) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1F5F9]">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#1A56DB] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#64748B] text-sm">Loading your expenses...</p>
          </div>
        </div>
      </div>
    )
  }

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'there'

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        {/* Welcome header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 animate-fade-up" style={{ opacity: 0 }}>
          <div>
            <p className="text-sm text-[#64748B] uppercase tracking-wider font-semibold">Welcome back</p>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0B1D3A] mt-1 font-[Playfair_Display]">
              {displayName}
            </h1>
            <p className="text-[#64748B] text-sm mt-2">
              You have <span className="font-semibold text-[#0B1D3A]">{stats.count}</span> total expenses
              {profile?.department && profile.department !== 'Unassigned' && (
                <> · <span className="font-semibold text-[#0B1D3A]">{profile.department}</span></>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 bg-white border border-[#E2E8F0] px-4 py-2.5 rounded-xl text-sm font-medium text-[#0F172A] hover:bg-[#F8FAFC] transition-all shadow-sm"
            >
              <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} /> Refresh
            </button>
            <Link
              to="/expenses/new"
              className="flex items-center gap-2 bg-[#1A56DB] hover:bg-[#1E40AF] text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-all"
            >
              <Plus size={16} /> New Expense
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard label="Total Submitted" value={fmt(stats.total)} icon={Receipt} color="#1A56DB" bg="bg-blue-50" delay={0} />
          <StatsCard label="Pending"         value={stats.pending}     icon={Clock}    color="#F59E0B" bg="bg-amber-50" delay={80} />
          <StatsCard label="Approved"        value={stats.approved}    icon={CheckCircle} color="#10B981" bg="bg-emerald-50" delay={160} />
          <StatsCard label="Rejected"        value={stats.rejected}    icon={XCircle}  color="#EF4444" bg="bg-red-50" delay={240} />
        </div>

        {/* Recent expenses */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#0B1D3A]">My Recent Expenses</h2>
          <span className="text-xs text-[#64748B]">Click a row for details</span>
        </div>

        {expenses.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-[#CBD5E1] p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <Receipt size={28} className="text-[#1A56DB]" />
            </div>
            <h3 className="text-lg font-bold text-[#0B1D3A] mb-1">No expenses yet</h3>
            <p className="text-sm text-[#64748B] mb-5">Submit your first expense to get started.</p>
            <Link
              to="/expenses/new"
              className="inline-flex items-center gap-2 bg-[#1A56DB] hover:bg-[#1E40AF] text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-all"
            >
              <Plus size={16} /> Submit Expense
            </Link>
          </div>
        ) : (
          <ExpenseTable
            expenses={expenses}
            onRowClick={setSelected}
            emptyText="No expenses to show"
          />
        )}
      </div>

      {/* Detail modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title || 'Expense Details'}
      >
        {selected && (
          <DetailContent expense={selected} profile={profile} />
        )}
      </Modal>
    </div>
  )
}

function DetailContent({ expense, profile }) {
  const a = formatAmount(expense.amount, expense.currency)
  const Item = ({ icon: Icon, label, children }) => (
    <div className="flex items-start gap-3 py-3 border-b border-[#F1F5F9] last:border-0">
      <Icon size={16} className="text-[#64748B] mt-0.5 shrink-0" />
      <div className="flex-1">
        <div className="text-xs text-[#64748B] uppercase tracking-wide font-semibold">{label}</div>
        <div className="text-sm text-[#0F172A] mt-1">{children}</div>
      </div>
    </div>
  )

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl font-extrabold text-[#0B1D3A]">
          {a.symbol}{a.num} <span className="text-sm text-[#64748B] font-medium">{expense.currency}</span>
        </div>
        <StatusBadge status={expense.status} />
      </div>

      <Item icon={Tag} label="Category">{expense.category}</Item>
      <Item icon={Calendar} label="Expense Date">{formatDate(expense.expense_date)}</Item>
      <Item icon={User} label="Submitted By">
        {profile?.full_name || '—'}
        {profile?.department && <span className="text-[#64748B] ml-2">· {profile.department}</span>}
      </Item>
      <Item icon={FileText} label="Title">{expense.title}</Item>
      {expense.description && <Item icon={AlignLeft} label="Description">{expense.description}</Item>}
      {expense.receipt_url && (
        <Item icon={Link2} label="Receipt">
          <a
            href={expense.receipt_url}
            target="_blank" rel="noopener noreferrer"
            className="text-[#1A56DB] hover:underline break-all"
          >
            {expense.receipt_url}
          </a>
        </Item>
      )}
      <Item icon={DollarSign} label="Submitted">
        {formatDate(expense.created_at)}
      </Item>
      {expense.approved_at && (
        <Item icon={CheckCircle} label="Reviewed">
          {formatDate(expense.approved_at)}
        </Item>
      )}
    </div>
  )
}
