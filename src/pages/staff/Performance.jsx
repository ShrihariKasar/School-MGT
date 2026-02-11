import Layout from "../../components/layout/Layout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Performance() {
  /* ===== DEMO CLASS PERFORMANCE DATA ===== */
  const data = [
    { subject: "Math", avg: 78 },
    { subject: "Science", avg: 82 },
    { subject: "English", avg: 74 },
    { subject: "History", avg: 69 },
  ];

  const topStudents = [
    { name: "Rahul Sharma", score: 92 },
    { name: "Sneha Patil", score: 89 },
    { name: "Amit Verma", score: 85 },
  ];

  return (
    <Layout role="staff">
      {/* ===== HEADER ===== */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Performance & Analytics
        </h1>
        <p className="text-sm text-slate-500">
          Analyze subject-wise class performance and top students.
        </p>
      </div>

      {/* ===== SUBJECT AVERAGE CHART ===== */}
      <div className="bg-white rounded-2xl shadow border p-6 mb-6">
        <h2 className="font-semibold mb-4">Subject-wise Average Marks</h2>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avg" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== TOP STUDENTS TABLE ===== */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <div className="p-5 border-b">
          <h2 className="font-semibold">Top Performing Students</h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Student Name</th>
              <th className="p-3">Score (%)</th>
            </tr>
          </thead>

          <tbody>
            {topStudents.map((s, i) => (
              <tr key={i} className="border-t hover:bg-slate-50">
                <td className="p-3 font-medium">{s.name}</td>
                <td className="p-3">{s.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}