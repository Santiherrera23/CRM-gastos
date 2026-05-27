import { Clock, CheckCircle, XCircle } from 'lucide-react'

const MAP = {
  pending:  { bg: 'bg-amber-50',    text: 'text-amber-700',   border: 'border-amber-200',   Icon: Clock,      label: 'Pending' },
  approved: { bg: 'bg-emerald-50',  text: 'text-emerald-700', border: 'border-emerald-200', Icon: CheckCircle, label: 'Approved' },
  rejected: { bg: 'bg-red-50',      text: 'text-red-700',     border: 'border-red-200',     Icon: XCircle,     label: 'Rejected' },
}

export default function StatusBadge({ status }) {
  const s = MAP[status] || MAP.pending
  const { Icon } = s
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${s.bg} ${s.text} ${s.border}`}>
      <Icon size={12} /> {s.label}
    </span>
  )
}
