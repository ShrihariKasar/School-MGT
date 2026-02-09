import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function Examinations() {
  /* ===== DEMO RESULT DATA ===== */
  const [results, setResults] = useState([
    {
      id: 1,
      student: "Rahul Sharma",
      class: "5A",
      exam: "Midterm",
      marks: 78,
      percentage: "78%",
      status: "Published",
    },
    {
      id: 2,
      student: "Sneha Patil",
      class: "6B",
      exam: "Midterm",
      marks: 85,
      percentage: "85%",
      status: "Draft",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    student: "",
    class: "",
    exam: "",
    marks: "",
    status: "Draft",
  });

  /* ===== ADD RESULT ===== */
  const addResult = () => {
    if (!form.student || !form.class || !form.exam || !form.marks) return;

    const percentage = `${form.marks}%`;

    setResults([
      ...results,
      { id: Date.now(), ...form, percentage },
    ]);

    setForm({
      student: "",
      class: "",
      exam: "",
      marks: "",
      status: "Draft",
    });

    setShowModal(false);
  };

  /* ===== DELETE RESULT ===== */
  const deleteResult = (id) => {
    setResults(results.filter((r) => r.id !== id));
  };

  const statusStyle = (status) => {
    if (status === "Published") return "bg-emerald-100 text-emerald-700";
    return "bg-amber-100 text-amber-700";
  };

  return (
    <Layout role="admin">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Examination & Results
          </h1>
          <p className="text-sm text-slate-500">
            Manage exams and publish student results.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500"
        >
          + Add Result
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Student</th>
              <th className="p-3">Class</th>
              <th className="p-3">Exam</th>
              <th className="p-3">Marks</th>
              <th className="p-3">%</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {results.map((r) => (
              <tr key={r.id} className="border-t hover:bg-slate-50">
                <td className="p-3 font-medium">{r.student}</td>
                <td className="p-3">{r.class}</td>
                <td className="p-3">{r.exam}</td>
                <td className="p-3">{r.marks}</td>
                <td className="p-3">{r.percentage}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${statusStyle(
                      r.status
                    )}`}
                  >
                    {r.status}
                  </span>
                </td>

                <td className="p-3 text-right">
                  <button
                    onClick={() => deleteResult(r.id)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== ADD RESULT MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-4">
              Add Exam Result
            </h2>

            <input
              type="text"
              placeholder="Student Name"
              value={form.student}
              onChange={(e) => setForm({ ...form, student: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <input
              type="text"
              placeholder="Class"
              value={form.class}
              onChange={(e) => setForm({ ...form, class: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <input
              type="text"
              placeholder="Exam Name"
              value={form.exam}
              onChange={(e) => setForm({ ...form, exam: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <input
              type="number"
              placeholder="Marks (%)"
              value={form.marks}
              onChange={(e) => setForm({ ...form, marks: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-4"
            >
              <option>Draft</option>
              <option>Published</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={addResult}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}