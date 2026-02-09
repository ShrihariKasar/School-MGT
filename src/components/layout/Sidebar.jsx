import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ role }) {
  const location = useLocation();

  const adminLinks = [
  { name: "Dashboard", path: "/admin", icon: "📊" },
  { name: "Students", path: "/admin/students", icon: "🎓" },
  { name: "Staff", path: "/admin/staff", icon: "👨‍🏫" },
  { name: "Leave Approvals", path: "/admin/leaves", icon: "📩" },
  { name: "Timetable", path: "/admin/timetable", icon: "📅" },
  { name: "Curriculum", path: "/admin/curriculum" , icon: "📚" },
  { name: "Holidays", path: "/admin/holidays", icon: "🎉" },
  { name: "Announcements", path: "/admin/announcements", icon: "📢" },
  { name: "Events", path: "/admin/events", icon: "📅" },
  { name: "Timesheet", path: "/admin/timesheet", icon: "📋" },
  { name: "Regulatory", path: "/admin/regulatory", icon: "⚖️" },
  { name: "Assets", path: "/admin/assets", icon: "📦" }
];

const staffLinks = [
  { name: "Dashboard", path: "/staff", icon: "📘" },
  { name: "Attendance", path: "/staff/attendance", icon: "📝" },
  { name: "Assignments", path: "/staff/assignments", icon: "📂" },
  { name: "Parent Messaging", path: "/staff/parents", icon: "💬" },
  { name: "Apply Leave", path: "/staff/leave", icon: "🗓" }
];

  const links = role === "admin" ? adminLinks : staffLinks;

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col shadow-xl">
      {/* Logo / Title */}
      <div className="px-6 py-5 border-b border-slate-800">
        <h1 className="text-xl font-bold tracking-wide">School ERP</h1>
        <p className="text-xs text-slate-400 mt-1 capitalize">{role} panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((link) => {
          const active = location.pathname === link.path;

          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  active
                    ? "bg-emerald-600 text-white shadow"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
            >
              <span className="text-lg">{link.icon}</span>
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-800 text-xs text-slate-400">
        © {new Date().getFullYear()} School ERP
      </div>
    </aside>
  );
}