import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function Staff() {
  /* ===== SAMPLE DATA ===== */
  const [staff, setStaff] = useState([
    { id: 1, name: "Mr. Rajesh Kumar", role: "Teacher", subject: "Math" },
    { id: 2, name: "Ms. Priya Sharma", role: "Teacher", subject: "Science" },
    { id: 3, name: "Mr. Amit Patil", role: "Clerk", subject: "-" },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "Teacher",
    subject: "",
  });

  /* ===== FILTER ===== */
  const filteredStaff = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase()) ||
      s.subject.toLowerCase().includes(search.toLowerCase())
  );

  /* ===== ADD STAFF ===== */
  const addStaff = () => {
    if (!form.name || !form.role) return;

    setStaff([...staff, { id: Date.now(), ...form }]);
    setForm({ name: "", role: "Teacher", subject: "" });
    setShowModal(false);
  };

  /* ===== DELETE STAFF ===== */
  const deleteStaff = (id) => {
    setStaff(staff.filter((s) => s.id !== id));
  };

  return (
    <Layout role="admin">
      {/* ===== HEADER ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Staff Management
          </h1>
          <p className="text-sm text-slate-500">
            Add, search, and manage school staff records.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500 transition"
        >
          + Add Staff
        </button>
      </div>

      {/* ===== SEARCH ===== */}
      <div className="bg-white rounded-2xl shadow border p-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, role, or subject..."
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
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Subject</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStaff.length === 0 && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-slate-400">
                  No staff found
                </td>
              </tr>
            )}

            {filteredStaff.map((s) => (
              <tr key={s.id} className="border-t hover:bg-slate-50 transition">
                <td className="p-3 font-medium text-slate-800">{s.name}</td>
                <td className="p-3">{s.role}</td>
                <td className="p-3">{s.subject || "-"}</td>

                <td className="p-3 text-right">
                  <button
                    onClick={() => deleteStaff(s.id)}
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
            <h2 className="text-lg font-semibold mb-4">Add Staff Member</h2>

            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            >
              <option>Teacher</option>
              <option>Clerk</option>
              <option>Accountant</option>
              <option>Admin</option>
            </select>

            <input
              type="text"
              placeholder="Subject (for teachers)"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
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
                onClick={addStaff}
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