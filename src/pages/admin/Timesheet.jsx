import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function Timesheet() {
  /* ===== DEMO TIMESHEET DATA ===== */
  const [entries, setEntries] = useState([
    {
      id: 1,
      name: "Ms. Priya Sharma",
      date: "2026-02-08",
      hours: "6",
      task: "Class teaching & evaluation",
      status: "Approved",
    },
    {
      id: 2,
      name: "Mr. Rajesh Kumar",
      date: "2026-02-08",
      hours: "5",
      task: "Lesson planning",
      status: "Pending",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    date: "",
    hours: "",
    task: "",
    status: "Pending",
  });

  /* ===== ADD ENTRY ===== */
  const addEntry = () => {
    if (!form.name || !form.date || !form.hours || !form.task) return;

    setEntries([...entries, { id: Date.now(), ...form }]);
    setForm({ name: "", date: "", hours: "", task: "", status: "Pending" });
    setShowModal(false);
  };

  /* ===== DELETE ENTRY ===== */
  const deleteEntry = (id) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  const statusStyle = (status) => {
    if (status === "Approved") return "bg-emerald-100 text-emerald-700";
    if (status === "Rejected") return "bg-red-100 text-red-700";
    return "bg-amber-100 text-amber-700";
  };

  return (
    <Layout role="admin">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Staff Timesheet
          </h1>
          <p className="text-sm text-slate-500">
            Track daily staff work logs and approvals.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500"
        >
          + Add Entry
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Staff Name</th>
              <th className="p-3">Date</th>
              <th className="p-3">Hours</th>
              <th className="p-3">Task</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className="border-t hover:bg-slate-50">
                <td className="p-3 font-medium">{e.name}</td>
                <td className="p-3">{e.date}</td>
                <td className="p-3">{e.hours}</td>
                <td className="p-3">{e.task}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${statusStyle(
                      e.status
                    )}`}
                  >
                    {e.status}
                  </span>
                </td>

                <td className="p-3 text-right">
                  <button
                    onClick={() => deleteEntry(e.id)}
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

      {/* ===== ADD ENTRY MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-4">
              Add Timesheet Entry
            </h2>

            <input
              type="text"
              placeholder="Staff Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <input
              type="number"
              placeholder="Hours Worked"
              value={form.hours}
              onChange={(e) => setForm({ ...form, hours: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <textarea
              placeholder="Task Description"
              value={form.task}
              onChange={(e) => setForm({ ...form, task: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-4"
            >
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={addEntry}
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