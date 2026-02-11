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
      file: "math_hw.pdf",
      submissions: ["Rahul", "Sneha"],
    },
    {
      id: 2,
      title: "Science Project",
      class: "6B",
      dueDate: "2026-02-15",
      file: "science_project.pdf",
      submissions: ["Amit"],
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    class: "",
    dueDate: "",
    file: "",
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

    setAssignments([
      ...assignments,
      {
        id: Date.now(),
        ...form,
        submissions: [],
      },
    ]);

    setForm({ title: "", class: "", dueDate: "", file: "" });
    setShowModal(false);
  };

  /* ===== DELETE ===== */
  const deleteAssignment = (id) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  const submissionStatus = (count) => {
    if (count === 0) return "bg-red-100 text-red-700";
    if (count < 3) return "bg-amber-100 text-amber-700";
    return "bg-emerald-100 text-emerald-700";
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
            Upload resources and track student submissions.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500"
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
          className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500"
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
              <th className="p-3">File</th>
              <th className="p-3">Submissions</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAssignments.map((a) => (
              <tr key={a.id} className="border-t hover:bg-slate-50">
                <td className="p-3 font-medium">{a.title}</td>
                <td className="p-3">{a.class}</td>
                <td className="p-3">
                  {new Date(a.dueDate).toLocaleDateString()}
                </td>

                {/* FILE */}
                <td className="p-3 text-indigo-600 text-xs">
                  {a.file || "—"}
                </td>

                {/* SUBMISSIONS */}
                <td className="p-3">
                  <button
                    onClick={() => setShowSubmissions(a)}
                    className={`px-2 py-1 rounded text-xs font-medium ${submissionStatus(
                      a.submissions.length
                    )}`}
                  >
                    {a.submissions.length} submitted
                  </button>
                </td>

                {/* ACTIONS */}
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

      {/* ===== CREATE MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Create Assignment</h2>

            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
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
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            {/* FILE INPUT */}
            <input
              type="file"
              onChange={(e) =>
                setForm({ ...form, file: e.target.files[0]?.name })
              }
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={addAssignment}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== SUBMISSIONS MODAL ===== */}
      {showSubmissions && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-4">
              Submissions — {showSubmissions.title}
            </h2>

            {showSubmissions.submissions.length === 0 ? (
              <p className="text-sm text-slate-500">No submissions yet.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {showSubmissions.submissions.map((s, i) => (
                  <li key={i} className="border-b pb-1">
                    {s}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowSubmissions(null)}
                className="px-4 py-2 border rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}