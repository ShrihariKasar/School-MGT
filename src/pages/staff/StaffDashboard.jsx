import Layout from "../../components/layout/Layout";

export default function StaffDashboard() {
  const todayStats = [
    { title: "Assigned Classes Today", value: "5", icon: "📚" },
    { title: "Pending Attendance", value: "2", icon: "📝" },
    { title: "Assignment Deadlines", value: "1", icon: "⏰" },
  ];

  const todayClasses = [
    { subject: "Mathematics", time: "09:00 AM", class: "5A" },
    { subject: "Science", time: "10:30 AM", class: "6B" },
    { subject: "English", time: "12:00 PM", class: "7A" },
  ];

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
        <h2 className="font-semibold mb-3">Notifications</h2>

        <ul className="space-y-2 text-sm text-slate-600">
          <li>• New announcement from admin</li>
          <li>• Event tomorrow at 10:00 AM</li>
          <li>• Leave request approved</li>
          <li>• Exam duty schedule updated</li>
        </ul>
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