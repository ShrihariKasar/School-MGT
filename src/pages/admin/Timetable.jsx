import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function Timetable() {
  /* ===== DEMO TIMETABLE DATA ===== */
  const [timetable, setTimetable] = useState([
    { day: "Monday", period1: "Math", period2: "Science", period3: "English" },
    { day: "Tuesday", period1: "History", period2: "Math", period3: "Sports" },
    { day: "Wednesday", period1: "Science", period2: "English", period3: "Math" },
    { day: "Thursday", period1: "Math", period2: "Computer", period3: "Science" },
    { day: "Friday", period1: "English", period2: "Math", period3: "Art" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    day: "",
    period1: "",
    period2: "",
    period3: "",
  });

  /* ===== ADD ROW ===== */
  const addRow = () => {
    if (!form.day) return;

    setTimetable([...timetable, form]);
    setForm({ day: "", period1: "", period2: "", period3: "" });
    setShowModal(false);
  };

  /* ===== DELETE ROW ===== */
  const deleteRow = (day) => {
    setTimetable(timetable.filter((t) => t.day !== day));
  };

  return (
    <Layout role="admin">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Timetable Management
          </h1>
          <p className="text-sm text-slate-500">
            Create and manage class schedules.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500"
        >
          + Add Day Schedule
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Day</th>
              <th className="p-3">Period 1</th>
              <th className="p-3">Period 2</th>
              <th className="p-3">Period 3</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {timetable.map((t) => (
              <tr key={t.day} className="border-t hover:bg-slate-50">
                <td className="p-3 font-medium">{t.day}</td>
                <td className="p-3">{t.period1}</td>
                <td className="p-3">{t.period2}</td>
                <td className="p-3">{t.period3}</td>

                <td className="p-3 text-right">
                  <button
                    onClick={() => deleteRow(t.day)}
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
            <h2 className="text-lg font-semibold mb-4">Add Day Schedule</h2>

            <input
              type="text"
              placeholder="Day (e.g., Monday)"
              value={form.day}
              onChange={(e) => setForm({ ...form, day: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <input
              type="text"
              placeholder="Period 1 Subject"
              value={form.period1}
              onChange={(e) => setForm({ ...form, period1: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <input
              type="text"
              placeholder="Period 2 Subject"
              value={form.period2}
              onChange={(e) => setForm({ ...form, period2: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <input
              type="text"
              placeholder="Period 3 Subject"
              value={form.period3}
              onChange={(e) => setForm({ ...form, period3: e.target.value })}
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
                onClick={addRow}
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