import { useState, useEffect, useMemo, useCallback } from 'react'
import { useAuth } from '../lib/useAuth'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import StatsCard from '../components/StatsCard'
import ExpenseTable, { formatAmount, formatDate } from '../components/ExpenseTable'
import Modal from '../components/Modal'
import StatusBadge from '../components/StatusBadge'
import Toast from '../components/Toast'
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import {
  ShieldCheck, RefreshCw, Search, Filter, Receipt, Clock,
  CheckCircle, XCircle, TrendingUp, Building2, BarChart3,
  PieChart as PieIcon, Calendar, FileText, Tag, AlignLeft, User, Link2
} from 'lucide-react'

const CHART_COLORS = ['#1A56DB', '#F59E0B', '#10B981', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#F97316', '#14B8A6', '#A855F7']
const STATUS_FILL = { pending: '#F59E0B', approved: '#10B981', rejected: '#EF4444' }

export default function Admin() {
  const { profile } = useAuth()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selected, setSelected] = useState(null)
  const [toast, setToast] = useState(null)
  const [filter, setFilter] = useState({
    status: 'pending',
    department: 'all',
    category: 'all',
    from: '',
    to: '',
    search: '',
  })

  const fetchAll = useCallback(async () => {
    const { data, error } = await supabase
      .from('expenses')
      .select(`
        *,
        profiles:user_id ( id, full_name, email, department, role )
      `)
      .order('created_at', { ascending: false })
    if (!error) setRows(data || [])
    setLoading(false)
    setRefreshing(false)
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const handleRefresh = () => { setRefreshing(true); fetchAll() }

  const handleReview = async (expense, status) => {
    const { error } = await supabase
      .from('expenses')
      .update({
        status,
        approved_by: profile?.id,
        approved_at: new Date().toISOString(),
      })
      .eq('id', expense.id)

    if (error) {
      setToast({ type: 'error', title: 'Update failed', message: error.message })
      return
    }
    setRows((prev) =>
      prev.map((r) => r.id === expense.id
        ? { ...r, status, approved_by: profile?.id, approved_at: new Date().toISOString() }
        : r)
    )
    setToast({
      type: status === 'approved' ? 'success' : 'info',
      title: status === 'approved' ? 'Expense approved' : 'Expense rejected',
      message: `${expense.title}`
    })
    if (selected?.id === expense.id) setSelected({ ...selected, status })
  }

  // Derived sets for filter dropdowns
  const departments = useMemo(
    () => [...new Set(rows.map((r) => r.profiles?.department).filter(Boolean))].sort(),
    [rows]
  )
  const categories = useMemo(
    () => [...new Set(rows.map((r) => r.category).filter(Boolean))].sort(),
    [rows]
  )

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (filter.status !== 'all' && r.status !== filter.status) return false
      if (filter.department !== 'all' && r.profiles?.department !== filter.department) return false
      if (filter.category !== 'all' && r.category !== filter.category) return false
      if (filter.from && r.expense_date < filter.from) return false
      if (filter.to   && r.expense_date > filter.to)   return false
      if (filter.search) {
        const q = filter.search.toLowerCase()
        const name = r.profiles?.full_name?.toLowerCase() || ''
        const email = r.profiles?.email?.toLowerCase() || ''
        const title = r.title?.toLowerCase() || ''
        const desc = r.description?.toLowerCase() || ''
        if (!name.includes(q) && !email.includes(q) && !title.includes(q) && !desc.includes(q)) return false
      }
      return true
    })
  }, [rows, filter])

  // ---- aggregate stats (over ALL rows, not filtered) ----
  const stats = useMemo(() => {
    const total       = rows.reduce((s, r) => s + Number(r.amount), 0)
    const pending     = rows.filter((r) => r.status === 'pending')
    const approved    = rows.filter((r) => r.status === 'approved')
    const approvedAmt = approved.reduce((s, r) => s + Number(r.amount), 0)
    const employees   = new Set(rows.map((r) => r.user_id)).size
    return {
      total,
      pending: pending.length,
      approvedAmt,
      employees,
      submissions: rows.length,
    }
  }, [rows])

  // ---- chart data ----
  const byCategory = useMemo(() => {
    const map = {}
    rows.forEach((r) => { map[r.category] = (map[r.category] || 0) + Number(r.amount) })
    return Object.entries(map)
      .map(([name, value]) => ({ name, value: Math.round(value) }))
      .sort((a, b) => b.value - a.value)
  }, [rows])

  const byDept = useMemo(() => {
    const map = {}
    rows.forEach((r) => {
      const d = r.profiles?.department || 'Unassigned'
      map[d] = (map[d] || 0) + Number(r.amount)
    })
    return Object.entries(map)
      .map(([name, value]) => ({ name, value: Math.round(value) }))
      .sort((a, b) => b.value - a.value)
  }, [rows])

  const monthlyTrend = useMemo(() => {
    const map = {}
    rows.forEach((r) => {
      const ym = (r.expense_date || '').slice(0, 7)
      if (!ym) return
      map[ym] = (map[ym] || 0) + Number(r.amount)
    })
    return Object.entries(map)
      .map(([ym, amount]) => ({
        ym,
        label: new Date(ym + '-01').toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        amount: Math.round(amount),
      }))
      .sort((a, b) => a.ym.localeCompare(b.ym))
      .slice(-12)
  }, [rows])

  const statusDist = useMemo(() => {
    const map = { pending: 0, approved: 0, rejected: 0 }
    rows.forEach((r) => { map[r.status] = (map[r.status] || 0) + 1 })
    return Object.entries(map)
      .filter(([, v]) => v > 0)
      .map(([name, value]) => ({ name, value }))
  }, [rows])

  const fmt = (n) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)

  const reviewActions = (exp) => exp.status === 'pending' ? (
    <div className="flex gap-1.5">
      <button
        onClick={() => handleReview(exp, 'approved')}
        className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors cursor-pointer"
      >
        Approve
      </button>
      <button
        onClick={() => handleReview(exp, 'rejected')}
        className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-semibold hover:bg-red-100 transition-colors cursor-pointer"
      >
        Reject
      </button>
    </div>
  ) : (
    <button
      onClick={() => handleReview(exp, 'pending')}
      className="px-3 py-1.5 bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] rounded-lg text-xs font-semibold hover:bg-[#F1F5F9] transition-colors cursor-pointer"
    >
      Reset
    </button>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1F5F9]">
        <Navbar />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#1A56DB] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#64748B] text-sm">Loading admin console...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 animate-fade-up" style={{ opacity: 0 }}>
          <div>
            <div className="inline-flex items-center gap-2 text-[#1A56DB] text-xs uppercase tracking-[0.18em] font-bold mb-2">
              <ShieldCheck size={14} /> Admin Console
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#0B1D3A] font-[Playfair_Display]">
              Expense Review
            </h1>
            <p className="text-[#64748B] text-sm mt-2">
              Approve or reject pending submissions and monitor spending across the company.
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 bg-white border border-[#E2E8F0] px-4 py-2.5 rounded-xl text-sm font-medium text-[#0F172A] hover:bg-[#F8FAFC] transition-all shadow-sm"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatsCard label="Total Spend"    value={fmt(stats.total)}       icon={Receipt}    color="#1A56DB" bg="bg-blue-50"    delay={0} />
          <StatsCard label="Pending Review" value={stats.pending}          icon={Clock}      color="#F59E0B" bg="bg-amber-50"   delay={60} />
          <StatsCard label="Approved Total" value={fmt(stats.approvedAmt)} icon={CheckCircle} color="#10B981" bg="bg-emerald-50" delay={120} />
          <StatsCard label="Submissions"    value={stats.submissions}      icon={TrendingUp} color="#8B5CF6" bg="bg-purple-50"  delay={180} />
          <StatsCard label="Employees"      value={stats.employees}        icon={Building2}  color="#06B6D4" bg="bg-cyan-50"    delay={240} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartCard title="Spending by Category" icon={<BarChart3 size={16} className="text-[#1A56DB]" />}>
            {byCategory.length === 0 ? <Empty/> : (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={byCategory} margin={{ top: 5, right: 10, left: 10, bottom: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} angle={-35} textAnchor="end" interval={0} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} tickFormatter={(v) => `$${v}`} />
                  <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Amount']} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {byCategory.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          <ChartCard title="Spending by Department" icon={<PieIcon size={16} className="text-[#F59E0B]" />}>
            {byDept.length === 0 ? <Empty/> : (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={byDept} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} paddingAngle={2}>
                    {byDept.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => `$${Number(v).toLocaleString()}`} />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          <ChartCard title="Monthly Trend (last 12 months)" icon={<TrendingUp size={16} className="text-[#10B981]" />}>
            {monthlyTrend.length === 0 ? <Empty/> : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={monthlyTrend} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} tickFormatter={(v) => `$${v}`} />
                  <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, 'Amount']} />
                  <Line type="monotone" dataKey="amount" stroke="#1A56DB" strokeWidth={2.5} dot={{ fill: '#1A56DB', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </ChartCard>

          <ChartCard title="Status Distribution" icon={<Clock size={16} className="text-[#8B5CF6]" />}>
            {statusDist.length === 0 ? <Empty/> : (
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={statusDist} dataKey="value" nameKey="name"
                       cx="50%" cy="50%" outerRadius={100} innerRadius={60} paddingAngle={3}>
                    {statusDist.map((entry) => (
                      <Cell key={entry.name} fill={STATUS_FILL[entry.name] || '#64748B'} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 mb-4 shadow-sm">
          <div className="flex flex-wrap gap-3 items-center">
            <Filter size={16} className="text-[#64748B]" />
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search name, email, title…"
                value={filter.search}
                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                className="pl-9 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent"
              />
            </div>
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56DB]"
            >
              <option value="all">All statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={filter.department}
              onChange={(e) => setFilter({ ...filter, department: e.target.value })}
              className="px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56DB]"
            >
              <option value="all">All departments</option>
              {departments.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <select
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              className="px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56DB]"
            >
              <option value="all">All categories</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <label className="flex items-center gap-1 text-xs text-[#64748B]">
              From
              <input
                type="date"
                value={filter.from}
                onChange={(e) => setFilter({ ...filter, from: e.target.value })}
                className="px-2 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56DB]"
              />
            </label>
            <label className="flex items-center gap-1 text-xs text-[#64748B]">
              To
              <input
                type="date"
                value={filter.to}
                onChange={(e) => setFilter({ ...filter, to: e.target.value })}
                className="px-2 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56DB]"
              />
            </label>
            <button
              onClick={() => setFilter({ status: 'all', department: 'all', category: 'all', from: '', to: '', search: '' })}
              className="text-xs text-[#1A56DB] hover:underline ml-1"
            >
              Reset
            </button>
            <span className="text-xs text-[#64748B] ml-auto">{filtered.length} results</span>
          </div>
        </div>

        <ExpenseTable
          expenses={filtered}
          showEmployee
          onRowClick={setSelected}
          actions={reviewActions}
          emptyText="No expenses match these filters."
        />
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title || 'Expense Details'}
      >
        {selected && (
          <AdminDetail
            expense={selected}
            onReview={(s) => handleReview(selected, s)}
          />
        )}
      </Modal>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  )
}

function ChartCard({ title, icon, children }) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
      <h3 className="text-sm font-bold text-[#0B1D3A] mb-4 flex items-center gap-2">
        {icon} {title}
      </h3>
      {children}
    </div>
  )
}

function Empty() {
  return (
    <div className="h-[280px] flex items-center justify-center text-sm text-[#94A3B8]">
      Not enough data yet.
    </div>
  )
}

function AdminDetail({ expense, onReview }) {
  const a = formatAmount(expense.amount, expense.currency)
  const Item = ({ icon: Icon, label, children }) => (
    <div className="flex items-start gap-3 py-3 border-b border-[#F1F5F9] last:border-0">
      <Icon size={16} className="text-[#64748B] mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-xs text-[#64748B] uppercase tracking-wide font-semibold">{label}</div>
        <div className="text-sm text-[#0F172A] mt-1 break-words">{children}</div>
      </div>
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl font-extrabold text-[#0B1D3A]">
          {a.symbol}{a.num} <span className="text-sm text-[#64748B] font-medium">{expense.currency}</span>
        </div>
        <StatusBadge status={expense.status} />
      </div>

      <Item icon={User} label="Submitted By">
        {expense.profiles?.full_name || '—'}{' '}
        <span className="text-[#64748B]">({expense.profiles?.email})</span>
        {expense.profiles?.department && (
          <div className="text-xs text-[#64748B] mt-1">{expense.profiles.department}</div>
        )}
      </Item>
      <Item icon={Tag} label="Category">{expense.category}</Item>
      <Item icon={Calendar} label="Expense Date">{formatDate(expense.expense_date)}</Item>
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

      <div className="mt-6 flex flex-wrap gap-2">
        {expense.status !== 'approved' && (
          <button
            onClick={() => onReview('approved')}
            className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md"
          >
            <CheckCircle size={16} /> Approve
          </button>
        )}
        {expense.status !== 'rejected' && (
          <button
            onClick={() => onReview('rejected')}
            className="flex-1 min-w-[140px] flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md"
          >
            <XCircle size={16} /> Reject
          </button>
        )}
        {expense.status !== 'pending' && (
          <button
            onClick={() => onReview('pending')}
            className="flex items-center justify-center gap-2 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0] font-semibold px-4 py-2.5 rounded-xl transition-all"
          >
            Reset to Pending
          </button>
        )}
      </div>
    </div>
  )
}
