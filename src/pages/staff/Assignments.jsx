import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function Assignments() {
  /* ===== SAMPLE DATA ===== */
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Math Homework – Chapter 3",
      class: "5A",
      dueDate: "2026-02-12",
    },
    {
      id: 2,
      title: "Science Project",
      class: "6B",
      dueDate: "2026-02-15",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    class: "",
    dueDate: "",
  });

  /* ===== FILTER ===== */
  const filteredAssignments = assignments.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.class.toLowerCase().includes(search.toLowerCase())
  );

  /* ===== ADD ASSIGNMENT ===== */
  const addAssignment = () => {
    if (!form.title || !form.class || !form.dueDate) return;

    setAssignments([...assignments, { id: Date.now(), ...form }]);
    setForm({ title: "", class: "", dueDate: "" });
    setShowModal(false);
  };

  /* ===== DELETE ===== */
  const deleteAssignment = (id) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  return (
    <Layout role="staff">
      {/* ===== HEADER ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Assignment Management
          </h1>
          <p className="text-sm text-slate-500">
            Create and manage class assignments.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500 transition"
        >
          + Create Assignment
        </button>
      </div>

      {/* ===== SEARCH ===== */}
      <div className="bg-white rounded-2xl shadow border p-4 mb-6">
        <input
          type="text"
          placeholder="Search assignments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Class</th>
              <th className="p-3">Due Date</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAssignments.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-slate-400">
                  No assignments found
                </td>
              </tr>
            )}

            {filteredAssignments.map((a) => (
              <tr key={a.id} className="border-t hover:bg-slate-50 transition">
                <td className="p-3 font-medium text-slate-800">{a.title}</td>
                <td className="p-3">{a.class}</td>
                <td className="p-3">
                  {new Date(a.dueDate).toLocaleDateString()}
                </td>

                <td className="p-3 text-right">
                  <button
                    onClick={() => deleteAssignment(a.id)}
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

      {/* ===== MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Create Assignment</h2>

            <input
              type="text"
              placeholder="Assignment Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <input
              type="text"
              placeholder="Class (e.g., 5A)"
              value={form.class}
              onChange={(e) => setForm({ ...form, class: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                onClick={addAssignment}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500"
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