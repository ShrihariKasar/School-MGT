import { useState } from "react";
import Layout from "../../components/layout/Layout";

export default function Curriculum() {
  /* ===== DEMO CURRICULUM DATA ===== */
  const [curriculum, setCurriculum] = useState([
    { id: 1, class: "5A", subject: "Math" },
    { id: 2, class: "5A", subject: "Science" },
    { id: 3, class: "6B", subject: "English" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ class: "", subject: "" });

  /* ===== ADD SUBJECT ===== */
  const addSubject = () => {
    if (!form.class || !form.subject) return;

    setCurriculum([...curriculum, { id: Date.now(), ...form }]);
    setForm({ class: "", subject: "" });
    setShowModal(false);
  };

  /* ===== DELETE SUBJECT ===== */
  const deleteSubject = (id) => {
    setCurriculum(curriculum.filter((c) => c.id !== id));
  };

  return (
    <Layout role="admin">
      {/* ===== HEADER ===== */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Curriculum Planning
          </h1>
          <p className="text-sm text-slate-500">
            Manage subjects assigned to each class.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500"
        >
          + Add Subject
        </button>
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="p-3">Class</th>
              <th className="p-3">Subject</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {curriculum.map((c) => (
              <tr key={c.id} className="border-t hover:bg-slate-50">
                <td className="p-3 font-medium">{c.class}</td>
                <td className="p-3">{c.subject}</td>

                <td className="p-3 text-right">
                  <button
                    onClick={() => deleteSubject(c.id)}
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
            <h2 className="text-lg font-semibold mb-4">Add Subject to Class</h2>

            <input
              type="text"
              placeholder="Class (e.g., 5A)"
              value={form.class}
              onChange={(e) => setForm({ ...form, class: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mb-3"
            />

            <input
              type="text"
              placeholder="Subject Name"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
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
                onClick={addSubject}
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