import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StaffProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ===== DEMO STAFF DATA ===== */
  const staff = {
    id,
    name: "Ms. Priya Sharma",
    role: "Class Teacher",
    subject: "Science",
    classTeacherOf: "6A",
    attendance: "94%",
  };

  /* ===== DEMO PERFORMANCE DATA ===== */
  const performanceData = [
    { month: "Jan", score: 80 },
    { month: "Feb", score: 85 },
    { month: "Mar", score: 90 },
    { month: "Apr", score: 88 },
    { month: "May", score: 92 },
  ];

  return (
    <Layout role="admin">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Staff Profile
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg"
        >
          Back
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{staff.name}</h2>

        <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-600">
          <p><strong>Role:</strong> {staff.role}</p>
          <p><strong>Subject:</strong> {staff.subject}</p>
          <p><strong>Class Teacher Of:</strong> {staff.classTeacherOf || "-"}</p>
          <p><strong>Attendance:</strong> {staff.attendance}</p>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-2xl shadow border p-6">
        <h2 className="font-semibold mb-4">Performance Overview</h2>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}