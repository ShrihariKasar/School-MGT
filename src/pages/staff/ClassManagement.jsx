import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function ClassManagement() {
  /* ===== DEMO CLASS DATA ===== */
  const [students] = useState([
    { id: 1, name: "Rahul Sharma", roll: 1 },
    { id: 2, name: "Sneha Patil", roll: 2 },
    { id: 3, name: "Amit Verma", roll: 3 },
  ]);

  const [subjects] = useState([
    "Mathematics",
    "Science",
    "English",
  ]);

  return (
    <Layout role="staff">
      {/* ===== HEADER ===== */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Class Management
        </h1>
        <p className="text-sm text-slate-500">
          View assigned class students and subjects.
        </p>
      </div>

      {/* ===== SUBJECT LIST ===== */}
      <div className="bg-white rounded-2xl shadow border p-5 mb-6">
        <h2 className="font-semibold mb-3">Assigned Subjects</h2>

        <div className="flex flex-wrap gap-2">
          {subjects.map((sub) => (
            <span
              key={sub}
              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
            >
              {sub}
            </span>
          ))}
        </div>
      </div>

      {/* ===== STUDENT ROSTER ===== */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Roll No</th>
              <th className="p-3">Student Name</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t hover:bg-slate-50">
                <td className="p-3">{s.roll}</td>
                <td className="p-3 font-medium">{s.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}