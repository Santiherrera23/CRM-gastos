import { useState } from 'react'
import {
  FileText, Tag, DollarSign, Calendar, Link2, AlignLeft, Send, Loader2
} from 'lucide-react'

export const CATEGORIES = [
  'Airfare', 'Hotel', 'Meals', 'Ground Transport',
  'Car Rental', 'Fuel', 'Conference', 'Office Supplies',
  'Client Meeting', 'Other'
]

export const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'COP', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
]

const emptyForm = {
  title: '',
  category: '',
  amount: '',
  currency: 'USD',
  expense_date: new Date().toISOString().slice(0, 10),
  description: '',
  receipt_url: '',
}

export default function ExpenseForm({ onSubmit, submitting, defaultValues = {} }) {
  const [form, setForm] = useState({ ...emptyForm, ...defaultValues })
  const [errors, setErrors] = useState({})

  const update = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }))
    if (errors[k]) setErrors((e) => ({ ...e, [k]: null }))
  }

  const validate = () => {
    const e = {}
    if (!form.title.trim())          e.title = 'Required'
    if (!form.category)              e.category = 'Required'
    if (!form.amount || +form.amount <= 0) e.amount = 'Must be greater than 0'
    if (!form.expense_date)          e.expense_date = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    await onSubmit({
      title: form.title.trim(),
      category: form.category,
      amount: Number(parseFloat(form.amount).toFixed(2)),
      currency: form.currency,
      expense_date: form.expense_date,
      description: form.description.trim() || null,
      receipt_url: form.receipt_url.trim() || null,
    })
  }

  const inputCls = (err) =>
    `w-full px-4 py-3 bg-[#F8FAFC] border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1A56DB] focus:border-transparent transition-all placeholder:text-[#94A3B8] ${
      err ? 'border-red-300' : 'border-[#E2E8F0]'
    }`

  const labelCls = 'flex items-center gap-1.5 text-sm font-medium text-[#0F172A] mb-2'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={labelCls}>
          <FileText size={14} className="text-[#64748B]" /> Expense Title
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder="e.g. Flight to NYC for Q2 client meeting"
          className={inputCls(errors.title)}
        />
        {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>
            <Tag size={14} className="text-[#64748B]" /> Category
          </label>
          <select
            value={form.category}
            onChange={(e) => update('category', e.target.value)}
            className={inputCls(errors.category) + ' text-[#0F172A]'}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
        </div>
        <div>
          <label className={labelCls}>
            <Calendar size={14} className="text-[#64748B]" /> Expense Date
          </label>
          <input
            type="date"
            value={form.expense_date}
            max={new Date().toISOString().slice(0, 10)}
            onChange={(e) => update('expense_date', e.target.value)}
            className={inputCls(errors.expense_date)}
          />
          {errors.expense_date && <p className="text-xs text-red-600 mt-1">{errors.expense_date}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          <label className={labelCls}>
            <DollarSign size={14} className="text-[#64748B]" /> Amount
          </label>
          <input
            type="number"
            step="0.01" min="0.01"
            value={form.amount}
            onChange={(e) => update('amount', e.target.value)}
            placeholder="0.00"
            className={inputCls(errors.amount)}
          />
          {errors.amount && <p className="text-xs text-red-600 mt-1">{errors.amount}</p>}
        </div>
        <div>
          <label className={labelCls}>Currency</label>
          <select
            value={form.currency}
            onChange={(e) => update('currency', e.target.value)}
            className={inputCls(false)}
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls}>
          <Link2 size={14} className="text-[#64748B]" /> Receipt URL <span className="text-[#94A3B8] font-normal ml-1">(optional)</span>
        </label>
        <input
          type="url"
          value={form.receipt_url}
          onChange={(e) => update('receipt_url', e.target.value)}
          placeholder="https://drive.google.com/..."
          className={inputCls(false)}
        />
      </div>

      <div>
        <label className={labelCls}>
          <AlignLeft size={14} className="text-[#64748B]" /> Description <span className="text-[#94A3B8] font-normal ml-1">(optional)</span>
        </label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          placeholder="Purpose, attendees, project — anything useful for approval."
          className={inputCls(false) + ' resize-none'}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#1A56DB] hover:bg-[#1E40AF] text-white font-semibold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-base disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Submitting...
          </>
        ) : (
          <>
            <Send size={18} /> Submit Expense
          </>
        )}
      </button>
    </form>
  )
}
