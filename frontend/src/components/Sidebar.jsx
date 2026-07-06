import { NavLink } from 'react-router-dom'

export default function Sidebar({ items }) {
  return (
    <aside className="w-full md:w-56 shrink-0">
      <nav className="card p-3 flex md:flex-col gap-1 overflow-x-auto">
        {items.map((item) => (
          <NavLink
            key={item.key}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                isActive ? 'bg-primary-600 text-white' : 'text-slate-600 hover:bg-primary-50'
              }`
            }
          >
            {item.icon && <item.icon />}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
