export default function StatsCard({ label, value, icon: Icon, color = '#1A56DB', bg = 'bg-blue-50', delay = 0 }) {
  return (
    <div
      className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 animate-fade-up"
      style={{ animationDelay: `${delay}ms`, opacity: 0 }}
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide truncate">{label}</p>
          <p className="text-2xl font-bold mt-1 truncate" style={{ color }}>{value}</p>
        </div>
        <div className={`${bg} p-2.5 rounded-lg shrink-0 ml-3`}>
          {Icon && <Icon size={18} style={{ color }} />}
        </div>
      </div>
    </div>
  )
}
