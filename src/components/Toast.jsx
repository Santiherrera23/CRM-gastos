import { useEffect } from 'react'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

const STYLES = {
  success: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', Icon: CheckCircle },
  error:   { bg: 'bg-red-50',     border: 'border-red-200',     text: 'text-red-700',     Icon: AlertCircle },
  info:    { bg: 'bg-blue-50',    border: 'border-blue-200',    text: 'text-blue-700',    Icon: Info },
}

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(onClose, toast.duration || 4000)
    return () => clearTimeout(t)
  }, [toast, onClose])

  if (!toast) return null
  const s = STYLES[toast.type] || STYLES.info
  const { Icon } = s

  return (
    <div className="fixed top-5 right-5 z-[200] animate-slide-in">
      <div className={`flex items-start gap-3 ${s.bg} ${s.border} ${s.text} border rounded-xl px-4 py-3 shadow-lg max-w-sm`}>
        <Icon size={18} className="mt-0.5 shrink-0" />
        <div className="flex-1 text-sm">
          {toast.title && <p className="font-semibold">{toast.title}</p>}
          {toast.message && <p className="opacity-90">{toast.message}</p>}
        </div>
        <button onClick={onClose} className="opacity-60 hover:opacity-100" aria-label="Dismiss">
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
