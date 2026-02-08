import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function Students() {
  /* ===== SAMPLE DATA ===== */
  const [students, setStudents] = useState([
    { id: 1, name: "Rahul Sharma", class: "5A" },
    { id: 2, name: "Sneha Patil", class: "6B" },
    { id: 3, name: "Amit Verma", class: "7A" },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", class: "" });

  /* ===== FILTERED STUDENTS ===== */
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.class.toLowerCase().includes(search.toLowerCase())
  );

  /* ===== ADD STUDENT ===== */
  const addStudent = () => {
    if (!form.name || !form.class) return;

    setStudents([...students, { id: Date.now(), ...form }]);
    setForm({ name: "", class: "" });
    setShowModal(false);
  };

  /* ===== DELETE STUDENT ===== */
  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <Layout role="admin">
      {/* ===== PAGE HEADER ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Students Management
          </h1>
          <p className="text-sm text-slate-500">
            Add, search, and manage student records.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500 transition"
        >
          + Add Student
        </button>
      </div>

      {/* ===== SEARCH BAR ===== */}
      <div className="bg-white rounded-2xl shadow border p-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or class..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* ===== STUDENTS TABLE ===== */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Class</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="3" className="p-6 text-center text-slate-400">
                  No students found
                </td>
              </tr>
            )}

            {filteredStudents.map((s) => (
              <tr
                key={s.id}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="p-3 font-medium text-slate-800">{s.name}</td>
                <td className="p-3">{s.class}</td>

                <td className="p-3 text-right">
                  <button
                    onClick={() => deleteStudent(s.id)}
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

      {/* ===== ADD STUDENT MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Add New Student</h2>

            <input
              type="text"
              placeholder="Student Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <input
              type="text"
              placeholder="Class (e.g., 5A)"
              value={form.class}
              onChange={(e) => setForm({ ...form, class: e.target.value })}
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
                onClick={addStudent}
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