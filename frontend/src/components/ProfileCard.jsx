export default function ProfileCard({ user }) {
  const name = `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || user?.username
  return (
    <div className="card p-6 flex items-center gap-4">
      <div className="h-16 w-16 rounded-full bg-primary-100 text-primary-700 grid place-items-center text-xl font-bold overflow-hidden">
        {user?.profile_picture ? (
          <img src={user.profile_picture} alt={name} className="h-full w-full object-cover" />
        ) : (
          name?.charAt(0)?.toUpperCase()
        )}
      </div>
      <div>
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-slate-500">{user?.email}</p>
        <span className="inline-block mt-1 text-xs font-semibold bg-primary-50 text-primary-600 px-2 py-0.5 rounded-full">
          {user?.role}
        </span>
      </div>
    </div>
  )
}
