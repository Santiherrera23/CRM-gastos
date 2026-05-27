import StatusBadge from './StatusBadge'

export function formatAmount(amount, currency = 'USD') {
  const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$'
  const num = Number(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return { symbol, num, currency }
}

export function formatDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: '2-digit'
  })
}

export default function ExpenseTable({
  expenses,
  onRowClick,
  showEmployee = false,
  actions, // (expense) => ReactNode
  emptyText = 'No expenses to show'
}) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              {['Date', showEmployee && 'Employee', 'Title', 'Category', 'Amount', 'Status', actions && 'Actions']
                .filter(Boolean)
                .map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 text-xs font-semibold text-[#64748B] uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {expenses.length === 0 ? (
              <tr>
                <td
                  colSpan={4 + (showEmployee ? 1 : 0) + (actions ? 1 : 0)}
                  className="text-center py-16 text-[#94A3B8]"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              expenses.map((exp) => {
                const a = formatAmount(exp.amount, exp.currency)
                return (
                  <tr
                    key={exp.id}
                    onClick={() => onRowClick?.(exp)}
                    className={`border-b border-[#F1F5F9] transition-colors ${
                      onRowClick ? 'hover:bg-[#F8FAFC] cursor-pointer' : ''
                    }`}
                  >
                    <td className="px-5 py-3.5 text-[#64748B] whitespace-nowrap">
                      {formatDate(exp.expense_date)}
                    </td>
                    {showEmployee && (
                      <td className="px-5 py-3.5">
                        <div className="font-medium text-[#0F172A]">
                          {exp.profiles?.full_name || '—'}
                        </div>
                        <div className="text-xs text-[#94A3B8]">
                          {exp.profiles?.department || '—'}
                        </div>
                      </td>
                    )}
                    <td className="px-5 py-3.5 text-[#0F172A] font-medium max-w-[260px] truncate">
                      {exp.title}
                    </td>
                    <td className="px-5 py-3.5 text-[#64748B] whitespace-nowrap">{exp.category}</td>
                    <td className="px-5 py-3.5 font-semibold text-[#0F172A] whitespace-nowrap">
                      {a.symbol}
                      {a.num}
                      {exp.currency !== 'USD' && (
                        <span className="text-xs text-[#94A3B8] ml-1">{exp.currency}</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5"><StatusBadge status={exp.status} /></td>
                    {actions && (
                      <td className="px-5 py-3.5" onClick={(e) => e.stopPropagation()}>
                        {actions(exp)}
                      </td>
                    )}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
