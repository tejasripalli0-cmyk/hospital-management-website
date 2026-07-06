export default function StatCard({ icon: Icon, label, value, accent = 'primary' }) {
  return (
    <div className="card p-5 flex items-center gap-4">
      <div className={`h-12 w-12 rounded-xl bg-${accent}-50 text-${accent}-600 grid place-items-center text-xl shrink-0`}>
        <Icon />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </div>
  )
}
