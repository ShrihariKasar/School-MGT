import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function Regulatory() {
  /* ===== DEMO COMPLIANCE DATA ===== */
  const [records, setRecords] = useState([
    {
      id: 1,
      title: "Fire Safety Certificate",
      authority: "Municipal Corporation",
      date: "2026-01-05",
      status: "Approved",
    },
    {
      id: 2,
      title: "Building Safety Inspection",
      authority: "PWD Department",
      date: "2026-02-01",
      status: "Pending",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    authority: "",
    date: "",
    status: "Pending",
  });

  /* ===== ADD RECORD ===== */
  const addRecord = () => {
    if (!form.title || !form.authority || !form.date) return;

    setRecords([...records, { id: Date.now(), ...form }]);
    setForm({ title: "", authority: "", date: "", status: "Pending" });
    setShowModal(false);
  };

  /* ===== DELETE RECORD ===== */
  const deleteRecord = (id) => {
    setRecords(records.filter((r) => r.id !== id));
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
            Regulatory & Compliance
          </h1>
          <p className="text-sm text-slate-500">
            Manage inspection records and compliance documents.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500"
        >
          + Add Record
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Authority</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-t hover:bg-slate-50">
                <td className="p-3 font-medium">{r.title}</td>
                <td className="p-3">{r.authority}</td>
                <td className="p-3">{r.date}</td>

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
                    onClick={() => deleteRecord(r.id)}
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

      {/* ===== ADD MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-4">
              Add Compliance Record
            </h2>

            <input
              type="text"
              placeholder="Document Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <input
              type="text"
              placeholder="Authority Name"
              value={form.authority}
              onChange={(e) =>
                setForm({ ...form, authority: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
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
                onClick={addRecord}
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