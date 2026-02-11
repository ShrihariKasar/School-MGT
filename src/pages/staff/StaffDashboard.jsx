import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function StaffDashboard() {
  /* ===== TODAY STATS ===== */
  const todayStats = [
    { title: "Assigned Classes Today", value: "5", icon: "📚" },
    { title: "Pending Attendance", value: "2", icon: "📝" },
    { title: "Assignment Deadlines", value: "1", icon: "⏰" },
  ];

  /* ===== TODAY CLASSES ===== */
  const todayClasses = [
    { subject: "Mathematics", time: "09:00 AM", class: "5A" },
    { subject: "Science", time: "10:30 AM", class: "6B" },
    { subject: "English", time: "12:00 PM", class: "7A" },
  ];

  /* ===== NOTIFICATIONS STATE ===== */
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      text: "New announcement from admin",
      time: "10 min ago",
      type: "Announcement",
      read: false,
    },
    {
      id: 2,
      text: "Event tomorrow at 10:00 AM",
      time: "1 hr ago",
      type: "Event",
      read: false,
    },
    {
      id: 3,
      text: "Leave request approved",
      time: "Yesterday",
      type: "Leave",
      read: true,
    },
    {
      id: 4,
      text: "Exam duty schedule updated",
      time: "Yesterday",
      type: "Exam",
      read: true,
    },
  ]);

  /* ===== MARK AS READ ===== */
  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  /* ===== CLEAR ALL ===== */
  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const typeStyle = (type) => {
    if (type === "Announcement") return "bg-indigo-100 text-indigo-700";
    if (type === "Event") return "bg-emerald-100 text-emerald-700";
    if (type === "Leave") return "bg-amber-100 text-amber-700";
    return "bg-slate-100 text-slate-700";
  };

  return (
    <Layout role="staff">
      {/* ===== PAGE TITLE ===== */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Staff Dashboard</h1>
        <p className="text-sm text-slate-500">
          Overview of your daily teaching activities and notifications.
        </p>
      </div>

      {/* ===== NOTIFICATIONS CENTER ===== */}
      <div className="bg-white rounded-2xl shadow p-5 border mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">
            Notifications {unreadCount > 0 && `(${unreadCount} new)`}
          </h2>

          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="text-xs text-red-500 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <p className="text-sm text-slate-400">No notifications.</p>
        ) : (
          <ul className="space-y-3">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`border rounded-lg p-3 transition ${
                  !n.read ? "bg-slate-50" : ""
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-slate-700">{n.text}</p>

                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${typeStyle(
                          n.type
                        )}`}
                      >
                        {n.type}
                      </span>
                      <span className="text-xs text-slate-400">{n.time}</span>
                    </div>
                  </div>

                  {!n.read && (
                    <button
                      onClick={() => markAsRead(n.id)}
                      className="text-xs text-emerald-600 hover:underline"
                    >
                      Mark read
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ===== TODAY OVERVIEW CARDS ===== */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {todayStats.map((c) => (
          <div
            key={c.title}
            className="bg-white p-5 rounded-2xl shadow border hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">{c.title}</p>
              <span className="text-xl">{c.icon}</span>
            </div>

            <p className="text-3xl font-bold text-slate-800 mt-3">{c.value}</p>
          </div>
        ))}
      </div>

      {/* ===== TODAY CLASS SCHEDULE ===== */}
      <div className="bg-white rounded-2xl shadow p-5 border">
        <h2 className="font-semibold mb-4">Today's Class Schedule</h2>

        <div className="space-y-3">
          {todayClasses.map((cls, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border hover:bg-slate-50 transition"
            >
              <div>
                <p className="font-medium text-slate-800">{cls.subject}</p>
                <p className="text-xs text-slate-500">
                  Class {cls.class} • {cls.time}
                </p>
              </div>

              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                Upcoming
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}