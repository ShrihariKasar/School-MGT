import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function Attendance() {
  /* ===== SAMPLE DATA ===== */
  const classes = ["5A", "6B", "7A"];

  const sampleStudents = [
    { id: 1, name: "Rahul Sharma" },
    { id: 2, name: "Sneha Patil" },
    { id: 3, name: "Amit Verma" },
    { id: 4, name: "Priya Singh" },
  ];

  const [selectedClass, setSelectedClass] = useState(classes[0]);

  const [attendance, setAttendance] = useState(
    sampleStudents.map((s) => ({ ...s, status: "Present" }))
  );

  /* ===== TOGGLE STATUS ===== */
  const toggleStatus = (id) => {
    setAttendance((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Present" ? "Absent" : "Present" }
          : s
      )
    );
  };

  /* ===== SUBMIT HANDLER (FRONTEND ONLY) ===== */
  const handleSubmit = () => {
    console.log("Submitted Attendance:", attendance);
    alert("Attendance submitted successfully! (frontend demo)");
  };

  return (
    <Layout role="staff">
      {/* ===== PAGE HEADER ===== */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Mark Attendance
        </h1>
        <p className="text-sm text-slate-500">
          Select class and mark student attendance for today.
        </p>
      </div>

      {/* ===== CLASS SELECTOR ===== */}
      <div className="bg-white rounded-2xl shadow border p-5 mb-6">
        <label className="text-sm font-medium text-slate-600 mr-3">
          Select Class:
        </label>

        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {classes.map((cls) => (
            <option key={cls}>{cls}</option>
          ))}
        </select>
      </div>

      {/* ===== STUDENT TABLE ===== */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Student Name</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((student) => (
              <tr
                key={student.id}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="p-3 font-medium text-slate-800">
                  {student.name}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      student.status === "Present"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>

                <td className="p-3 text-right">
                  <button
                    onClick={() => toggleStatus(student.id)}
                    className="text-sm px-3 py-1.5 rounded-lg border hover:bg-slate-100 transition"
                  >
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== SUBMIT BUTTON ===== */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-500 transition"
        >
          Submit Attendance
        </button>
      </div>
    </Layout>
  );
}