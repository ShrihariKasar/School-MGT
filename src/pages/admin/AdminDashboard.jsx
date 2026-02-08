import Layout from "../../components/layout/Layout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
  const kpis = [
    { title: "Total Students", value: "1,248", trend: "+5%" },
    { title: "Total Teachers & Staff", value: "86", trend: "+2%" },
    { title: "Attendance Today", value: "92%", trend: "+1%" },
    { title: "Pending Leaves", value: "5", trend: "-2%" },
    { title: "Upcoming Events", value: "3", trend: "—" },
    { title: "Fee Collection", value: "Phase 2", trend: "" },
  ];

  /* ===== SAMPLE ATTENDANCE DATA ===== */
  const attendanceData = [
    { day: "Mon", value: 88 },
    { day: "Tue", value: 90 },
    { day: "Wed", value: 91 },
    { day: "Thu", value: 89 },
    { day: "Fri", value: 92 },
    { day: "Sat", value: 94 },
  ];

  return (
    <Layout role="admin">
      {/* ===== KPI CARDS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
        {kpis.map((k) => (
          <div
            key={k.title}
            className="bg-white p-5 rounded-2xl shadow border hover:shadow-lg transition"
          >
            <p className="text-sm text-slate-500">{k.title}</p>

            <div className="flex items-end justify-between mt-2">
              <p className="text-3xl font-bold text-slate-800">{k.value}</p>

              {k.trend && (
                <span className="text-xs text-emerald-600 font-medium">
                  {k.trend}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ===== ANALYTICS + NOTIFICATIONS ===== */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* ===== ATTENDANCE LINE CHART ===== */}
        <div className="bg-white rounded-2xl shadow p-5 border">
          <h2 className="font-semibold mb-4">Student Attendance Trend</h2>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceData}>
                <XAxis dataKey="day" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ===== NOTIFICATIONS ===== */}
        <div className="bg-white rounded-2xl shadow p-5 border">
          <h2 className="font-semibold mb-3">Notifications</h2>

          <ul className="space-y-2 text-sm text-slate-600">
            <li>• 3 leave approvals pending</li>
            <li>• New exam schedule published</li>
            <li>• Regulatory inspection next week</li>
            <li>• System maintenance Sunday</li>
          </ul>
        </div>
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <div className="bg-white rounded-2xl shadow p-5 border mt-6">
        <h2 className="font-semibold mb-3">Quick Actions</h2>

        <div className="flex flex-wrap gap-3">
          {[
            "Add Staff",
            "Add Student",
            "Create Announcement",
            "Schedule Event",
          ].map((a) => (
            <button
              key={a}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 transition"
            >
              {a}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}