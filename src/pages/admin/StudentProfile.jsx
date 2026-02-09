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

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  /* ===== DEMO STUDENT DATA ===== */
  const student = {
    id,
    name: "Rahul Sharma",
    class: "6A",
    roll: "23",
    parent: "Mr. Sharma",
    phone: "9876543210",
    attendance: "91%",
    feeStatus: "Pending", // placeholder for Phase-2
  };

  /* ===== DEMO ACADEMIC PERFORMANCE ===== */
  const academicData = [
    { exam: "Unit 1", score: 72 },
    { exam: "Unit 2", score: 80 },
    { exam: "Midterm", score: 76 },
    { exam: "Unit 3", score: 85 },
    { exam: "Final", score: 88 },
  ];

  return (
    <Layout role="admin">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Student Profile
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg"
        >
          Back
        </button>
      </div>

      {/* Student Info */}
      <div className="bg-white rounded-2xl shadow border p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{student.name}</h2>

        <div className="grid sm:grid-cols-2 gap-4 text-sm text-slate-600">
          <p><strong>Class:</strong> {student.class}</p>
          <p><strong>Roll No:</strong> {student.roll}</p>
          <p><strong>Parent:</strong> {student.parent}</p>
          <p><strong>Phone:</strong> {student.phone}</p>
          <p><strong>Attendance:</strong> {student.attendance}</p>

          <p>
            <strong>Fee Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                student.feeStatus === "Paid"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {student.feeStatus}
            </span>
          </p>
        </div>
      </div>

      {/* Academic Performance Chart */}
      <div className="bg-white rounded-2xl shadow border p-6">
        <h2 className="font-semibold mb-4">Academic Performance</h2>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={academicData}>
              <XAxis dataKey="exam" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#6366f1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}