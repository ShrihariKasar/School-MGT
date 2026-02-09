import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";

export default function Staff() {
  const navigate = useNavigate();

  /* ===== SAMPLE DATA ===== */
  const [staff, setStaff] = useState([
    {
      id: 1,
      name: "Mr. Rajesh Kumar",
      role: "Teacher",
      subject: "Math",
      classTeacherOf: "",
    },
    {
      id: 2,
      name: "Ms. Priya Sharma",
      role: "Class Teacher",
      subject: "Science",
      classTeacherOf: "6A",
    },
    {
      id: 3,
      name: "Mr. Amit Patil",
      role: "Clerk",
      subject: "-",
      classTeacherOf: "",
    },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    role: "Teacher",
    subject: "",
    classTeacherOf: "",
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

    setForm({
      name: "",
      role: "Teacher",
      subject: "",
      classTeacherOf: "",
    });

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
            Manage teachers, class teachers, and non-teaching staff.
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
              <th className="p-3">Class Teacher Of</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStaff.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-slate-400">
                  No staff found
                </td>
              </tr>
            )}

            {filteredStaff.map((s) => (
              <tr key={s.id} className="border-t hover:bg-slate-50 transition">
                {/* Name */}
                <td className="p-3 font-medium text-slate-800">{s.name}</td>

                {/* Role Badge */}
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      s.role === "Class Teacher"
                        ? "bg-indigo-100 text-indigo-700"
                        : s.role === "Teacher"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {s.role}
                  </span>
                </td>

                {/* Subject */}
                <td className="p-3">{s.subject || "-"}</td>

                {/* Class Assignment */}
                <td className="p-3">{s.classTeacherOf || "-"}</td>

                {/* Actions */}
                <td className="p-3 text-right space-x-3">
                  <button
                    onClick={() => navigate(`/admin/staff/${s.id}`)}
                    className="text-indigo-600 hover:underline text-sm"
                  >
                    View
                  </button>

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

      {/* ===== ADD STAFF MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Add Staff Member</h2>

            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            {/* Role */}
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            >
              <option>Teacher</option>
              <option>Class Teacher</option>
              <option>Clerk</option>
              <option>Accountant</option>
              <option>Admin</option>
            </select>

            {/* Subject */}
            <input
              type="text"
              placeholder="Subject (for teachers)"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            {/* Class Teacher Assignment */}
            {form.role === "Class Teacher" && (
              <input
                type="text"
                placeholder="Class Assigned (e.g., 6A)"
                value={form.classTeacherOf}
                onChange={(e) =>
                  setForm({ ...form, classTeacherOf: e.target.value })
                }
                className="w-full border rounded-lg px-3 py-2 mb-3"
              />
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-2 mt-2">
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