import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../lib/useAuth'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import ExpenseForm from '../components/ExpenseForm'
import Toast from '../components/Toast'
import { ArrowLeft, FileText, Sparkles } from 'lucide-react'

export default function NewExpense() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState(null)

  const handleSubmit = async (payload) => {
    if (!user?.id) {
      setToast({ type: 'error', title: 'Not authenticated', message: 'Please sign in again.' })
      return
    }
    setSubmitting(true)

    const { error } = await supabase.from('expenses').insert([{
      ...payload,
      user_id: user.id,
      status: 'pending',
    }])

    setSubmitting(false)

    if (error) {
      setToast({
        type: 'error',
        title: 'Submission failed',
        message: error.message || 'Something went wrong.'
      })
      return
    }

    setToast({
      type: 'success',
      title: 'Expense submitted',
      message: 'It is now pending review.',
    })
    setTimeout(() => navigate('/dashboard'), 900)
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#0B1D3A] text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Link>

        <div className="mb-6 animate-fade-up" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 text-[#1A56DB] text-xs uppercase tracking-[0.18em] font-bold mb-2">
            <Sparkles size={14} /> New Submission
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#0B1D3A] font-[Playfair_Display]">
            Submit an expense
          </h1>
          <p className="text-[#64748B] text-sm mt-2">
            Fill in the details below. All expenses start as pending and are reviewed by an approver.
          </p>
        </div>

        <div
          className="bg-white rounded-2xl shadow-xl shadow-blue-900/5 border border-[#E2E8F0] overflow-hidden animate-fade-up"
          style={{ animationDelay: '120ms', opacity: 0 }}
        >
          <div className="bg-[#0B1D3A] px-8 py-5">
            <h2 className="text-white text-lg font-bold flex items-center gap-2">
              <FileText size={18} className="text-[#F59E0B]" />
              Expense Details
            </h2>
            <p className="text-blue-300 text-xs mt-1">Required fields are marked.</p>
          </div>

          <div className="p-6 md:p-8">
            <ExpenseForm onSubmit={handleSubmit} submitting={submitting} />
          </div>
        </div>
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  )
}
