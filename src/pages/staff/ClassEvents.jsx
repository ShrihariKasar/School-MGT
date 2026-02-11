import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function ClassEvents() {
  /* ===== DEMO CLASS EVENTS ===== */
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Math Quiz",
      date: "2026-02-15",
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Science Project Demo",
      date: "2026-02-20",
      status: "Planned",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    date: "",
    status: "Planned",
  });

  /* ===== ADD EVENT ===== */
  const addEvent = () => {
    if (!form.title || !form.date) return;

    setEvents([...events, { id: Date.now(), ...form }]);
    setForm({ title: "", date: "", status: "Planned" });
    setShowModal(false);
  };

  /* ===== DELETE EVENT ===== */
  const deleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const statusStyle = (status) => {
    if (status === "Upcoming") return "bg-emerald-100 text-emerald-700";
    if (status === "Completed") return "bg-slate-200 text-slate-700";
    return "bg-indigo-100 text-indigo-700";
  };

  return (
    <Layout role="staff">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Class Events
          </h1>
          <p className="text-sm text-slate-500">
            Manage activities and events for your class.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500"
        >
          + Add Event
        </button>
      </div>

      {/* ===== EVENTS TABLE ===== */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {events.map((e) => (
              <tr key={e.id} className="border-t hover:bg-slate-50">
                <td className="p-3 font-medium">{e.title}</td>
                <td className="p-3">{e.date}</td>

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
                    onClick={() => deleteEvent(e.id)}
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

      {/* ===== ADD EVENT MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h2 className="text-lg font-semibold mb-4">
              Add Class Event
            </h2>

            <input
              type="text"
              placeholder="Event Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
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
              <option>Planned</option>
              <option>Upcoming</option>
              <option>Completed</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={addEvent}
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