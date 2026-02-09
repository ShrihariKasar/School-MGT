import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function Announcements() {
  /* ===== DEMO ANNOUNCEMENTS ===== */
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Exam Schedule Released",
      audience: "All",
      date: "2026-02-10",
    },
    {
      id: 2,
      title: "Staff Meeting Tomorrow",
      audience: "Teachers",
      date: "2026-02-12",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    audience: "All",
    date: "",
  });

  /* ===== ADD ANNOUNCEMENT ===== */
  const addAnnouncement = () => {
    if (!form.title || !form.date) return;

    setAnnouncements([...announcements, { id: Date.now(), ...form }]);
    setForm({ title: "", audience: "All", date: "" });
    setShowModal(false);
  };

  /* ===== DELETE ANNOUNCEMENT ===== */
  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  return (
    <Layout role="admin">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Announcement Management
          </h1>
          <p className="text-sm text-slate-500">
            Create and manage school notices.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500"
        >
          + New Announcement
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Audience</th>
              <th className="p-3">Date</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {announcements.map((a) => (
              <tr key={a.id} className="border-t hover:bg-slate-50">
                <td className="p-3 font-medium">{a.title}</td>

                <td className="p-3">
                  <span className="px-2 py-1 rounded text-xs bg-indigo-100 text-indigo-700">
                    {a.audience}
                  </span>
                </td>

                <td className="p-3">{a.date}</td>

                <td className="p-3 text-right">
                  <button
                    onClick={() => deleteAnnouncement(a.id)}
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
            <h2 className="text-lg font-semibold mb-4">
              Create Announcement
            </h2>

            <input
              type="text"
              placeholder="Announcement Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <select
              value={form.audience}
              onChange={(e) =>
                setForm({ ...form, audience: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 mb-3"
            >
              <option>All</option>
              <option>Teachers</option>
              <option>Students</option>
              <option>Parents</option>
            </select>

            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({ ...form, date: e.target.value })
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
                onClick={addAnnouncement}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}