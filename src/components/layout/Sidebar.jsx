import { Link, useLocation } from "react-router-dom";
import {
  HiChartBar,
  HiUserGroup,
  HiUsers,
  HiClipboardCheck,
  HiCalendar,
  HiBookOpen,
  HiSpeakerphone,
  HiClipboardList,
  HiScale,
  HiArchive,
  HiDocumentText,
  HiAcademicCap,
  HiChatAlt2,
  HiTrendingUp,
} from "react-icons/hi";

export default function Sidebar({ role }) {
  const location = useLocation();

  const adminLinks = [
    { name: "Dashboard", path: "/admin", icon: HiChartBar },
    { name: "Students", path: "/admin/students", icon: HiUserGroup },
    { name: "Staff", path: "/admin/staff", icon: HiUsers },
    { name: "Leave Approvals", path: "/admin/leaves", icon: HiClipboardCheck },
    { name: "Timetable", path: "/admin/timetable", icon: HiCalendar },
    { name: "Curriculum", path: "/admin/curriculum", icon: HiBookOpen },
    { name: "Holidays", path: "/admin/holidays", icon: HiCalendar },
    { name: "Announcements", path: "/admin/announcements", icon: HiSpeakerphone },
    { name: "Events", path: "/admin/events", icon: HiCalendar },
    { name: "Timesheet", path: "/admin/timesheet", icon: HiClipboardList },
    { name: "Regulatory", path: "/admin/regulatory", icon: HiScale },
    { name: "Assets", path: "/admin/assets", icon: HiArchive },
    { name: "Examinations", path: "/admin/examinations", icon: HiDocumentText },
  ];

  const staffLinks = [
    { name: "Dashboard", path: "/staff", icon: HiChartBar },
    { name: "Class Management", path: "/staff/class", icon: HiAcademicCap },
    { name: "Attendance", path: "/staff/attendance", icon: HiClipboardCheck },
    { name: "Assignments", path: "/staff/assignments", icon: HiClipboardList },
    { name: "Parent Messaging", path: "/staff/parents", icon: HiChatAlt2 },
    { name: "Apply Leave", path: "/staff/leave", icon: HiCalendar },
    { name: "Performance", path: "/staff/performance", icon: HiTrendingUp },
    { name: "Class Events", path: "/staff/events", icon: HiCalendar },
  ];

  const links = role === "admin" ? adminLinks : staffLinks;

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col shadow-xl">
      <div className="px-6 py-5 border-b border-slate-800">
        <h1 className="text-lg font-semibold tracking-wide">
          School Management
        </h1>
        <p className="text-xs text-slate-400 mt-1 capitalize">
          {role} panel
        </p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = location.pathname === link.path;

          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${
                  active
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
            >
              <Icon className="w-5 h-5" />
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-4 border-t border-slate-800 text-xs text-slate-400">
        © {new Date().getFullYear()} School Management System
      </div>
    </aside>
  );
}