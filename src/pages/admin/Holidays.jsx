import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function Holidays() {
  /* ===== DEMO HOLIDAY DATA ===== */
  const [holidays, setHolidays] = useState([
    { id: 1, name: "Republic Day", date: "2026-01-26" },
    { id: 2, name: "Holi", date: "2026-03-14" },
    { id: 3, name: "Independence Day", date: "2026-08-15" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", date: "" });

  /* ===== ADD HOLIDAY ===== */
  const addHoliday = () => {
    if (!form.name || !form.date) return;

    setHolidays([...holidays, { id: Date.now(), ...form }]);
    setForm({ name: "", date: "" });
    setShowModal(false);
  };

  /* ===== DELETE HOLIDAY ===== */
  const deleteHoliday = (id) => {
    setHolidays(holidays.filter((h) => h.id !== id));
  };

  return (
    <Layout role="admin">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Holiday Management
          </h1>
          <p className="text-sm text-slate-500">
            Add and manage school holidays.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500"
        >
          + Add Holiday
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Holiday Name</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {holidays.map((h) => (
              <tr key={h.id} className="border-t hover:bg-slate-50">
                <td className="p-3 font-medium">{h.name}</td>
                <td className="p-3">{h.date}</td>

                <td className="p-3 text-right">
                  <button
                    onClick={() => deleteHoliday(h.id)}
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

      {/* ===== ADD HOLIDAY MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Add Holiday</h2>

            <input
              type="text"
              placeholder="Holiday Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
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
                onClick={addHoliday}
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